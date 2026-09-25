import { ArrowRight, CheckCircle2, Leaf, ShieldCheck } from 'lucide-react'
import Card from '../../../../components/ui/Card'

export default function SoilHealth() {
  const rows = [['Soil Type', 'Loamy Soil'], ['pH Level', '6.8 (Optimal)'], ['Organic Matter', '1.8% (Good)'], ['Nutrient Status', 'Healthy']]
  return <Card className="min-w-0 p-3 xl:min-h-[260px] xl:flex xl:flex-col xl:justify-between">
    <div className="flex items-center justify-between gap-1"><h2 className="flex items-center gap-2 text-sm font-bold text-slate-900"><Leaf className="size-6 fill-emerald-700 text-emerald-700" />Soil Health</h2><span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800">View Details <ArrowRight className="size-3.5" /></span></div>
    <div className="mt-2 grid grid-cols-[minmax(0,1fr)_70px] gap-2"><dl className="space-y-2 pt-1">{rows.map(([label, value], index) => <div key={label} className="flex items-center justify-between gap-1 text-[10px]"><dt className="text-slate-500">{label}</dt><dd className="flex items-center gap-1 whitespace-nowrap font-medium text-slate-900">{value}{index > 0 && <CheckCircle2 className="size-3 fill-green-600 text-white" />}</dd></div>)}</dl><div role="img" aria-label="Healthy loamy soil held in hands" className="h-[145px] rounded-lg bg-[url('/images/my-farm/farm-photo-strip.png')] bg-[length:500%_100%] bg-[position:100%_50%] bg-no-repeat" /></div>
    <div className="mt-2 flex items-center gap-2 rounded-lg bg-emerald-50 px-2 py-1.5"><ShieldCheck className="size-6 shrink-0 fill-emerald-600 text-white" /><div><p className="text-[11px] font-semibold text-emerald-900">Soil is in good condition</p><p className="text-[10px] leading-tight text-slate-500">Keep adding organic matter for better yield.</p></div></div>
  </Card>
}
