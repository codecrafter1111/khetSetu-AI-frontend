import { LayoutGrid } from 'lucide-react'
import Card from '../../../../components/ui/Card'
import { insightFeatures } from '../data/priceInsights.mock'

export default function PriceKeyFeatures() {
  return <Card className="min-w-0 p-3 xl:min-h-[600px]"><h2 className="flex items-center gap-3 text-lg font-bold text-slate-900"><LayoutGrid className="size-6 fill-emerald-700 text-emerald-700" />Key Features</h2><p className="ml-9 text-xs text-slate-500">Everything you need to make better selling decisions.</p><ul className="mt-4 space-y-2">{insightFeatures.map(({ title, description, icon: Icon }) => <li key={title} className="flex min-h-[76px] items-center gap-4 rounded-xl bg-slate-50/80 p-2"><span className="grid size-11 shrink-0 place-items-center rounded-lg border border-emerald-100 bg-white"><Icon className="size-6 text-emerald-700" /></span><div className="min-w-0"><p className="text-sm font-semibold text-slate-900">{title}</p><p className="text-xs leading-snug text-slate-600">{description}</p></div></li>)}</ul></Card>
}
