import { Sparkles } from 'lucide-react'
import Card from '../../../../components/ui/Card'
import { cropDoctorFeatures } from '../data/cropDoctor.mock'

export default function CropDoctorKeyFeatures() {
  return <Card className="min-w-0 bg-emerald-50/60 p-3 xl:min-h-[400px]">
    <h2 className="flex items-center gap-3 px-1 pb-2 text-base font-bold text-emerald-950"><Sparkles className="size-6 fill-emerald-700 text-emerald-700" />Key Features</h2>
    <ul className="grid gap-1">
      {cropDoctorFeatures.map(({ title, description, icon: Icon }) => <li key={title} className="flex min-h-[53px] items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-3 py-1"><Icon className="size-7 shrink-0 text-emerald-700" /><div className="min-w-0"><p className="text-xs font-semibold leading-tight text-slate-900">{title}</p><p className="text-[11px] leading-tight text-slate-500">{description}</p></div></li>)}
    </ul>
  </Card>
}
