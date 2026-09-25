import { Clock3, MessageSquare, ShieldAlert, UsersRound } from 'lucide-react'

const icons = { users: UsersRound, alert: ShieldAlert, message: MessageSquare, clock: Clock3 }
const colors = { green: 'from-[#1eaa60] to-[#087d42]', red: 'from-[#f46d72] to-[#dc3440]', blue: 'from-[#50a6ff] to-[#1668db]', amber: 'from-[#ffca54] to-[#f39b08]' }

export default function RequestStats({ stats }) {
  return <section aria-label="Farmer request summary" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{stats.map(stat => { const Icon = icons[stat.icon]; return <article key={stat.label} className="flex min-h-[116px] min-w-0 items-center gap-4 rounded-2xl border border-[#dce8ee] bg-white p-4 shadow-sm"><span className={`grid size-16 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white ${colors[stat.tone]}`}><Icon size={32} fill={stat.icon === 'users' ? 'currentColor' : 'none'} /></span><div className="min-w-0"><p className="text-[13px] text-[#536484]">{stat.label}</p><div className="flex flex-wrap items-center gap-2"><strong className={`font-extrabold leading-tight text-[#17213b] ${stat.icon === 'clock' ? 'text-[19px]' : 'text-[27px]'}`}>{stat.value}</strong><span className="rounded-full bg-[#e5f8ec] px-2 py-0.5 text-[11px] font-bold text-[#167346]">{stat.trend}</span></div><p className="text-[12px] text-[#637492]">{stat.detail}</p></div></article> })}</section>
}
