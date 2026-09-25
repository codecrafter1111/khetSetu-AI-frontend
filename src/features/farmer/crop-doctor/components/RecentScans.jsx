import { ArrowRight, Clock3 } from 'lucide-react'
import Card from '../../../../components/ui/Card'
import { recentScans } from '../data/cropDoctor.mock'

const statusStyles = { Moderate: 'bg-amber-100 text-amber-800', Healthy: 'bg-emerald-100 text-emerald-800', High: 'bg-red-100 text-red-700', Mild: 'bg-amber-100 text-amber-800' }

export default function RecentScans() {
  return <Card className="min-w-0 p-3 xl:min-h-[230px]">
    <div className="flex items-center justify-between gap-2 pb-2"><h2 className="flex items-center gap-2 text-sm font-bold text-slate-900"><Clock3 className="size-5 text-emerald-700" />Recent Scans</h2><span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800">View All <ArrowRight className="size-3.5" /></span></div>
    <ul>{recentScans.map(scan => <li key={scan.id} className="flex h-[42px] items-center gap-2 border-t border-slate-100"><img src={scan.image} alt="" className="size-8 shrink-0 rounded-md object-cover" /><div className="min-w-0 flex-1"><p className="truncate text-[11px] font-semibold text-slate-900">{scan.name}</p><p className="text-[10px] text-slate-500">{scan.crop}</p></div><span className="whitespace-nowrap text-[10px] text-slate-500">{scan.date}</span><span className={`min-w-[54px] rounded-full px-1.5 py-1 text-center text-[10px] ${statusStyles[scan.status]}`}>{scan.status}</span></li>)}</ul>
  </Card>
}
