import { ChevronDown, Users } from 'lucide-react'

const roles = ['Farmer', 'Consumer', 'Delivery Partner', 'Shopkeeper', 'Admin']

export default function RoleSelect({ value, onChange, error, id = 'role', label }) {
  return (
    <label className="auth-field-wrap" htmlFor={id}>
      {label && <span className="auth-label">{label}</span>}
      <span className={`auth-field auth-field--select${error ? ' auth-field--error' : ''}`}>
        <Users className="auth-field__icon" aria-hidden="true" />
        <select id={id} name="role" value={value} onChange={onChange} aria-invalid={Boolean(error)} required>
          <option value="">Select your role</option>
          {roles.map((role) => <option key={role} value={role}>{role}</option>)}
        </select>
        <ChevronDown className="auth-field__chevron" aria-hidden="true" />
      </span>
      {error && <span className="auth-field__error" role="alert">{error}</span>}
    </label>
  )
}
