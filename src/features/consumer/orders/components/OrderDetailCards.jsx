import { Check, CreditCard, Headphones, MapPin, Pencil, Phone, ReceiptText, RefreshCw, Star, Truck, XCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { routes } from '../../../../config/routes'
import ProductPhoto from '../../components/ProductPhoto'

const money = (value) => `₹${Number(value).toLocaleString('en-IN')}`
const formatMoment = (timestamp) => timestamp ? new Date(timestamp).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true }) : 'Pending'

export function OrderItemsCard({ items }) {
  return <section className="order-detail-card order-items-card"><h2>Order Items</h2><div>{items.map((item) => { const content = <><ProductPhoto tile={item.tile} alt={item.name} className="order-product-image" /><span className="order-product-name"><strong>{item.name}</strong><small>{item.pack}</small></span><span className="order-product-quantity">Qty: {item.quantity}</span><span className="order-product-price"><strong>{money(item.subtotal)}</strong>{item.quantity > 1 && <small>({money(item.unitPrice)} each)</small>}</span></>; return item.slug ? <Link to={`/consumer/products/${item.slug}`} key={`${item.productId}-${item.name}`}>{content}</Link> : <article key={`${item.productId}-${item.name}`}>{content}</article> })}</div></section>
}

export function OrderTimelineCard({ timeline, cancelled }) {
  return <section className="order-detail-card order-timeline-card"><h2>Order Timeline</h2>{cancelled ? <div className="order-cancelled"><XCircle />This order was cancelled.</div> : <ol>{timeline.map((event) => <li className={event.complete ? 'complete' : ''} key={event.label}><span>{event.complete ? <Check /> : null}</span><strong>{event.label}</strong><small>{formatMoment(event.timestamp)}</small></li>)}</ol>}</section>
}

export function DeliveryAddressCard({ address, canEdit, onEdit }) {
  return <section className="order-detail-card delivery-detail-card"><h2>Delivery Address</h2><div><MapPin /><span><strong>{address.name}</strong><p>{address.lines}, {address.city}</p><small><Phone />{address.phone}</small></span>{canEdit && <button type="button" onClick={onEdit}><Pencil /> Edit</button>}</div></section>
}

export function PaymentMethodCard({ payment }) {
  return <section className="order-detail-card payment-detail-card"><h2><CreditCard /> Payment Method</h2><div><span className="payment-check"><Check /></span><p><strong>{payment.method}</strong><small><ReceiptText />Transaction ID: {payment.transactionId}</small></p><em className={`payment-${payment.status.toLowerCase().replaceAll(' ', '-')}`}>{payment.status}</em></div></section>
}

export function OrderSummaryCard({ summary }) {
  return <section className="order-detail-card order-summary-card"><h2><ReceiptText /> Order Summary</h2><dl><div><dt>Item Total</dt><dd>{money(summary.itemTotal)}</dd></div><div><dt>Delivery Charge</dt><dd>{money(summary.deliveryCharge)}</dd></div><div><dt>Discount</dt><dd className="discount">−{money(summary.discount)}</dd></div><div className="total"><dt>Total Paid</dt><dd>{money(summary.totalPaid)}</dd></div></dl></section>
}

export function OrderDetailActions({ order, onReorder, onCancel }) {
  const actions = []
  if (order.permissions.canTrack) actions.push(<Link key="track" to={routes.consumer.trackOrder(order.id)}><Truck />Track Order</Link>)
  if (order.permissions.canReorder) actions.push(<button key="reorder" type="button" onClick={onReorder}><RefreshCw />Reorder</button>)
  if (order.permissions.canReview) actions.push(<Link key="review" to={routes.consumer.profileReviews}><Star />Rate Products</Link>)
  if (order.permissions.canCancel) actions.push(<button key="cancel" type="button" className="danger" onClick={onCancel}><XCircle />Cancel Order</button>)
  actions.push(<Link key="help" to={routes.consumer.help}><Headphones />Get Help</Link>)
  return <nav className="order-detail-actions" aria-label="Order actions">{actions}</nav>
}
