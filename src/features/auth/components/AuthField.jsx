import { Eye, EyeOff } from 'lucide-react'

export default function AuthField({ icon: Icon, error, prefix, suffix, toggleLabel, onToggle, ...inputProps }) {
  return (
    <label className="auth-field-wrap">
      <span className={`auth-field${error ? ' auth-field--error' : ''}`}>
        {Icon && <Icon className="auth-field__icon" aria-hidden="true" />}
        {prefix}
        <input {...inputProps} aria-invalid={Boolean(error)} />
        {suffix}
        {onToggle && (
          <button className="auth-field__toggle" type="button" onClick={onToggle} aria-label={toggleLabel}>
            {inputProps.type === 'password' ? <Eye aria-hidden="true" /> : <EyeOff aria-hidden="true" />}
          </button>
        )}
      </span>
      {error && <span className="auth-field__error" role="alert">{error}</span>}
    </label>
  )
}
