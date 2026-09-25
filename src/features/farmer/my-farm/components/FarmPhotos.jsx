import { ArrowRight, Camera, Image } from 'lucide-react'
import Card from '../../../../components/ui/Card'
import { farmPhotos } from '../data/myFarm.mock'

export default function FarmPhotos() {
  return <Card className="min-w-0 p-3 xl:min-h-[210px] xl:flex xl:flex-col xl:justify-between">
    <div className="flex items-center justify-between gap-2 px-1"><h2 className="flex items-center gap-2 text-lg font-bold text-slate-900"><Image className="size-6 fill-emerald-700 text-emerald-700" />Farm Photos</h2><span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-800">View All <ArrowRight className="size-4" /></span></div>
    <div className="mt-2 flex gap-2 overflow-x-auto pb-1">{farmPhotos.map((photo, index) => <div key={photo.id} role="img" aria-label={photo.label} className="relative h-[135px] min-w-[94px] flex-1 overflow-hidden rounded-lg bg-[url('/images/my-farm/farm-photo-strip.png')] bg-[length:500%_100%] bg-no-repeat" style={{ backgroundPosition: photo.position }}>{index === 0 && <span className="absolute bottom-0 left-0 flex items-center gap-1 rounded-tr bg-slate-950/75 px-2 py-1 text-[10px] text-white"><Camera className="size-3" />Main Farm</span>}{index === farmPhotos.length - 1 && <span className="absolute inset-0 grid place-content-center bg-slate-950/65 text-center text-sm font-bold text-white">+8<span className="text-[10px] font-normal">More Photos</span></span>}</div>)}</div>
  </Card>
}
