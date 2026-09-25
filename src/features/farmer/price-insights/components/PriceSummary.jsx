import { ChartNoAxesCombined, Leaf, MapPin, Star, Target } from 'lucide-react'
import Card from '../../../../components/ui/Card'
import { priceSummary } from '../data/priceInsights.mock'

const iconMap = { crop: Leaf, region: MapPin, accuracy: Star }

export default function PriceSummary() {
  return <section aria-label="Price insight highlights" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{priceSummary.map(item => {
    const Icon = iconMap[item.icon]
    return <Card key={item.label} className="flex min-w-0 items-center gap-4 p-4 xl:min-h-[135px]"><span className="grid size-[54px] shrink-0 place-items-center rounded-xl bg-emerald-700 text-white">{Icon ? <Icon className="size-7 fill-white/90" /> : <span className="text-3xl font-semibold">₹</span>}</span><div className="min-w-0 flex-1"><p className="text-xs text-slate-600">{item.label}</p><div className="mt-1 flex items-center gap-2"><strong className="truncate text-xl font-bold leading-tight text-slate-900">{item.value}</strong>{item.change && <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800">↗ {item.change}</span>}</div>{item.subvalue && <p className="text-sm font-semibold text-slate-900">{item.subvalue}</p>}<p className="mt-0.5 text-[11px] leading-tight text-slate-500">{item.detail}</p></div>{item.icon === 'rupee' && <ChartNoAxesCombined className="self-end size-8 shrink-0 rounded-lg bg-emerald-50 p-1 text-emerald-700" />}{item.icon === 'accuracy' && <Target className="self-end size-8 shrink-0 rounded-lg bg-emerald-50 p-1 text-emerald-700" />}{item.icon === 'region' && <MapPin className="self-center size-7 shrink-0 fill-emerald-100 text-emerald-300" />}</Card>
  })}</section>
}
