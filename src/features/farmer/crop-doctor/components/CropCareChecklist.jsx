import { useState } from 'react'
import { ClipboardCheck, Lightbulb } from 'lucide-react'
import Card from '../../../../components/ui/Card'
import { careChecklist } from '../data/cropDoctor.mock'

export default function CropCareChecklist() {
  const [checked, setChecked] = useState(() => Object.fromEntries(careChecklist.map(item => [item.id, item.checked])))
  return <Card className="min-w-0 p-3 xl:min-h-[360px] xl:flex xl:flex-col xl:justify-between">
    <h2 className="flex items-center gap-2 text-base font-bold text-slate-900"><ClipboardCheck className="size-6 text-emerald-700" />Crop Care Checklist</h2>
    <div className="mt-2 rounded-xl border border-slate-200 p-2 xl:flex-1"><ul className="space-y-2 xl:flex xl:h-full xl:flex-col xl:justify-around xl:space-y-0">{careChecklist.map(item => <li key={item.id}><label className="flex cursor-pointer items-center gap-2 text-xs text-slate-700"><input type="checkbox" checked={checked[item.id]} onChange={event => setChecked(current => ({ ...current, [item.id]: event.target.checked }))} className="size-4 shrink-0 accent-emerald-700" />{item.label}</label></li>)}</ul></div>
    <div className="mt-2 flex gap-2 rounded-xl bg-emerald-50 p-2.5"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-emerald-100"><Lightbulb className="size-5 text-emerald-800" /></span><p className="text-[11px] leading-snug text-slate-600"><strong className="block text-xs text-emerald-950">Pro Tip:</strong>Rotate crops and use disease-resistant varieties to reduce future risk.</p></div>
  </Card>
}
