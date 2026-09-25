import { CheckCircle2, Droplets, Leaf, Lightbulb, ThermometerSun } from 'lucide-react'
import Card from '../../../components/ui/Card'
import Badge from '../../../components/ui/Badge'
import SectionHeader from '../../../components/common/SectionHeader'

const checks = [[CheckCircle2, 'No major issues detected'], [Leaf, 'Good plant growth'], [Droplets, 'Soil moisture: Optimal'], [ThermometerSun, 'Weather conditions: Suitable']]

export default function CropHealthSummary() {
  return <Card className="h-full min-w-0 p-4 xl:flex xl:flex-col xl:justify-between">
    <SectionHeader icon={Leaf} title="Crop Health Summary" action="View All Crops" subtitle="AI-powered insights to keep your crops healthy and productive." />
    <div className="rounded-xl border border-slate-200 p-2">
      <div className="grid gap-4 min-[480px]:grid-cols-[136px_minmax(0,1fr)]">
        <img src="/images/dashboard/healthy-crops.png" alt="Healthy green crops in a field" className="h-[250px] w-full rounded-xl object-cover" />
        <div className="min-w-0 pt-1"><Badge><Leaf className="mr-1 size-3.5 fill-current" />Healthy</Badge><h3 className="mt-2 text-base font-bold text-slate-900">Wheat</h3><p className="text-xs text-slate-500">2.5 acres • Main Field</p><ul className="mt-4 space-y-2.5">{checks.map(([Icon, text]) => <li key={text} className="flex items-center gap-2 text-xs text-slate-600"><Icon className="size-4 shrink-0 text-emerald-600" />{text}</li>)}</ul></div>
      </div>
      <div className="mt-4 flex min-h-[57px] items-center gap-3 rounded-lg bg-emerald-50 px-3 py-2 text-xs text-slate-700"><Lightbulb className="size-6 shrink-0 text-emerald-700" />Keep monitoring for insects. Next irrigation in 3 days.</div>
    </div>
  </Card>
}
