import { useState } from 'react'
import { LockKeyhole, Mail, Phone, UserPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../../config/routes'
import AuthCard from '../components/AuthCard'
import AuthField from '../components/AuthField'
import RoleSelect from '../components/RoleSelect'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function SignupPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', phone: '', password: '', confirmPassword: '', role: '', terms: false })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [errors, setErrors] = useState({})

  const update = (event) => {
    const { name, value, checked, type } = event.target
    const normalized = name === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : normalized }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  const submit = (event) => {
    event.preventDefault()
    const next = {}
    if (!emailPattern.test(form.email)) next.email = 'Enter a valid email address.'
    if (form.phone.length !== 10) next.phone = 'Enter a valid 10-digit phone number.'
    if (form.password.length < 8) next.password = 'Use at least 8 characters.'
    if (form.confirmPassword !== form.password) next.confirmPassword = 'Passwords do not match.'
    if (!form.role) next.role = 'Select your role.'
    if (!form.terms) next.terms = 'Accept the Terms of Service and Privacy Policy to continue.'
    setErrors(next)
    if (Object.keys(next).length === 0) navigate(routes.auth.login, { replace: true, state: { created: true, email: form.email } })
  }

  return (
    <AuthCard title="Create Your Account" subtitle="Join the trusted farm-to-city ecosystem and be part of a healthier, more sustainable food future." alternateText="Already have an account?" alternateLabel="Sign In" alternateTo={routes.auth.login}>
      <form className="auth-form auth-form--signup" onSubmit={submit} noValidate>
        <AuthField icon={Mail} name="email" type="email" value={form.email} onChange={update} placeholder="Email Address" autoComplete="email" error={errors.email} />
        <AuthField icon={Phone} name="phone" type="tel" inputMode="numeric" value={form.phone} onChange={update} placeholder="98765 43210" autoComplete="tel" error={errors.phone} prefix={<span className="auth-field__prefix">+91</span>} />
        <AuthField icon={LockKeyhole} name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={update} placeholder="Password" autoComplete="new-password" error={errors.password} onToggle={() => setShowPassword((current) => !current)} toggleLabel={showPassword ? 'Hide password' : 'Show password'} />
        <AuthField icon={LockKeyhole} name="confirmPassword" type={showConfirmation ? 'text' : 'password'} value={form.confirmPassword} onChange={update} placeholder="Confirm Password" autoComplete="new-password" error={errors.confirmPassword} onToggle={() => setShowConfirmation((current) => !current)} toggleLabel={showConfirmation ? 'Hide password confirmation' : 'Show password confirmation'} />
        <RoleSelect value={form.role} onChange={update} error={errors.role} />
        <label className="auth-check auth-check--terms">
          <input name="terms" type="checkbox" checked={form.terms} onChange={update} /><span />
          <span>I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.</span>
        </label>
        {errors.terms && <span className="auth-field__error auth-terms-error" role="alert">{errors.terms}</span>}
        <button className="auth-submit" type="submit"><UserPlus aria-hidden="true" /> Create Account</button>
      </form>
    </AuthCard>
  )
}
