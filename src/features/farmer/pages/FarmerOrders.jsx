import { useMemo, useState } from 'react'
import { Package } from 'lucide-react'
import FarmerPageHero from '../components/FarmerPageHero'
import OrderStatCard from '../orders/components/OrderStatCard'
import OrdersTable from '../orders/components/OrdersTable'
import OrderDetailsCard from '../orders/components/OrderDetailsCard'
import DispatchFulfillment from '../orders/components/DispatchFulfillment'
import DeliveryPartnerCard from '../orders/components/DeliveryPartnerCard'
import OrderKeyFeatures from '../orders/components/OrderKeyFeatures'
import { orders, orderStats } from '../orders/data/orders.mock'

const snapshotDate = new Date('2025-04-28T23:59:59')

function filterOrders(status, range) {
  return orders.filter(order => {
    const matchesStatus = status === 'all' || order.deliveryStatus === status
    const daysOld = (snapshotDate - new Date(order.orderDate)) / 86_400_000
    return matchesStatus && (range === 'all' || daysOld <= Number(range))
  })
}

export default function FarmerOrders() {
  const [draftStatus, setDraftStatus] = useState('all')
  const [draftRange, setDraftRange] = useState('30')
  const [appliedStatus, setAppliedStatus] = useState('all')
  const [appliedRange, setAppliedRange] = useState('30')
  const [selectedId, setSelectedId] = useState(orders[0].id)
  const visibleOrders = useMemo(() => filterOrders(appliedStatus, appliedRange), [appliedStatus, appliedRange])
  const selectedOrder = orders.find(order => order.id === selectedId)

  function applyFilter() {
    const next = filterOrders(draftStatus, draftRange)
    setAppliedStatus(draftStatus)
    setAppliedRange(draftRange)
    setSelectedId(next[0]?.id || null)
  }

  function selectStat(status) {
    const next = filterOrders(status, '30')
    setDraftStatus(status)
    setDraftRange('30')
    setAppliedStatus(status)
    setAppliedRange('30')
    setSelectedId(next[0]?.id || null)
  }

  return <>
    <FarmerPageHero title="Orders" subtitle="Manage your orders, track deliveries, and fulfill customer demands with ease." icon={Package} />
    <div className="mx-auto max-w-[1600px] px-4 pb-10 pt-4 sm:px-5">
      <section aria-label="Order statistics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{orderStats.map(stat => <OrderStatCard key={stat.label} stat={stat} onClick={() => selectStat(stat.status)} />)}</section>
      <div className="mt-4"><OrdersTable orders={visibleOrders} onView={setSelectedId} status={draftStatus} onStatusChange={setDraftStatus} dateRange={draftRange} onDateRangeChange={setDraftRange} onFilter={applyFilter} /></div>
      {selectedOrder && <section aria-label="Selected order information" className="mt-4 grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1.4fr)]"><OrderDetailsCard order={selectedOrder} /><DispatchFulfillment order={selectedOrder} /><div className="grid content-start gap-4"><DeliveryPartnerCard order={selectedOrder} /><OrderKeyFeatures /></div></section>}
    </div>
  </>
}
