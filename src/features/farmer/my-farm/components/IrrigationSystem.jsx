import { ArrowRight, Droplets } from 'lucide-react'
import Card from '../../../../components/ui/Card'

export default function IrrigationSystem() {
  return <Card className="min-w-0 p-3 xl:min-h-[260px] xl:flex xl:flex-col xl:justify-between">
    <div className="flex items-center justify-between gap-1"><h2 className="flex items-center gap-2 text-sm font-bold text-slate-900"><Droplets className="size-6 fill-sky-400 text-sky-500" />Irrigation System</h2><span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800">Edit <ArrowRight className="size-3.5" /></span></div>
    <div className="mt-2 grid grid-cols-[minmax(0,1fr)_106px] gap-2"><dl className="space-y-1 text-[11px]"><div><dt className="text-slate-500">Method</dt><dd className="font-semibold text-slate-900">Drip Irrigation</dd></div><div><dt className="text-slate-500">Water Source</dt><dd className="font-semibold text-slate-900">Borewell</dd></div><div><dt className="text-slate-500">Coverage</dt><dd className="font-semibold text-slate-900">4.5 Acres</dd></div></dl><div role="img" aria-label="Drip irrigation on a young crop" className="h-[145px] rounded-lg bg-[url('/images/my-farm/farm-photo-strip.png')] bg-[length:500%_100%] bg-[position:50%_50%] bg-no-repeat" /></div>
    <div className="mt-2 flex items-center gap-2 rounded-lg bg-emerald-50 px-2 py-1.5"><Droplets className="size-6 fill-sky-400 text-sky-500" /><div><p className="text-xs font-semibold text-emerald-900">Water Efficient</p><p className="text-[10px] text-slate-500">Saves up to 40% water</p></div></div>
  </Card>
}
