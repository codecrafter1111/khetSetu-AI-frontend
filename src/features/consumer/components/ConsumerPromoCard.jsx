import { Leaf } from 'lucide-react'
export default function ConsumerPromoCard() {
  return <div className="relative hidden h-[420px] overflow-hidden rounded-xl bg-[#e4fae9] bg-[url('/images/consumer/promo.png')] bg-cover bg-center px-5 pt-7 xl:block"><Leaf size={49} className="mb-3 fill-emerald-500 text-emerald-700" /><p className="relative z-10 text-[23px] font-extrabold leading-[1.08] text-emerald-950">Good<br />Food<br />Brighter<br />Tomorrows</p><p className="relative z-10 mt-3 text-[13px] leading-tight text-slate-800">Choose farm fresh.<br />Support farmers.<br />Build a healthier<br />tomorrow together.</p></div>
}
