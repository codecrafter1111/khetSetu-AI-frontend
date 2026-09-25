import { Upload, X } from 'lucide-react'
import { useRef, useState } from 'react'

export default function FarmPhotoUploader({ photos, uploading, progress, error, onUpload, onRemove }) {
  const inputRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const selectFiles = (files) => { if (files?.length) onUpload(files) }

  return <>
    <section className="farm-photos">
      <button className="farm-photo-drop" type="button" onClick={() => inputRef.current?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); selectFiles(event.dataTransfer.files) }} disabled={uploading || photos.length >= 5}>
        <Upload /><strong>{uploading ? `Uploading photos ${progress}%` : 'Drag & drop images here'}<br />or click to upload</strong><small>JPG, PNG (Max 5 MB each)</small>
      </button>
      <input ref={inputRef} type="file" accept="image/jpeg,image/png" multiple hidden onChange={(event) => selectFiles(event.target.files)} />
      <div className="farm-photo-list">{photos.map((photo) => <figure key={photo.id}><button type="button" onClick={() => setPreview(photo)} aria-label={`Preview ${photo.name}`}><img src={photo.src} alt={photo.name} /></button><button type="button" className="farm-photo-remove" onClick={() => onRemove(photo.id)} aria-label={`Remove ${photo.name}`}><X /></button></figure>)}</div>
      {error && <p role="alert">{error}</p>}
    </section>
    {preview && <div className="farm-photo-modal" role="dialog" aria-modal="true" aria-label="Farm photo preview" onClick={() => setPreview(null)}><button type="button" onClick={() => setPreview(null)} aria-label="Close preview"><X /></button><img src={preview.src} alt={preview.name} /></div>}
  </>
}
