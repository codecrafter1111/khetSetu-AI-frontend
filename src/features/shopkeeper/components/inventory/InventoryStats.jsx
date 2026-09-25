import { Boxes, CircleX, Package, TriangleAlert } from 'lucide-react'

const icons = { total: Package, in: Boxes, low: TriangleAlert, out: CircleX }
const tones = {
  green: 'from-[#189c52] to-[#08783e]',
  blue: 'from-[#4ca7ff] to-[#1667d9]',
  amber: 'from-[#ffc747] to-[#f2a10c]',
  red: 'from-[#f87873] to-[#e43f45]',
}
const trendTones = { green: 'bg-[#e5f8ec] text-[#167346]', blue: 'bg-[#e5f8ec] text-[#167346]', amber: 'bg-[#fff2df] text-[#d77a00]', red: 'bg-[#ffebeb] text-[#d33b49]' }

export default function InventoryStats({ stats }) {
  return <section aria-label="Inventory summary" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{stats.map(stat => { const Icon = icons[stat.icon]; return <article key={stat.label} className="flex min-h-[116px] min-w-0 items-center gap-4 rounded-2xl border border-[#dce8ee] bg-white p-4 shadow-sm"><span className={`grid size-16 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white ${tones[stat.tone]}`}><Icon size={34} strokeWidth={2} /></span><div className="min-w-0"><p className="text-[13px] text-[#536484]">{stat.label}</p><div className="flex flex-wrap items-center gap-2"><strong className="text-[27px] font-extrabold leading-tight text-[#17213b]">{stat.value}</strong><span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${trendTones[stat.tone]}`}>{stat.trend}</span></div><p className="text-[12px] text-[#637492]">{stat.detail}</p></div></article> })}</section>
}
