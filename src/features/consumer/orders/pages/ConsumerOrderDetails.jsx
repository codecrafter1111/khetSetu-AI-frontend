import { useEffect, useState } from 'react'
import { ArrowLeft, Download } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { routes } from '../../../../config/routes'
import { shopProducts } from '../../data/shopProducts.mock'
import { useConsumerCommerce } from '../../state/useConsumerCommerce'
import { DeliveryAddressCard, OrderDetailActions, OrderItemsCard, OrderSummaryCard, OrderTimelineCard, PaymentMethodCard } from '../components/OrderDetailCards'
import CancelOrderModal from '../components/CancelOrderModal'
import { downloadOrderInvoice, getConsumerOrderDetails } from '../services/orderDetails.service'
import '../order-details.css'

const formatPlaced = (timestamp) => new Date(timestamp).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })

export default function ConsumerOrderDetails() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useConsumerCommerce()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [invoiceLoading, setInvoiceLoading] = useState(false)
  const [notice, setNotice] = useState('')
  const [cancelOpen, setCancelOpen] = useState(false)

  const load = async () => {
    setLoading(true); setError('')
    try { setOrder(await getConsumerOrderDetails(orderId)) } catch (caught) { setError(caught.message === 'ORDER_NOT_FOUND' ? 'We could not find this order.' : 'The order could not be loaded. Please try again.') } finally { setLoading(false) }
  }

  useEffect(() => {
    let active = true
    getConsumerOrderDetails(orderId).then((data) => { if (active) setOrder(data) }).catch((caught) => { if (active) setError(caught.message === 'ORDER_NOT_FOUND' ? 'We could not find this order.' : 'The order could not be loaded. Please try again.') }).finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [orderId])

  const download = async () => {
    setInvoiceLoading(true)
    try { await downloadOrderInvoice(order); setNotice('Invoice download started') } catch { setNotice('The invoice is currently unavailable. Please try again.') } finally { setInvoiceLoading(false) }
  }
  const reorder = () => {
    let added = 0
    order.items.forEach((item) => { const product = shopProducts.find((candidate) => candidate.id === item.productId); if (product) { addToCart(product, item.quantity); added += item.quantity } })
    setNotice(added ? `${added} item${added === 1 ? '' : 's'} added to your cart` : 'These products are not currently available')
  }
  const cancelled = () => { setOrder((current) => ({ ...current, status: 'cancelled', statusLabel: 'Cancelled', permissions: { ...current.permissions, canCancel: false, canTrack: false, canReorder: true } })); setCancelOpen(false); setNotice('Order cancelled successfully') }

  if (loading) return <OrderDetailsLoading />
  if (error) return <div className="order-detail-error"><h1>Order unavailable</h1><p>{error}</p><button type="button" onClick={load}>Try again</button><Link to={routes.consumer.orders}>Back to My Orders</Link></div>

  return <div className="consumer-order-detail-page">
    <header className="order-detail-heading"><Link to={routes.consumer.orders} aria-label="Back to orders"><ArrowLeft /></Link><div><h1>Order Details</h1><div className="order-detail-identity"><h2>Order #{order.id}</h2><span className={`order-status order-status--${order.status}`}>{order.statusLabel}</span></div><p>Placed on {formatPlaced(order.placedAt)}</p></div><button type="button" onClick={download} disabled={invoiceLoading}><Download />{invoiceLoading ? 'Preparing Invoice...' : 'Download Invoice'}</button></header>
    <div className="order-detail-layout"><div className="order-detail-left"><OrderItemsCard items={order.items} /><OrderTimelineCard timeline={order.timeline} cancelled={order.status === 'cancelled'} /></div><aside className="order-detail-right"><DeliveryAddressCard address={order.address} canEdit={order.permissions.canEditAddress} onEdit={() => navigate(routes.consumer.profileAddresses)} /><PaymentMethodCard payment={order.payment} /><OrderSummaryCard summary={order.summary} /></aside></div>
    <OrderDetailActions order={order} onReorder={reorder} onCancel={() => setCancelOpen(true)} />
    {notice && <div className={`order-detail-toast${notice.includes('unavailable') ? ' error' : ''}`} role="status">{notice}{notice.includes('cart') && <Link to={routes.consumer.cart}>View Cart</Link>}<button type="button" onClick={() => setNotice('')} aria-label="Dismiss notification">×</button></div>}
    <CancelOrderModal open={cancelOpen} orderId={order.id} onClose={() => setCancelOpen(false)} onSuccess={cancelled} />
  </div>
}

function OrderDetailsLoading() { return <div className="order-details-loading" aria-label="Loading order details"><header /><div><section><i /><i /></section><aside><i /><i /><i /></aside></div></div> }
