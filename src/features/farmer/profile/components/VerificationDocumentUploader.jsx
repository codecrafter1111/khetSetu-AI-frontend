import { CheckCircle2, FileText, LoaderCircle, Upload, X } from 'lucide-react'
import { useRef } from 'react'

export default function VerificationDocumentUploader({ config, document, uploading, progress, error, readOnly, onUpload, onRemove }) {
  const inputRef = useRef(null)
  const Icon = config.icon
  const select = (files) => { const file = files?.[0]; if (file) onUpload(file) }
  return <article className={`verification-document${error ? ' has-error' : ''}`}>
    <div className="verification-document__intro"><span><Icon /></span><div><h3>{config.title}{config.required && <b> *</b>}</h3><p>{config.description}</p></div></div>
    <div className="verification-document__body">
      <div className="document-formats"><strong>Accepted Formats:</strong> JPG, PNG, PDF (Max 5 MB)</div>
      {!readOnly && <button type="button" className="document-drop" onClick={() => inputRef.current?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); select(event.dataTransfer.files) }} disabled={uploading}>
        {uploading ? <LoaderCircle className="spin" /> : <Upload />}<span>{uploading ? `Uploading ${progress}%` : <>Drag & drop file here<br />or click to upload</>}</span>
      </button>}
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,application/pdf" hidden onChange={(event) => select(event.target.files)} />
      {document ? <div className="document-preview"><div className="document-thumb"><FileText /><i /><i /><i /></div><div><strong>{document.fileName}</strong><p>{document.fileSize} MB <span>•</span> Uploaded on {new Date(document.uploadedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p><em><CheckCircle2 /> Uploaded</em></div>{!readOnly && <button type="button" onClick={onRemove} aria-label={`Remove ${document.fileName}`}><X /></button>}</div> : readOnly ? <p className="document-empty">No document submitted</p> : null}
      {error && <div className="document-error" role="alert"><span>{error}</span><button type="button" onClick={() => inputRef.current?.click()}>Try again</button></div>}
    </div>
  </article>
}
