import { useRef, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import PersonalInformationForm from '../components/PersonalInformationForm'
import ProfileSettingsNav from '../components/ProfileSettingsNav'
import ProfileSummaryCard from '../components/ProfileSummaryCard'
import useConsumerProfile from '../hooks/useConsumerProfile'
import '../profile.css'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const mobilePattern = /^(?:\+91\s?)?[6-9]\d{4}\s?\d{5}$/

function validate(profile) {
  const errors = {}
  if (profile.fullName.trim().length < 2) errors.fullName = 'Enter your full name using at least 2 characters.'
  if (!emailPattern.test(profile.email.trim())) errors.email = 'Enter a valid email address.'
  if (!mobilePattern.test(profile.mobileNumber.trim())) errors.mobileNumber = 'Enter a valid Indian mobile number.'
  if (!profile.preferredLanguage) errors.preferredLanguage = 'Select your preferred language.'
  return errors
}

export default function ConsumerProfilePage() {
  const formRef = useRef(null)
  const { profile, loading, error, saving, uploading, uploadProgress, imageError, update, save, uploadImage, retry } = useConsumerProfile()
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState('')

  const change = (event) => { update(event.target.name, event.target.value); setErrors((current) => ({ ...current, [event.target.name]: '' })) }
  const submit = async (event) => {
    event.preventDefault()
    const nextErrors = validate(profile)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    try { await save(); setToast('Profile changes saved successfully') } catch { setToast('We could not save your changes. Please try again.') }
  }
  const image = async (file) => { if (file && await uploadImage(file)) setToast('Profile photo updated successfully') }
  const edit = () => { formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); window.setTimeout(() => formRef.current?.querySelector('input')?.focus(), 350) }

  return <div className="consumer-profile-page">
    <section className="consumer-profile-hero"><h1>My Profile</h1><p>Manage your personal information and account settings.</p></section>
    <div className="consumer-profile-content">{loading ? <ConsumerProfileLoading /> : error ? <div className="consumer-profile-error" role="alert"><h2>Profile unavailable</h2><p>{error}</p><button type="button" onClick={retry}>Try again</button></div> : <>
      <ProfileSummaryCard profile={profile} uploading={uploading} progress={uploadProgress} imageError={imageError} onImage={image} onEdit={edit} />
      <section className="consumer-settings-card"><ProfileSettingsNav /><PersonalInformationForm ref={formRef} profile={profile} errors={errors} saving={saving} onChange={change} onSubmit={submit} /></section>
    </>}</div>
    {toast && <div className={`consumer-profile-toast${toast.startsWith('We could') ? ' error' : ''}`} role="status"><CheckCircle2 />{toast}<button type="button" onClick={() => setToast('')} aria-label="Dismiss notification">×</button></div>}
  </div>
}

function ConsumerProfileLoading() { return <div className="consumer-profile-loading" aria-label="Loading profile"><div /><section><i /><i /></section></div> }
