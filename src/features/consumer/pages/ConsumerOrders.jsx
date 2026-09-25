import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../../config/routes'
import { activeOrderStatuses } from '../data/consumerOrders.mock'
import { shopProducts } from '../data/shopProducts.mock'
import { useConsumerCommerce } from '../state/useConsumerCommerce'
import { getConsumerOrders, downloadDemoInvoice } from '../../../services/consumer/orderService'
import { OrderFilters, OrderStats, OrdersAside, OrdersHero } from '../components/orders/OrdersOverview'
import { ExpandedOrderCard, OrderDetailsDialog, OrderListItem } from '../components/orders/OrderCards'

const reorderNames = {
  'Organic Rice': 'Organic Basmati Rice', 'Wild Honey': 'Wild Forest Honey', 'Raw Honey': 'Wild Forest Honey',
  'Fresh Vegetables': 'Fresh Vegetable Basket', 'A2 Cow Milk': 'Fresh Cow Milk',
}
const orders = getConsumerOrders()
const latestDate = new Date(`${orders[0].placedAt}T12:00:00`)

function matchesDateRange(order, dateRange) {
  if (dateRange === 'all') return true
  const cutoff = new Date(latestDate)
  cutoff.setMonth(cutoff.getMonth() - Number(dateRange))
  return new Date(`${order.placedAt}T12:00:00`) >= cutoff
}
function matchesStatus(order, filter) {
  if (filter === 'all') return true
  if (filter === 'active') return activeOrderStatuses.includes(order.status)
  return order.status === filter
}

export default function ConsumerOrders() {
  const { addToCart } = useConsumerCommerce()
  const [filter, setFilter] = useState('all')
  const [dateRange, setDateRange] = useState('3')
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState('KS8721')
  const [collapsed, setCollapsed] = useState(false)
  const [detailsOrder, setDetailsOrder] = useState(null)
  const [notice, setNotice] = useState('')
  const counts = useMemo(() => ({ total: orders.length, all: orders.length, active: orders.filter(order => activeOrderStatuses.includes(order.status)).length, delivered: orders.filter(order => order.status === 'delivered').length, cancelled: orders.filter(order => order.status === 'cancelled').length, savings: orders.reduce((sum, order) => sum + order.savings, 0) }), [])
  const visibleOrders = useMemo(() => {
    const query = search.trim().toLowerCase()
    return orders.filter(order => matchesStatus(order, filter) && matchesDateRange(order, dateRange) && (!query || `${order.id} ${order.farm} ${order.location} ${order.statusLabel} ${order.summary} ${order.items.map(item => item.name).join(' ')}`.toLowerCase().includes(query)))
  }, [filter, dateRange, search])
  const expandedOrder = collapsed ? null : visibleOrders.find(order => order.id === selectedId) || visibleOrders[0]

  useEffect(() => {
    if (!detailsOrder) return undefined
    const close = event => { if (event.key === 'Escape') setDetailsOrder(null) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [detailsOrder])

  const reorder = order => {
    let added = 0
    let unavailable = 0
    order.items.forEach(item => {
      const name = reorderNames[item.name] || item.name
      const product = shopProducts.find(candidate => candidate.name === name)
      if (product) { addToCart(product, item.quantity); added += item.quantity } else unavailable += item.quantity
    })
    setDetailsOrder(null)
    setNotice(added ? `${added} product${added === 1 ? '' : 's'} added to your cart.${unavailable ? ` ${unavailable} unavailable item${unavailable === 1 ? ' was' : 's were'} skipped.` : ''}` : 'These products are not currently available in the shop.')
  }
  const track = order => {
    setSelectedId(order.id)
    setCollapsed(false)
    document.getElementById('order-tracking')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  const selectOrder = id => {
    setSelectedId(id)
    setCollapsed(false)
    requestAnimationFrame(() => document.getElementById('orders-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  return <div className="consumer-page"><OrdersHero /><div className="consumer-page-content space-y-5"><OrderStats values={counts} /><div className="grid items-start gap-5 min-[1400px]:grid-cols-[minmax(0,1fr)_minmax(290px,320px)]"><section id="orders-list" className="min-w-0 rounded-xl border border-[#dfe8ef] bg-white shadow-sm"><OrderFilters filter={filter} onFilter={value => { setFilter(value); setCollapsed(false) }} counts={counts} dateRange={dateRange} onDateRange={value => { setDateRange(value); setCollapsed(false) }} search={search} onSearch={value => { setSearch(value); setCollapsed(false) }} /><div className="space-y-3 p-3 sm:p-4">{expandedOrder && <ExpandedOrderCard order={expandedOrder} onCollapse={() => setCollapsed(true)} onTrack={track} onDetails={setDetailsOrder} onInvoice={downloadDemoInvoice} onReorder={reorder} />}{visibleOrders.filter(order => order.id !== expandedOrder?.id).map(order => <OrderListItem key={order.id} order={order} onSelect={selectOrder} />)}{visibleOrders.length === 0 && <div className="p-10 text-center"><h2 className="text-lg font-bold text-[#17243b]">No orders found</h2><p className="mt-1 text-sm text-slate-500">Try a different search, status, or date range.</p><button type="button" onClick={() => { setSearch(''); setFilter('all'); setDateRange('all') }} className="mt-4 rounded-lg bg-emerald-700 px-4 py-2 text-sm text-white">Show all orders</button></div>}</div></section><OrdersAside onInvoice={() => expandedOrder && downloadDemoInvoice(expandedOrder)} onReorder={() => expandedOrder && reorder(expandedOrder)} /></div></div>{detailsOrder && <OrderDetailsDialog order={detailsOrder} onClose={() => setDetailsOrder(null)} onInvoice={downloadDemoInvoice} onReorder={reorder} />}{notice && <div role="status" className="fixed bottom-4 right-4 z-50 max-w-sm rounded-lg bg-emerald-900 px-4 py-3 text-sm text-white shadow-xl">{notice}<Link to={routes.consumer.cart} className="ml-2 font-semibold underline">View Cart</Link><button type="button" aria-label="Dismiss notification" onClick={() => setNotice('')} className="ml-3 text-lg leading-none">×</button></div>}</div>
}
