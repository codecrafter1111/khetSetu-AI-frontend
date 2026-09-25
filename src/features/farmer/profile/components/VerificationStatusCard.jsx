import { Check, Clock3, Info, ShieldCheck } from 'lucide-react'
import { verificationStatuses } from '../data/verificationOptions'

const statusIndex = { Submitted: 0, 'Under Review': 1, Verified: 2, Complete: 3 }
const statusDescriptions = {
  'Not Submitted': 'Upload the required documents and submit them for verification.', Draft: 'Your uploaded documents are saved as a draft.', Submitted: 'Your documents have been submitted successfully.', 'Under Review': 'Your documents have been submitted and are currently under review by our team.', Verified: 'Your identity and farm documents have been verified.', Complete: 'Your farmer verification is complete.', Rejected: 'Your verification needs changes before it can be approved.', 'More Information Required': 'Our review team needs additional information from you.',
}

export default function VerificationStatusCard({ verification, onHistory }) {
  const index = statusIndex[verification.status] ?? -1
  const isAlert = verification.status === 'Rejected' || verification.status === 'More Information Required'
  return <section className="verification-side-card status-card">
    <header><h2><ShieldCheck /> Verification Status</h2><button type="button" onClick={onHistory}>View History →</button></header>
    <div className={`verification-status-summary${isAlert ? ' rejected' : ''}`}><span>{index >= 2 ? <Check /> : <Clock3 />}</span><div><h3>{verification.status}</h3><p>{statusDescriptions[verification.status]}</p>{verification.submittedAt && <small>Submitted on {new Date(verification.submittedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</small>}</div></div>
    <div className="verification-timeline">{verificationStatuses.map((status, itemIndex) => <div className={itemIndex < index ? 'complete' : itemIndex === index ? 'active' : ''} key={status}><span>{itemIndex < index ? <Check /> : itemIndex + 1}</span><strong>{status}</strong><small>{itemIndex === 0 && verification.submittedAt ? new Date(verification.submittedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : ''}</small></div>)}</div>
    <div className="verification-info"><Info /><p>We typically complete verification within <strong>2–3 working days.</strong> You will be notified once the process is complete.</p></div>
  </section>
}
