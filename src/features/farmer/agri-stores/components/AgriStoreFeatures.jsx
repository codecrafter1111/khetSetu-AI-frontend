import { Lightbulb } from 'lucide-react'
import Card from '../../../../components/ui/Card'
import { storeFeatures } from '../data/agriStores.mock'

export default function AgriStoreFeatures() {
  return <Card className="min-w-0 bg-emerald-50 p-3 xl:min-h-[470px]"><h2 className="flex items-center gap-2 text-base font-bold text-emerald-950"><Lightbulb className="size-6 fill-emerald-700 text-emerald-700" />Key Features</h2><ul className="mt-2.5 space-y-2">{storeFeatures.map(({ title, description, icon: Icon }) => <li key={title} className="flex min-h-[60px] items-center gap-2.5"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-emerald-100"><Icon className="size-5 fill-emerald-700/10 text-emerald-800" /></span><div className="min-w-0"><strong className="block text-[11px] leading-tight text-slate-900">{title}</strong><p className="mt-0.5 text-[11px] leading-tight text-slate-600">{description}</p></div></li>)}</ul></Card>
}
