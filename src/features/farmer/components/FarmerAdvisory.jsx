import { ArrowRight, Lightbulb } from 'lucide-react'
import Card from '../../../components/ui/Card'
import SectionHeader from '../../../components/common/SectionHeader'

export default function FarmerAdvisory() {
  return <Card className="h-full min-w-0 p-3.5"><SectionHeader icon={Lightbulb} iconClass="text-amber-500" title="Farmer Advisory" />
    <div className="flex min-h-[177px] overflow-hidden rounded-xl bg-emerald-50 p-2"><img src="/images/dashboard/healthy-crops.png" alt="Young healthy crop leaves" className="w-[37%] shrink-0 rounded-xl object-cover" /><div className="flex min-w-0 flex-col justify-center px-3"><h3 className="text-sm font-bold leading-tight text-emerald-950">Ideal time for Kharif crop preparation</h3><p className="mt-2 text-xs leading-snug text-slate-600">Prepare your fields and ensure soil health for better yield.</p><button className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-3 py-2 text-xs font-semibold whitespace-nowrap text-white hover:bg-emerald-800">Read More <ArrowRight className="size-4" /></button></div></div>
  </Card>
}
