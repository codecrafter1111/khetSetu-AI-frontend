import { Leaf } from 'lucide-react'

export default function FarmerPageHero({ title, subtitle, icon: Icon, iconPlacement = 'start', slogan = ['Bharat', 'Ka Kisan', 'Bharat Ki Shaan'], showFarmer = true }) {
  return <section className="relative h-[150px] overflow-hidden bg-[url('/images/dashboard/farmer-hero.png')] bg-[length:150%_auto] bg-[position:left_37%] bg-no-repeat px-5 pt-8 sm:px-6">
    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
    <div className="relative z-10 max-w-2xl"><h1 className="flex items-center gap-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{Icon && iconPlacement === 'start' && <Icon className="size-10 shrink-0 fill-emerald-700 text-emerald-800" />}{title}{Icon && iconPlacement === 'end' && <Icon className="size-8 shrink-0 fill-emerald-600 text-emerald-700" />}</h1><p className="mt-1 text-sm text-slate-600 sm:text-base">{subtitle}</p></div>
    <div className="absolute right-[26%] top-4 hidden rotate-[-5deg] text-center font-serif text-lg font-bold italic leading-tight text-slate-900 xl:block">{slogan.map(line => <span key={line} className="block">{line}</span>)}</div>
    {showFarmer && <img src="/images/dashboard/farmer-cutout.png" alt="" className="absolute -bottom-9 right-24 hidden h-[184px] w-[184px] object-contain xl:block" />}
    <div className="absolute right-5 top-5 hidden items-center gap-2 text-sm font-bold leading-tight text-emerald-900 xl:flex"><Leaf className="size-8 fill-emerald-600 text-emerald-700" /><span>Better<br />Farms<br />Brighter<br />Futures</span></div>
  </section>
}
