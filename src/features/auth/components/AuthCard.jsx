import { Link } from 'react-router-dom'
import Brand from './Brand'

export default function AuthCard({ title, subtitle, alternateText, alternateLabel, alternateTo, children }) {
  return (
    <main className="auth-card">
      <Brand compact />
      <div className="auth-card__heading">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {children}
      <div className="auth-divider"><span>or</span></div>
      <p className="auth-alternate">{alternateText} <Link to={alternateTo}>{alternateLabel}</Link></p>
      <div className="auth-card__values" aria-label="Our values">
        <LeafMark />
        <span>Good Food</span><i />
        <span>Stronger Communities</span><i />
        <span>A Brighter Tomorrow</span>
      </div>
    </main>
  )
}

function LeafMark() {
  return <span className="auth-card__leaf" aria-hidden="true">⌁</span>
}
