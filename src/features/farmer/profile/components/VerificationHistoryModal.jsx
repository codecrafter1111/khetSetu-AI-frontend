import { Clock3, X } from 'lucide-react'

export default function VerificationHistoryModal({ history, loading, onClose }) {
  return <div className="verification-modal" role="dialog" aria-modal="true" aria-labelledby="verification-history-title"><section><header><div><h2 id="verification-history-title">Verification History</h2><p>All updates and review remarks for your application.</p></div><button type="button" onClick={onClose} aria-label="Close verification history"><X /></button></header>{loading ? <div className="history-loading">Loading history...</div> : <div className="history-list">{history.map((item) => <article key={`${item.status}-${item.date}`}><span><Clock3 /></span><div><strong>{item.status}</strong><small>{item.date}</small><p>{item.remark}</p></div></article>)}</div>}</section></div>
}
