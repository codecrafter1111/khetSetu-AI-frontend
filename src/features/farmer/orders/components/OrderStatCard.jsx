import { ChevronRight } from 'lucide-react'
import Card from '../../../../components/ui/Card'

const tones = { amber: 'bg-gradient-to-br from-amber-400 to-amber-500', green: 'bg-gradient-to-br from-emerald-600 to-emerald-800', blue: 'bg-gradient-to-br from-sky-400 to-blue-600' }

export default function OrderStatCard({ stat, onClick }) {
  const Icon = stat.icon
  return <Card className="min-h-[120px] min-w-0"><button type="button" onClick={onClick} className="flex h-full w-full items-center gap-5 px-4 text-left"><span className={`grid size-14 shrink-0 place-items-center rounded-2xl text-white ${tones[stat.tone]}`}><Icon className="size-7 fill-white/90" /></span><span className="min-w-0 flex-1"><span className="block text-sm text-slate-600">{stat.label}</span><strong className="block text-[25px] leading-tight text-slate-950">{stat.value}</strong><span className="block text-xs text-slate-500">{stat.detail}</span></span><ChevronRight className="size-4 shrink-0 text-slate-700" /></button></Card>
}
