import { Leaf } from 'lucide-react'
export default function ConsumerPromoCard() {
  return <div className="relative hidden h-[420px] overflow-hidden rounded-xl bg-[#e4fae9] bg-[url('/images/consumer/promo.png')] bg-cover bg-center px-5 pt-7 xl:block"><Leaf size={49} className="mb-3 fill-emerald-500 text-emerald-700" /><p className="relative z-10 text-[23px] font-extrabold leading-[1.08] text-emerald-950">Fresh Food<br />Stronger<br />Communities</p><p className="relative z-10 mt-3 text-[13px] leading-tight text-slate-800">Direct from trusted<br />farmers to conscious<br />consumers.</p></div>
}
