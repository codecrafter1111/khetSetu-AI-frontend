import { useState } from 'react'
import { FlaskConical, Leaf, ShieldAlert, Sprout } from 'lucide-react'
import Card from '../../../../components/ui/Card'
import { treatments } from '../data/cropDoctor.mock'

export default function TreatmentSuggestions() {
  const [activeTab, setActiveTab] = useState('chemical')
  return <Card className="min-w-0 p-3 xl:min-h-[360px] xl:flex xl:flex-col xl:justify-between">
    <h2 className="flex items-center gap-2 text-base font-bold text-slate-900"><Sprout className="size-6 text-emerald-700" />Treatment Suggestions</h2>
    <p className="ml-8 text-xs text-slate-500">Based on the detected disease and crop type</p>
    <div role="tablist" aria-label="Treatment type" className="mt-2 flex rounded-lg bg-slate-50 p-0.5">{[['chemical', 'Chemical (Fungicide)'], ['organic', 'Organic / Natural']].map(([id, label]) => <button key={id} type="button" role="tab" aria-selected={activeTab === id} onClick={() => setActiveTab(id)} className={`flex-1 rounded-md px-2 py-1.5 text-xs font-semibold transition ${activeTab === id ? 'border border-emerald-600 bg-emerald-50 text-emerald-950' : 'text-slate-600 hover:bg-white'}`}>{label}</button>)}</div>
    <div role="tabpanel" className="mt-2 grid gap-2 sm:grid-cols-2">{treatments[activeTab].map(item => <article key={item.id} className="flex min-w-0 gap-2 rounded-xl border border-slate-200 p-2"><div aria-hidden="true" className="h-[105px] w-[52px] shrink-0 rounded-lg bg-emerald-50 bg-[url('/images/crop-doctor/fungicides.png')] bg-[length:200%_100%] bg-no-repeat" style={{ backgroundPosition: item.imagePosition }} /><div className="min-w-0"><h3 className="text-[11px] font-bold text-slate-900">{item.name}</h3><p className="mt-0.5 line-clamp-2 text-[10px] leading-tight text-slate-500">{item.description}</p><p className="mt-1 flex gap-1 text-[10px] leading-tight text-slate-600"><FlaskConical className="size-3 shrink-0 text-emerald-700" /><span><span className="font-medium text-slate-900">Dose:</span> {item.dose}</span></p><p className="mt-1 flex gap-1 text-[10px] leading-tight text-slate-600"><Leaf className="size-3 shrink-0 text-emerald-700" /><span><span className="font-medium text-slate-900">Frequency:</span> {item.frequency}</span></p></div></article>)}</div>
    <div className="mt-2 flex gap-2 rounded-lg bg-amber-50 px-2.5 py-2 text-[11px] leading-tight"><ShieldAlert className="size-4 shrink-0 text-amber-600" /><p><strong className="text-red-700">Safety Note:</strong><br /><span className="text-slate-600">Use protective gear (gloves, mask) while spraying. Follow label instructions and observe pre-harvest interval (7–10 days).</span></p></div>
  </Card>
}
