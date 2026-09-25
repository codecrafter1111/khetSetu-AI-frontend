const deliveryStyles = {
  delivered: ['Delivered', 'bg-emerald-100 text-emerald-800'],
  shipped: ['Shipped', 'bg-sky-100 text-sky-700'],
  confirmed: ['Confirmed', 'bg-emerald-100 text-emerald-800'],
  pending: ['Pending', 'bg-amber-100 text-amber-700'],
  processing: ['Processing', 'bg-orange-100 text-orange-700'],
}

export default function OrderStatusBadge({ status, type = 'delivery' }) {
  const [label, classes] = type === 'payment'
    ? status === 'paid' ? ['Paid', 'bg-emerald-100 text-emerald-800'] : ['COD', 'bg-amber-100 text-amber-700']
    : deliveryStyles[status] || [status, 'bg-slate-100 text-slate-700']
  return <span className={`inline-flex min-w-[70px] items-center justify-center rounded-full px-2.5 py-1 text-[11px] font-medium whitespace-nowrap ${classes}`}>{label}</span>
}
