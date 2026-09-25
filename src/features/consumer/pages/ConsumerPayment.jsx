import { ArrowLeft, CreditCard, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { routes } from '../../../config/routes'
import { CheckoutProgress } from '../components/cart/CheckoutSections'
import { useConsumerCommerce } from '../state/useConsumerCommerce'

export default function ConsumerPayment() {
  const { cartCount } = useConsumerCommerce()
  const checkout = (() => { try { return JSON.parse(sessionStorage.getItem('khetsetu-consumer-checkout')) } catch { return null } })()
  return <div className="min-h-[calc(100vh-72px)] bg-[#f5fbfd] p-4 sm:p-6"><Link to={routes.consumer.cart} className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:underline"><ArrowLeft size={17} />Back to cart</Link><h1 className="mb-4 mt-4 text-3xl font-bold text-slate-950">Payment</h1><CheckoutProgress current={3} /><div className="mx-auto max-w-xl rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm"><CreditCard className="mx-auto size-10 text-emerald-800" /><h2 className="mt-3 text-xl font-bold text-slate-950">Payment options are coming soon</h2><p className="mt-2 text-sm text-slate-600">Your cart and delivery choices are ready. Secure online payment will be available when checkout is connected to the backend.</p>{cartCount > 0 && checkout && <div className="mt-5 rounded-lg bg-emerald-50 p-4 text-left text-sm text-slate-700"><p><strong>Deliver to:</strong> {checkout.address?.label}</p><p className="mt-1"><strong>Delivery:</strong> {checkout.date}, {checkout.time}</p><p className="mt-1"><strong>Estimated total:</strong> ₹ {Number(checkout.totalPayable).toLocaleString('en-IN')}</p></div>}<p className="mt-5 flex items-center justify-center gap-2 text-xs text-emerald-800"><ShieldCheck size={16} />No payment has been collected.</p></div></div>
}
