import { ArrowRight, Star } from 'lucide-react'
import Card from '../../../../components/ui/Card'
import { orderFeatures } from '../data/orders.mock'

export default function OrderKeyFeatures() {
  return <Card className="min-h-[220px] p-3"><div className="mb-2 flex items-center justify-between gap-2"><h2 className="flex items-center gap-2 text-base font-bold text-slate-900"><Star className="size-6 fill-amber-400 text-amber-500" />Key Features</h2><button type="button" className="flex items-center gap-1 text-[11px] font-medium whitespace-nowrap text-emerald-700">See Guide <ArrowRight className="size-4" /></button></div><div className="grid grid-cols-1 gap-x-2 gap-y-1 sm:grid-cols-2">{orderFeatures.map(({ title, description, icon: Icon }) => <div key={title} className="flex min-h-[44px] items-center gap-2"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-emerald-100"><Icon className="size-4 text-emerald-700" /></span><div className="min-w-0"><h3 className="text-[11px] font-semibold leading-tight text-slate-900">{title}</h3><p className="text-[10px] leading-tight text-slate-500">{description}</p></div></div>)}</div></Card>
}
