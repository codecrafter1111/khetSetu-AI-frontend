import { useEffect, useRef, useState } from 'react'
import { Check, CloudUpload, Upload } from 'lucide-react'
import Card from '../../../../components/ui/Card'
import { uploadTips } from '../data/cropDoctor.mock'

export default function UploadCropImage() {
  const inputRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)

  useEffect(() => () => { if (preview?.url) URL.revokeObjectURL(preview.url) }, [preview])

  function chooseFile(file) {
    if (!file) return
    if (!['image/jpeg', 'image/png'].includes(file.type)) { setError('Choose a JPG or PNG image.'); return }
    if (file.size > 10 * 1024 * 1024) { setError('The image must be 10MB or smaller.'); return }
    setError('')
    setPreview({ name: file.name, url: URL.createObjectURL(file) })
  }

  return <Card className="min-w-0 p-4 xl:min-h-[550px] xl:flex xl:flex-col xl:justify-between"><h2 className="flex items-center gap-3 text-lg font-bold text-slate-900"><Upload className="size-6 text-emerald-700" />Upload Crop Image</h2><input ref={inputRef} type="file" accept="image/jpeg,image/png" className="sr-only" onChange={event => { chooseFile(event.target.files?.[0]); event.target.value = '' }} aria-label="Choose a crop image" /><button type="button" onClick={() => inputRef.current?.click()} onDragOver={event => { event.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={event => { event.preventDefault(); setDragging(false); chooseFile(event.dataTransfer.files?.[0]) }} className={`mt-3.5 flex h-[305px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed text-center transition ${dragging ? 'border-emerald-600 bg-emerald-50' : 'border-slate-300 bg-white hover:bg-slate-50'}`}>
    {preview ? <><img src={preview.url} alt="Selected crop preview" className="max-h-[215px] max-w-full rounded-lg object-contain" /><span className="mt-2 max-w-full truncate px-3 text-xs text-slate-600">{preview.name}</span></> : <><span className="grid size-[68px] place-items-center rounded-full bg-slate-100"><CloudUpload className="size-8 text-slate-900" /></span><strong className="mt-3 text-sm text-slate-900">Drag &amp; drop an image here</strong><span className="mt-1 text-sm text-slate-500">or click to upload</span><span className="mt-6 text-xs text-slate-500">JPG, PNG up to 10MB</span></>}
  </button>{error && <p role="alert" className="mt-1 text-xs text-red-700">{error}</p>}<div className="mt-4 rounded-xl bg-emerald-50 p-3"><h3 className="text-sm font-semibold text-emerald-950">Tips for better results:</h3><ul className="mt-2 space-y-1">{uploadTips.map(tip => <li key={tip} className="flex items-center gap-2 text-xs text-slate-700"><Check className="size-4 shrink-0 text-emerald-700" />{tip}</li>)}</ul></div></Card>
}
