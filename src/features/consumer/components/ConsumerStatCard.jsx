import { TrendingUp } from 'lucide-react'
export default function ConsumerStatCard({ stat }) {
  const Icon = stat.icon
  return <article className="flex min-h-[128px] items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm"><div className="grid size-[64px] shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald-700 to-green-800 text-white"><Icon size={31} strokeWidth={2.3} /></div><div className="min-w-0"><h2 className="truncate text-sm font-medium text-slate-950">{stat.label}</h2><div className="flex items-center gap-3"><strong className="text-[25px] leading-tight text-slate-950">{stat.value}</strong><span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800"><TrendingUp size={12} />{stat.trend}</span></div><p className="truncate text-xs text-slate-500">{stat.detail}</p></div></article>
}
