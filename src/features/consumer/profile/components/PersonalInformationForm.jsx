import { Save } from 'lucide-react'
import { forwardRef } from 'react'

const languages = ['English', 'Hindi', 'Punjabi', 'Marathi', 'Bengali', 'Gujarati']

const PersonalInformationForm = forwardRef(function PersonalInformationForm({ profile, errors, saving, onChange, onSubmit }, ref) {
  return <section className="consumer-personal-form" ref={ref}><header><h2>Personal Information</h2><p>Keep your personal details up to date.</p></header><form onSubmit={onSubmit} noValidate><div className="consumer-profile-grid">
    <ProfileInput label="Full Name" name="fullName" value={profile.fullName} error={errors.fullName} onChange={onChange} autoComplete="name" />
    <ProfileInput label="Email Address" name="email" type="email" value={profile.email} error={errors.email} onChange={onChange} autoComplete="email" />
    <ProfileInput label="Mobile Number" name="mobileNumber" value={profile.mobileNumber} error={errors.mobileNumber} onChange={onChange} autoComplete="tel" />
    <label className={errors.preferredLanguage ? 'has-error' : ''}><span>Preferred Language <b>*</b></span><select name="preferredLanguage" value={profile.preferredLanguage} onChange={onChange} aria-invalid={Boolean(errors.preferredLanguage)}>{languages.map((language) => <option key={language}>{language}</option>)}</select>{errors.preferredLanguage && <small role="alert">{errors.preferredLanguage}</small>}</label>
  </div><button className="consumer-save-profile" type="submit" disabled={saving}><Save />{saving ? 'Saving Changes...' : 'Save Changes'}</button></form></section>
})

function ProfileInput({ label, error, ...props }) { return <label className={error ? 'has-error' : ''}><span>{label} <b>*</b></span><input {...props} aria-invalid={Boolean(error)} />{error && <small role="alert">{error}</small>}</label> }
export default PersonalInformationForm
