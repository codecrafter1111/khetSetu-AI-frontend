import { ArrowRight } from 'lucide-react'
export default function SectionHeader({ icon: Icon, title, action, subtitle, iconClass = 'text-emerald-700' }) {
  return <div className="mb-4"><div className="flex items-center justify-between gap-3"><h2 className="flex items-center gap-2.5 text-base font-bold text-slate-900 md:text-lg">{Icon && <Icon className={`size-6 ${iconClass}`} />}{title}</h2>{action && <button className="flex shrink-0 items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900">{action}<ArrowRight className="size-4" /></button>}</div>{subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}</div>
}
