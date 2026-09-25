import { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle2, Leaf, Save } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../../config/routes'
import FarmerPageHero from '../components/FarmerPageHero'
import VerificationDocumentUploader from '../profile/components/VerificationDocumentUploader'
import VerificationHistoryModal from '../profile/components/VerificationHistoryModal'
import VerificationInfoCards from '../profile/components/VerificationInfoCards'
import VerificationStatusCard from '../profile/components/VerificationStatusCard'
import { documentTypes } from '../profile/data/verificationOptions'
import { deleteVerificationDocument, getFarmerVerification, getVerificationHistory, resubmitVerification, saveVerificationDraft, submitFarmerVerification, uploadVerificationDocument } from '../profile/services/verification.service'
import '../profile/profile.css'
import '../profile/verification.css'

const emptyVerification = { verificationId: '', status: 'Not Submitted', submittedAt: null, reviewedAt: null, verifiedAt: null, adminRemarks: '', documents: { identityProof: null, landProof: null, organicCertificate: null, fpoMembership: null, additionalDocuments: [] } }
const lockedStatuses = ['Submitted', 'Under Review', 'Verified', 'Complete']

export default function FarmerProfileVerification() {
  const navigate = useNavigate()
  const [verification, setVerification] = useState(emptyVerification)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [uploading, setUploading] = useState({})
  const [uploadProgress, setUploadProgress] = useState({})
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const [historyOpen, setHistoryOpen] = useState(false)
  const [historyLoading, setHistoryLoading] = useState(false)
  const [history, setHistory] = useState([])
  const readOnly = lockedStatuses.includes(verification.status)
  const needsResubmission = verification.status === 'Rejected' || verification.status === 'More Information Required'

  const load = async () => {
    setLoading(true); setLoadError('')
    try { setVerification(await getFarmerVerification()) } catch { setLoadError('We could not load your verification information. Please try again.') } finally { setLoading(false) }
  }

  useEffect(() => {
    let active = true
    getFarmerVerification().then((data) => { if (active) setVerification(data) }).catch(() => { if (active) setLoadError('We could not load your verification information. Please try again.') }).finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])
  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(''), 3000)
    return () => window.clearTimeout(timer)
  }, [toast])

  const documentFor = (key) => key === 'additionalDocuments' ? verification.documents.additionalDocuments[0] : verification.documents[key]
  const setDocument = (key, document) => setVerification((current) => ({ ...current, documents: { ...current.documents, [key]: key === 'additionalDocuments' ? (document ? [document] : []) : document } }))

  const upload = async (key, file) => {
    setUploading((current) => ({ ...current, [key]: true })); setUploadProgress((current) => ({ ...current, [key]: 0 })); setErrors((current) => ({ ...current, [key]: '' }))
    try {
      const document = await uploadVerificationDocument(key, file, (progress) => setUploadProgress((current) => ({ ...current, [key]: progress })))
      setDocument(key, document); setToast(`${document.fileName} uploaded successfully`)
    } catch (error) { setErrors((current) => ({ ...current, [key]: error.message })) } finally { setUploading((current) => ({ ...current, [key]: false })) }
  }

  const remove = async (key) => {
    const document = documentFor(key)
    if (!document || !window.confirm(`Remove ${document.fileName}?`)) return
    setUploading((current) => ({ ...current, [key]: true }))
    try { await deleteVerificationDocument(document.id); setDocument(key, null); setToast('Document removed') } catch { setErrors((current) => ({ ...current, [key]: 'Document removal failed. Please try again.' })) } finally { setUploading((current) => ({ ...current, [key]: false })) }
  }

  const saveDraft = async () => {
    setSaving(true)
    try { const next = await saveVerificationDraft(verification); setVerification(next); setToast('Verification saved as draft') } catch { setToast('Something went wrong. Please try again.') } finally { setSaving(false) }
  }

  const submit = async () => {
    const requiredErrors = {}
    if (!verification.documents.identityProof) requiredErrors.identityProof = 'Identity proof is required.'
    if (!verification.documents.landProof) requiredErrors.landProof = 'Farm or land proof is required.'
    setErrors((current) => ({ ...current, ...requiredErrors }))
    if (Object.keys(requiredErrors).length) { document.querySelector('.verification-document.has-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return }
    if (!window.confirm('Submit these documents for verification? You will not be able to edit them while they are under review.')) return
    setSaving(true)
    try { setVerification(await (needsResubmission ? resubmitVerification(verification) : submitFarmerVerification(verification))); navigate(routes.farmer.profileComplete) } catch { setToast('Submission failed. Please try again.') } finally { setSaving(false) }
  }

  const showHistory = async () => {
    setHistoryOpen(true); setHistoryLoading(true)
    try { setHistory(await getVerificationHistory()) } finally { setHistoryLoading(false) }
  }

  return <>
    <FarmerPageHero title="Farm Verification" subtitle="Upload and verify your documents to build trust, unlock more market opportunities, and connect with verified buyers." icon={Leaf} iconPlacement="end" slogan={['Meri Mitti', 'Mera Pehchaan']} />
    <div className="verification-page">
      {loading ? <VerificationLoading /> : loadError ? <div className="profile-error"><h2>Verification unavailable</h2><p>{loadError}</p><button type="button" onClick={load}>Try again</button></div> : <div className="verification-layout">
        <main className="verification-main-card">
          <header className="verification-main-heading"><Leaf /><div><h2>Farm Verification</h2><p>Upload the required documents below. Our team will verify your information and notify you once completed.</p></div></header>
          {(verification.status === 'Rejected' || verification.status === 'More Information Required') && <section className="admin-feedback"><h3>{verification.status}</h3><p>{verification.adminRemarks || 'Please replace the affected document with a clearer, up-to-date copy.'}</p><button type="button" onClick={() => document.querySelector('.verification-document')?.scrollIntoView({ behavior: 'smooth' })}>Replace Document</button></section>}
          <div className="verification-documents">{documentTypes.map((config) => <VerificationDocumentUploader key={config.key} config={config} document={documentFor(config.key)} uploading={uploading[config.key]} progress={uploadProgress[config.key] || 0} error={errors[config.key]} readOnly={readOnly} onUpload={(file) => upload(config.key, file)} onRemove={() => remove(config.key)} />)}</div>
          <div className="verification-actions"><button type="button" onClick={saveDraft} disabled={saving || readOnly}><Save /> Save as Draft</button><button type="button" onClick={submit} disabled={saving || readOnly || Object.values(uploading).some(Boolean)}>{readOnly ? 'Documents Under Review' : saving ? 'Submitting...' : needsResubmission ? 'Resubmit for Verification' : 'Submit for Verification'} <ArrowRight /></button></div>
        </main>
        <aside className="verification-rail"><VerificationStatusCard verification={verification} onHistory={showHistory} /><VerificationInfoCards /></aside>
      </div>}
    </div>
    {toast && <div className={`profile-toast${toast.includes('failed') || toast.startsWith('Something') ? ' error' : ''}`} role="status"><CheckCircle2 />{toast}</div>}
    {historyOpen && <VerificationHistoryModal history={history} loading={historyLoading} onClose={() => setHistoryOpen(false)} />}
  </>
}

function VerificationLoading() { return <div className="verification-loading" aria-label="Loading verification"><div><i /><i /><i /><i /><i /></div><aside><i /><i /><i /></aside></div> }
