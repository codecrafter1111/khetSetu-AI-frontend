import { Check, Leaf, UsersRound } from 'lucide-react'
import Card from '../../../../components/ui/Card'
import { localStoreBenefits } from '../data/agriStores.mock'

export default function LocalStoreBenefits() {
  return <Card className="min-w-0 p-3 xl:min-h-[260px] xl:flex xl:flex-col xl:justify-between"><h2 className="flex items-center gap-2 text-sm font-bold text-slate-900"><Leaf className="size-6 fill-emerald-700 text-emerald-700" />Why Buy from Local Agri Stores?</h2><ul className="mt-2 space-y-1.5 xl:flex xl:flex-1 xl:flex-col xl:justify-around xl:space-y-0">{localStoreBenefits.map(benefit => <li key={benefit} className="flex items-start gap-2 text-[11px] leading-tight text-slate-600"><Check className="size-4 shrink-0 text-emerald-700" />{benefit}</li>)}</ul><div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 p-2"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-emerald-100"><UsersRound className="size-6 fill-emerald-700 text-emerald-700" /></span><p className="text-[11px] leading-tight text-slate-600"><strong className="block text-xs text-emerald-950">Stronger Communities<br />Healthier Farms</strong>Shop local. Grow together.</p></div></Card>
}
