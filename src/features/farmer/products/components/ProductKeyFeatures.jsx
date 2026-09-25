import { Leaf, Lightbulb } from 'lucide-react'
import Card from '../../../../components/ui/Card'
import { productFeatures } from '../data/products.mock'

export default function ProductKeyFeatures() {
  return <Card className="p-4"><h2 className="mb-2 flex items-center gap-2 text-base font-bold text-slate-900"><Lightbulb className="size-5 text-emerald-700" />Key Features</h2><div className="space-y-1">{productFeatures.map(({ title, description, icon: Icon }) => <div key={title} className="flex min-h-[56px] items-center gap-2.5"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-emerald-100"><Icon className="size-4.5 text-emerald-700" /></span><div className="min-w-0"><h3 className="text-xs font-semibold leading-tight text-slate-900">{title}</h3><p className="text-[11px] leading-tight text-slate-500">{description}</p></div></div>)}</div><div className="mt-2 flex items-center gap-3 rounded-lg bg-emerald-50 p-3"><span className="grid size-12 shrink-0 place-items-center rounded-full bg-emerald-100"><Leaf className="size-6 fill-emerald-400 text-emerald-700" /></span><div><p className="text-xs font-bold leading-tight text-emerald-950">Quality Products<br />Stronger Communities</p><p className="mt-1 text-[10px] leading-tight text-slate-500">Good produce creates better opportunities for a brighter tomorrow.</p></div></div></Card>
}
