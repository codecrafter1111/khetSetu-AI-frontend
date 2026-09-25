import { TrendingDown, TrendingUp } from 'lucide-react'
import Card from '../../../../components/ui/Card'

export default function ProductStatCard({ stat }) {
  const Icon = stat.icon
  const warning = stat.tone === 'warning'
  return <Card className="flex min-h-[120px] min-w-0 items-center gap-4 px-4 py-3">
    <span className={`grid size-14 shrink-0 place-items-center rounded-2xl text-white ${warning ? 'bg-gradient-to-br from-orange-500 to-orange-600' : 'bg-gradient-to-br from-emerald-600 to-emerald-800'}`}><Icon className={`size-7 ${warning ? 'fill-white' : ''}`} /></span>
    <span className="min-w-0"><span className="block text-sm text-slate-600">{stat.label}</span><span className="mt-0.5 flex flex-wrap items-center gap-2"><strong className="text-[23px] leading-tight font-black whitespace-nowrap text-slate-950">{stat.value}</strong>{stat.change && <span className={`inline-flex items-center gap-0.5 rounded-full px-2 py-1 text-xs font-bold ${warning ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'}`}>{warning ? <TrendingDown className="size-3" /> : <TrendingUp className="size-3" />}{stat.change}</span>}</span><span className="mt-0.5 block text-xs text-slate-500">{stat.detail}</span></span>
  </Card>
}
