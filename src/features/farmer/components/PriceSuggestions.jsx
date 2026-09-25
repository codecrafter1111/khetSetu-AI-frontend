import { ChartNoAxesCombined, TrendingUp } from 'lucide-react'
import Card from '../../../components/ui/Card'
import SectionHeader from '../../../components/common/SectionHeader'
import ProduceImage from './ProduceImage'
import { marketPrices } from '../data/dashboard.mock'

export default function PriceSuggestions() {
  return <Card className="h-full min-w-0 p-4 xl:flex xl:flex-col xl:justify-between"><SectionHeader icon={ChartNoAxesCombined} title="Price Suggestions (AI)" action="View Market Trends" subtitle="AI-powered market insights to help you get the best value for your produce." />
    <div className="grid gap-2 sm:grid-cols-3">{marketPrices.map(product => <article key={product.name} className="min-w-0 rounded-xl border border-slate-200 px-3 py-2"><ProduceImage type={product.image} className="h-18 w-[82px]" /><h3 className="mt-1 text-xs font-semibold text-slate-900">{product.name}</h3><p className="mt-0.5 text-sm font-bold whitespace-nowrap text-slate-900">{product.price}</p><span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700"><TrendingUp className="size-3" />{product.change}</span><p className="mt-1.5 text-[10px] text-slate-500">{product.note}</p></article>)}</div>
  </Card>
}
