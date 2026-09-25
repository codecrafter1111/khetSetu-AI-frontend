import { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle2, FileText, House, Languages, Leaf, Mail, MapPin, Phone, Save, Sprout, UserRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../../config/routes'
import FarmerPageHero from '../components/FarmerPageHero'
import ProfileField from '../profile/components/ProfileField'
import ProfileImageUploader from '../profile/components/ProfileImageUploader'
import ProfileSidebarCards from '../profile/components/ProfileSidebarCards'
import ProfileStepper from '../profile/components/ProfileStepper'
import { districts, experienceRanges, languages, states } from '../profile/data/profileOptions'
import { getFarmerProfile, saveProfileDraft, updateFarmerProfile, uploadProfileImage } from '../profile/services/farmerProfile.service'
import '../profile/profile.css'

const emptyProfile = { fullName: '', mobileNumber: '', email: '', preferredLanguage: '', state: '', district: '', village: '', farmingExperience: '', shortBio: '', profileImage: '' }
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const mobilePattern = /^(?:\+91\s?)?[6-9]\d{4}\s?\d{5}$/

function validateProfile(profile) {
  const errors = {}
  if (profile.fullName.trim().length < 2) errors.fullName = 'Enter your full name (at least 2 characters).'
  if (!mobilePattern.test(profile.mobileNumber.trim())) errors.mobileNumber = 'Enter a valid Indian mobile number.'
  if (profile.email && !emailPattern.test(profile.email)) errors.email = 'Enter a valid email address.'
  if (!profile.preferredLanguage) errors.preferredLanguage = 'Select your preferred language.'
  if (!profile.state) errors.state = 'Select your state.'
  if (!profile.district) errors.district = 'Select your district.'
  if (!profile.village.trim()) errors.village = 'Enter your village.'
  if (!profile.farmingExperience) errors.farmingExperience = 'Select your farming experience.'
  if (!profile.shortBio.trim()) errors.shortBio = 'Tell buyers a little about yourself.'
  if (profile.shortBio.length > 300) errors.shortBio = 'Your bio cannot exceed 300 characters.'
  return errors
}

export default function FarmerProfile() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(emptyProfile)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [errors, setErrors] = useState({})
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadError, setUploadError] = useState('')
  const [toast, setToast] = useState('')

  const loadProfile = async () => {
    setLoading(true)
    setLoadError('')
    try {
      setProfile(await getFarmerProfile())
    } catch {
      setLoadError('We could not load your profile. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let active = true
    getFarmerProfile()
      .then((data) => { if (active) setProfile(data) })
      .catch(() => { if (active) setLoadError('We could not load your profile. Please check your connection and try again.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])
  useEffect(() => {
    if (!dirty) return undefined
    const protectChanges = (event) => { event.preventDefault(); event.returnValue = '' }
    window.addEventListener('beforeunload', protectChanges)
    return () => window.removeEventListener('beforeunload', protectChanges)
  }, [dirty])
  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(''), 2800)
    return () => window.clearTimeout(timer)
  }, [toast])

  const update = (event) => {
    const { name, value } = event.target
    setProfile((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setDirty(true)
  }

  const changePhoto = async (file) => {
    if (!file) return
    setUploadError('')
    setUploading(true)
    setUploadProgress(0)
    try {
      const profileImage = await uploadProfileImage(file, setUploadProgress)
      setProfile((current) => ({ ...current, profileImage }))
      setDirty(true)
      setToast('Profile photo updated')
    } catch (error) {
      setUploadError(error.message)
    } finally {
      setUploading(false)
    }
  }

  const save = async (mode) => {
    if (mode === 'continue') {
      const nextErrors = validateProfile(profile)
      setErrors(nextErrors)
      if (Object.keys(nextErrors).length) {
        document.querySelector('.profile-field.has-error, .profile-bio.has-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        return
      }
    }

    setSaving(true)
    try {
      if (mode === 'draft') {
        await saveProfileDraft(profile)
        setToast('Profile saved as draft')
      } else {
        await updateFarmerProfile(profile)
        navigate(routes.farmer.profileFarmBasics)
      }
      setDirty(false)
    } catch {
      setToast('Something went wrong. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return <>
    <FarmerPageHero title="Complete Profile" subtitle="Help us know you better. Complete your profile to unlock all features and grow with KhetSetu AI." icon={Leaf} iconPlacement="end" slogan={['Meri Mitti', 'Mera Bhavishya']} />
    <div className="farmer-profile-page">
      <ProfileStepper />
      {loading ? <ProfileLoading /> : loadError ? <ProfileError message={loadError} onRetry={loadProfile} /> : (
        <div className="profile-layout">
          <section className="profile-form-card">
            <header className="profile-section-heading"><Leaf /><div><h2>Personal Information</h2><p>Tell us about yourself and your location.</p></div></header>
            <ProfileImageUploader image={profile.profileImage} uploading={uploading} progress={uploadProgress} error={uploadError} onChange={changePhoto} />
            <form onSubmit={(event) => { event.preventDefault(); save('continue') }} noValidate>
              <div className="profile-form-grid">
                <ProfileField label="Full Name" required icon={UserRound} name="fullName" value={profile.fullName} onChange={update} error={errors.fullName} autoComplete="name" />
                <ProfileField label="Mobile Number" required icon={Phone} name="mobileNumber" value={profile.mobileNumber} onChange={update} error={errors.mobileNumber} inputMode="tel" autoComplete="tel" />
                <ProfileField label="Email Address" icon={Mail} name="email" type="email" value={profile.email} onChange={update} error={errors.email} autoComplete="email" />
                <ProfileField label="Preferred Language" required icon={Languages} name="preferredLanguage" value={profile.preferredLanguage} onChange={update} error={errors.preferredLanguage} options={languages} />
                <ProfileField label="State" required icon={MapPin} name="state" value={profile.state} onChange={update} error={errors.state} options={states} />
                <ProfileField label="District" required icon={MapPin} name="district" value={profile.district} onChange={update} error={errors.district} options={districts} />
                <ProfileField label="Village" required icon={House} name="village" value={profile.village} onChange={update} error={errors.village} autoComplete="address-level3" />
                <ProfileField label="Farming Experience" required icon={Sprout} name="farmingExperience" value={profile.farmingExperience} onChange={update} error={errors.farmingExperience} options={experienceRanges} />
              </div>
              <label className={`profile-bio${errors.shortBio ? ' has-error' : ''}`}>
                <span>Short Bio <b>*</b></span>
                <span><FileText /><textarea name="shortBio" value={profile.shortBio} onChange={update} maxLength={300} rows={3} aria-invalid={Boolean(errors.shortBio)} /><small>{profile.shortBio.length}/300</small></span>
                {errors.shortBio && <em role="alert">{errors.shortBio}</em>}
              </label>
              <div className="profile-actions">
                <button type="button" className="draft-button" onClick={() => save('draft')} disabled={saving || uploading}><Save /> {saving ? 'Saving...' : 'Save as Draft'}</button>
                <button type="submit" className="continue-button" disabled={saving || uploading}>{saving ? 'Saving profile...' : 'Continue to Farm Basics'} <ArrowRight /></button>
              </div>
            </form>
          </section>
          <ProfileSidebarCards />
        </div>
      )}
    </div>
    {toast && <div className={`profile-toast${toast.startsWith('Something') ? ' error' : ''}`} role="status"><CheckCircle2 />{toast}</div>}
  </>
}

function ProfileLoading() {
  return <div className="profile-loading" aria-label="Loading profile"><div /><div><i /><i /><i /><i /></div></div>
}

function ProfileError({ message, onRetry }) {
  return <div className="profile-error" role="alert"><h2>Profile unavailable</h2><p>{message}</p><button type="button" onClick={onRetry}>Try again</button></div>
}
