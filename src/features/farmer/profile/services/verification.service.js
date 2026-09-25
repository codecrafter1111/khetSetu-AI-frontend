const STORAGE_KEY = 'khetsetu-farmer-verification'
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'application/pdf']

const makeDocument = (id, fileName, fileSize, uploadedAt) => ({ id, fileName, fileUrl: `/api/verification/documents/${id}`, fileType: fileName.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg', fileSize, uploadedAt, status: 'Uploaded' })

const initialVerification = {
  verificationId: 'VER-KS-2025-0420', status: 'Draft', submittedAt: null, reviewedAt: null, verifiedAt: null, adminRemarks: '',
  documents: {
    identityProof: makeDocument('doc-id-1', 'aadhaar_card.jpg', 1.2, '2025-04-18T09:15:00.000Z'),
    landProof: makeDocument('doc-land-1', 'land_record.pdf', 2.4, '2025-04-18T09:19:00.000Z'),
    organicCertificate: makeDocument('doc-organic-1', 'organic_certificate.pdf', 1.8, '2025-04-20T09:00:00.000Z'),
    fpoMembership: makeDocument('doc-fpo-1', 'fpo_membership.jpg', 1.1, '2025-04-19T12:20:00.000Z'),
    additionalDocuments: [makeDocument('doc-extra-1', 'soil_test_report.pdf', 2.3, '2025-04-20T09:05:00.000Z')],
  },
}

const wait = (duration = 350) => new Promise((resolve) => window.setTimeout(resolve, duration))

export async function getFarmerVerification() {
  await wait()
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : structuredClone(initialVerification)
}

export async function uploadVerificationDocument(documentType, file, onProgress) {
  if (!ACCEPTED_TYPES.includes(file.type)) throw new Error('Choose a JPG, PNG, or PDF document.')
  if (file.size > 5 * 1024 * 1024) throw new Error('The document must be smaller than 5 MB.')
  for (const progress of [18, 39, 61, 82, 100]) { await wait(75); onProgress?.(progress) }
  const id = `${documentType}-${Date.now()}`
  return makeDocument(id, file.name, Number((file.size / 1024 / 1024).toFixed(1)), new Date().toISOString())
}

export async function deleteVerificationDocument(documentId) {
  await wait(220)
  return { deleted: true, documentId }
}

export async function saveVerificationDraft(verification) {
  await wait(280)
  const next = { ...verification, status: verification.status === 'Not Submitted' ? 'Draft' : verification.status }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return structuredClone(next)
}

export async function submitFarmerVerification(verification) {
  await wait(650)
  const next = { ...verification, status: 'Under Review', submittedAt: new Date().toISOString(), verificationId: verification.verificationId || `VER-KS-${Date.now()}` }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return structuredClone(next)
}

export async function getVerificationHistory() {
  await wait(240)
  return [
    { status: 'Under Review', date: 'Apr 20, 2025', remark: 'Documents assigned to the verification team.' },
    { status: 'Submitted', date: 'Apr 20, 2025', remark: 'Verification request submitted successfully.' },
    { status: 'Draft Updated', date: 'Apr 18, 2025', remark: 'Identity and land proof documents uploaded.' },
  ]
}

export async function resubmitVerification(verification) {
  return submitFarmerVerification({ ...verification, adminRemarks: '' })
}
