import { Leaf } from 'lucide-react'

export default function Brand({ compact = false }) {
  return (
    <div className={`auth-brand${compact ? ' auth-brand--compact' : ''}`} aria-label="KhetSetu AI">
      <span className="auth-brand__mark" aria-hidden="true"><Leaf /></span>
      <span>
        <strong>KhetSetu AI</strong>
        <small>From Farms to Future</small>
      </span>
    </div>
  )
}
