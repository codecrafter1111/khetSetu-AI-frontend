import { PackageCheck } from 'lucide-react'
import Card from '../../../components/ui/Card'
import Badge from '../../../components/ui/Badge'
import SectionHeader from '../../../components/common/SectionHeader'
import ProduceImage from './ProduceImage'
import { orders } from '../data/dashboard.mock'

const tone = { Delivered: 'green', Shipped: 'blue', Processing: 'orange' }

export default function RecentOrders() {
  return <Card className="h-full min-w-0 p-3.5">
    <SectionHeader icon={PackageCheck} title="Recent Orders" action="View All" />
    <div className="hidden grid-cols-[1.6fr_.75fr_.95fr_.9fr_.65fr] items-center gap-1 rounded-lg bg-slate-50 px-2 py-2 text-[10px] text-slate-600 min-[700px]:grid"><span>Product</span><span>Order ID</span><span>Date</span><span>Status</span><span className="text-right">Amount</span></div>
    {orders.map(order => <div key={order.id} className="grid grid-cols-[1fr_auto] items-center gap-2 border-b border-slate-200/80 py-2.5 last:border-0 min-[700px]:grid-cols-[1.6fr_.75fr_.95fr_.9fr_.65fr] min-[700px]:gap-1 min-[700px]:px-2">
      <div className="flex min-w-0 items-center gap-2"><ProduceImage type={order.image} className="size-9" /><div className="min-w-0"><p className="truncate text-[11px] font-semibold text-slate-900">{order.product}</p><p className="text-[10px] text-slate-500">{order.size}</p></div></div>
      <span className="hidden text-[11px] text-slate-600 min-[700px]:block">{order.id}</span><span className="hidden text-[11px] whitespace-nowrap text-slate-500 min-[700px]:block">{order.date}</span>
      <div className="col-start-1 min-[700px]:col-auto"><Badge tone={tone[order.status]}>{order.status}</Badge></div><strong className="col-start-2 row-start-1 text-right text-xs whitespace-nowrap text-slate-900 min-[700px]:col-auto min-[700px]:row-auto">{order.amount}</strong>
    </div>)}
  </Card>
}
