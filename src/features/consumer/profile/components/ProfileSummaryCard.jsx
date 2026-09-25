import { BadgeCheck, Camera, Mail, MapPin, Pencil, Phone } from 'lucide-react'
import { useRef } from 'react'

export default function ProfileSummaryCard({ profile, uploading, progress, imageError, onImage, onEdit }) {
  const fileRef = useRef(null)
  return <section className="consumer-profile-summary">
    <div className="consumer-avatar-wrap"><img src={profile.profileImage} alt={`${profile.fullName} profile`} /><button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} aria-label="Change profile photo"><Camera /></button><input ref={fileRef} type="file" accept="image/jpeg,image/png" hidden onChange={(event) => onImage(event.target.files?.[0])} /></div>
    <div className="consumer-profile-details"><div className="consumer-profile-name"><h2>{profile.fullName}</h2><span><BadgeCheck />{profile.verificationStatus}</span></div><p><Mail />{profile.email}</p><p><Phone />{profile.mobileNumber}</p><p><MapPin />{profile.city}, India</p>{uploading && <small>Uploading photo… {progress}%</small>}{imageError && <small className="error" role="alert">{imageError}</small>}</div>
    <button type="button" className="consumer-edit-profile" onClick={onEdit}><Pencil /> Edit Profile</button>
  </section>
}
