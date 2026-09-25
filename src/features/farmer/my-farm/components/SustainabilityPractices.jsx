import { ArrowRight, Leaf } from 'lucide-react'
import Card from '../../../../components/ui/Card'
import { sustainabilityPractices } from '../data/myFarm.mock'

export default function SustainabilityPractices() {
  return <Card className="min-w-0 p-3.5 xl:min-h-[255px] xl:flex xl:flex-col xl:justify-between"><div className="flex items-center justify-between gap-1"><h2 className="flex items-center gap-2 text-sm font-bold text-slate-900"><Leaf className="size-7 fill-emerald-700 text-emerald-700" />Sustainability Practices</h2><span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800">Edit <ArrowRight className="size-3.5" /></span></div><div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-5 xl:flex-1 xl:content-around">{sustainabilityPractices.map(({ title, description, icon: Icon }) => <div key={title} className="flex min-w-0 items-center gap-2"><span className="grid size-11 shrink-0 place-items-center rounded-full bg-emerald-50"><Icon className="size-5 fill-emerald-700/10 text-emerald-700" /></span><div className="min-w-0"><p className="text-[11px] font-semibold leading-tight text-slate-900">{title}</p><p className="mt-1 text-[10px] leading-tight text-slate-500">{description}</p></div></div>)}</div></Card>
}
