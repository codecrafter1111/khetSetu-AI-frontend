import { Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Card from '../../../../components/ui/Card'
import { quickActions } from '../data/products.mock'

export default function QuickActions() {
  const navigate = useNavigate()
  return <Card className="p-4"><h2 className="mb-2 flex items-center gap-2 text-base font-bold text-slate-900"><Settings className="size-5 text-emerald-700" />Quick Actions</h2><div className="space-y-1">{quickActions.map(({ label, icon: Icon }, index) => <button type="button" onClick={() => index === 0 && navigate('/farmer/products/new')} key={label} className={`flex h-[38px] w-full items-center gap-3 rounded-lg border px-3 text-left text-xs text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 ${index === 0 ? 'border-emerald-100 bg-emerald-100' : 'border-slate-200 bg-white'}`}><Icon className="size-4 shrink-0 text-emerald-800" />{label}</button>)}</div></Card>
}
