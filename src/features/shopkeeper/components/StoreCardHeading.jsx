import { Pencil } from 'lucide-react'

export default function StoreCardHeading({ icon: Icon, title, onEdit, action = 'Edit' }) {
  return <div className="mb-4 flex min-h-[32px] items-center justify-between gap-2"><h2 className={`flex min-w-0 items-center gap-2 font-bold text-[#19243c] ${title === 'Supported Product Categories' ? 'text-[14px]' : 'text-[17px]'}`}><Icon size={25} className="shrink-0 text-emerald-800" fill={title === 'Store Strengths' || title === 'Key Features' ? 'currentColor' : 'none'} />{title}</h2>{onEdit && <button type="button" onClick={onEdit} className="inline-flex shrink-0 items-center gap-1 text-[12px] font-medium text-[#24579b] hover:underline">{action === 'Edit Store Profile' && <Pencil size={12} />}{action}</button>}</div>
}
