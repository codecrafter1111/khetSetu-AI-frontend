import { ArrowRight, ReceiptText } from 'lucide-react'
import Card from '../../../../components/ui/Card'
import ProductImage from '../../products/components/ProductImage'
import OrderStatusBadge from './OrderStatusBadge'

const orderDate = date => new Date(date).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })

export default function OrderDetailsCard({ order }) {
  if (!order) return null
  const fields = [['Order ID', `#${order.id}`], ['Customer', order.consumer.name], ['Location', order.consumer.fullLocation], ['Quantity', order.quantity], ['Amount', `₹ ${order.amount.toLocaleString('en-IN')}`], ['Order Date', orderDate(order.orderDate)]]
  return <Card className="min-h-[415px] p-4 xl:flex xl:flex-col xl:justify-between"><div className="mb-2.5 flex items-center justify-between gap-2"><h2 className="flex items-center gap-2.5 text-base font-bold text-slate-900"><span className="grid size-7 place-items-center rounded-md bg-emerald-800 text-white"><ReceiptText className="size-4" /></span>Order Details</h2><button type="button" className="flex items-center gap-1 text-xs font-medium whitespace-nowrap text-emerald-700">View Full Order <ArrowRight className="size-4" /></button></div><div className="min-h-[345px] rounded-xl border border-slate-200 p-3"><div className="flex items-start gap-3"><ProductImage product={order.product} className="size-[70px]" /><div className="min-w-0 flex-1"><p className="text-sm font-semibold text-slate-900">{order.product.name}</p><p className="mt-1 text-xs text-slate-500">{order.product.packageSize}</p></div><OrderStatusBadge status={order.deliveryStatus} /></div><dl className="mt-3 space-y-1.5">{fields.map(([label, value]) => <div key={label} className="grid grid-cols-[95px_8px_minmax(0,1fr)] gap-2 text-xs"><dt className="text-slate-500">{label}</dt><span className="text-slate-400">:</span><dd className="min-w-0 text-slate-700">{value}</dd></div>)}</dl></div></Card>
}
