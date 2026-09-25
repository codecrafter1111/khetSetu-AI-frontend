import { useState } from 'react'
import { Download, Home, RefreshCw } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { routes } from '../../../../config/routes'
import { downloadOrderInvoice, getConsumerOrderDetails } from '../services/orderDetails.service'
import { useOrderTracking } from '../hooks/useOrderTracking'
import { DeliveryPartnerCard, LiveTrackingCard, VerticalOrderTimeline } from '../components/OrderTrackingCards'
import '../order-tracking.css'

export default function ConsumerTrackOrder() {
  const { orderId } = useParams()
  const { data, loading, refreshing, error, retry } = useOrderTracking(orderId)
  const [invoiceLoading, setInvoiceLoading] = useState(false)
  const [notice, setNotice] = useState('')
  const download = async () => {
    setInvoiceLoading(true)
    try { const order = await getConsumerOrderDetails(orderId); await downloadOrderInvoice(order); setNotice('Invoice download started') }
    catch { setNotice('The invoice is currently unavailable. Please try again.') }
    finally { setInvoiceLoading(false) }
  }
  if (loading) return <TrackingSkeleton />
  if (error) return <div className="tracking-error"><TruckStateIcon /><h1>Tracking unavailable</h1><p>{error}</p><button type="button" onClick={() => retry()}><RefreshCw />Try again</button><Link to={routes.consumer.orders}>Back to My Orders</Link></div>
  return <div className="consumer-track-page">
    <nav className="tracking-breadcrumb" aria-label="Breadcrumb"><Link to={routes.consumer.dashboard}><Home /><span>Home</span></Link><i>›</i><Link to={routes.consumer.orders}>My Orders</Link><i>›</i><span>Track Order</span></nav>
    <header className="tracking-heading"><div><h1>Track Your Order</h1><div className="tracking-order-line"><h2>Order #{data.orderNumber}</h2><span className={`tracking-status tracking-status--${data.status.toLowerCase()}`}>{data.statusLabel}</span>{refreshing && <RefreshCw className="tracking-refreshing" aria-label="Refreshing tracking" />}</div><p>Expected Delivery: {data.expectedDeliveryLabel}</p></div>{data.invoiceAvailable && <button type="button" onClick={download} disabled={invoiceLoading}><Download />{invoiceLoading ? 'Preparing Invoice...' : 'Download Invoice'}</button>}</header>
    <div className="tracking-layout"><VerticalOrderTimeline events={data.timeline} /><div className="tracking-right"><DeliveryPartnerCard partner={data.deliveryPartner} /><LiveTrackingCard tracking={data.tracking} partner={data.deliveryPartner} statusLabel={data.statusLabel} /></div></div>
    {notice && <div className={`tracking-toast${notice.includes('unavailable') ? ' error' : ''}`} role="status">{notice}<button type="button" onClick={() => setNotice('')} aria-label="Dismiss notification">×</button></div>}
  </div>
}

function TrackingSkeleton() { return <div className="tracking-skeleton" aria-label="Loading order tracking"><i /><i /><div><section /><aside><i /><i /></aside></div></div> }
function TruckStateIcon() { return <span aria-hidden="true">🚚</span> }
