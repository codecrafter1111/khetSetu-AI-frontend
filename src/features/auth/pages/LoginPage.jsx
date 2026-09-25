import { useState } from 'react'
import { LockKeyhole, LogIn, Mail } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { routes } from '../../../config/routes'
import AuthCard from '../components/AuthCard'
import AuthField from '../components/AuthField'
import RoleSelect from '../components/RoleSelect'

const destinations = {
  Farmer: routes.farmer.dashboard,
  Consumer: routes.consumer.dashboard,
  'Delivery Partner': routes.delivery.dashboard,
  Shopkeeper: routes.farmer.dashboard,
  Admin: routes.farmer.dashboard,
}

export default function LoginPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [form, setForm] = useState({ identifier: location.state?.email || '', password: '', role: '', remember: false })
  const [visible, setVisible] = useState(false)
  const [errors, setErrors] = useState({})

  const update = (event) => {
    const { name, value, checked, type } = event.target
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  const submit = (event) => {
    event.preventDefault()
    const next = {}
    if (!form.identifier.trim()) next.identifier = 'Enter your email address or phone number.'
    if (!form.password) next.password = 'Enter your password.'
    if (!form.role) next.role = 'Choose the account role you want to use.'
    setErrors(next)
    if (Object.keys(next).length === 0) {
      sessionStorage.setItem('khetsetu-role', form.role)
      navigate(destinations[form.role], { replace: true })
    }
  }

  return (
    <AuthCard title="Welcome Back" subtitle="Let's continue building a healthier, more connected food ecosystem together." alternateText="Don't have an account?" alternateLabel="Create Account" alternateTo={routes.auth.signup}>
      {location.state?.created && <p className="auth-success" role="status">Account created. You can sign in now.</p>}
      <form className="auth-form" onSubmit={submit} noValidate>
        <AuthField icon={Mail} name="identifier" value={form.identifier} onChange={update} placeholder="Email or Phone Number" autoComplete="username" error={errors.identifier} />
        <AuthField icon={LockKeyhole} name="password" type={visible ? 'text' : 'password'} value={form.password} onChange={update} placeholder="Password" autoComplete="current-password" error={errors.password} onToggle={() => setVisible((current) => !current)} toggleLabel={visible ? 'Hide password' : 'Show password'} />
        <RoleSelect label="Role" value={form.role} onChange={update} error={errors.role} />
        <div className="auth-form__options">
          <label className="auth-check"><input name="remember" type="checkbox" checked={form.remember} onChange={update} /><span />Remember me</label>
          <button className="auth-text-button" type="button">Forgot password?</button>
        </div>
        <button className="auth-submit" type="submit"><LogIn aria-hidden="true" /> Sign In</button>
      </form>
    </AuthCard>
  )
}
