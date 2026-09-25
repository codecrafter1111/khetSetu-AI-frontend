import { Star } from 'lucide-react'
import Card from '../../../../components/ui/Card'
import { farmFeatures } from '../data/myFarm.mock'

export default function FarmKeyFeatures() {
  return <Card className="min-w-0 bg-emerald-50 p-3.5 xl:min-h-[255px] xl:flex xl:flex-col xl:justify-between"><h2 className="flex items-center gap-2 text-sm font-bold text-emerald-950"><Star className="size-6 fill-emerald-700 text-emerald-700" />Key Features</h2><div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1.5 xl:flex-1 xl:content-around">{farmFeatures.map(({ title, description, icon: Icon }) => <div key={title} className="flex min-w-0 gap-2"><span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white"><Icon className="size-4 text-emerald-700" /></span><div className="min-w-0"><p className="text-[10px] font-semibold leading-tight text-slate-900">{title}</p><p className="mt-0.5 text-[10px] leading-tight text-slate-500">{description}</p></div></div>)}</div></Card>
}
