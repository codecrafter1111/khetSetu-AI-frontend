import { ChevronDown } from 'lucide-react'

export default function ProfileField({ label, required, icon: Icon, error, options, ...props }) {
  const Element = options ? 'select' : 'input'
  return (
    <label className={`profile-field${error ? ' has-error' : ''}`}>
      <span>{label}{required && <b aria-hidden="true"> *</b>}</span>
      <span className="profile-field__control">
        <Icon aria-hidden="true" />
        <Element {...props} aria-invalid={Boolean(error)} aria-required={required || undefined}>
          {options?.map((option) => <option key={option}>{option}</option>)}
        </Element>
        {options && <ChevronDown className="profile-field__chevron" aria-hidden="true" />}
      </span>
      {error && <small role="alert">{error}</small>}
    </label>
  )
}
