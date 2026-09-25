import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function SectionTitle({ icon: Icon, title, to, action }) {
  return <div className="mb-2 flex items-center justify-between gap-2"><h2 className="flex items-center gap-2.5 text-[17px] font-bold text-slate-950"><Icon size={23} className="fill-emerald-700/10 text-emerald-800" />{title}</h2>{to && <Link to={to} className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-emerald-900 hover:underline">{action}<ArrowRight size={16} /></Link>}</div>
}
