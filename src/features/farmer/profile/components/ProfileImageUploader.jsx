import { Camera, LoaderCircle } from 'lucide-react'
import { useRef } from 'react'

export default function ProfileImageUploader({ image, uploading, progress, error, onChange }) {
  const inputRef = useRef(null)
  return (
    <section className="profile-photo-section">
      <div>
        <h3>Profile Photo</h3>
        <div className="profile-photo">
          <img src={image} alt="Ramesh Yadav profile preview" />
          <span><Camera aria-hidden="true" /></span>
        </div>
      </div>
      <div className="profile-photo-copy">
        <h3>Upload Profile Photo</h3>
        <p>Add a clear photo of yourself<br />so buyers and partners can recognize you.<br />JPG, PNG (Max 5 MB)</p>
        <input ref={inputRef} type="file" accept="image/jpeg,image/png" onChange={(event) => onChange(event.target.files?.[0])} hidden />
        <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading}>
          {uploading ? <LoaderCircle className="spin" /> : <Camera />} {uploading ? `Uploading ${progress}%` : 'Change Photo'}
        </button>
        {error && <small role="alert">{error}</small>}
      </div>
    </section>
  )
}
