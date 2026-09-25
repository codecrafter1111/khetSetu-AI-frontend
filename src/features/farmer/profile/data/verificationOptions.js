import { FileCheck2, FileText, Leaf, MessageCircleMore, ShieldCheck, UsersRound } from 'lucide-react'

export const documentTypes = [
  { key: 'identityProof', icon: ShieldCheck, title: 'Identity Proof', required: true, description: 'Upload a valid government-issued identity proof (Aadhaar, PAN, Voter ID, etc.).' },
  { key: 'landProof', icon: UsersRound, title: 'Farm / Land Proof', required: true, description: 'Upload land ownership or tenancy proof (Khasra/Khatauni, Land Record, Lease Deed, etc.).' },
  { key: 'organicCertificate', icon: Leaf, title: 'Organic Certification', description: 'Upload your organic certification certificate (if available).' },
  { key: 'fpoMembership', icon: UsersRound, title: 'FPO / Cooperative Membership', description: 'Upload FPO, SHG, or cooperative membership certificate (if applicable).' },
  { key: 'additionalDocuments', icon: FileText, title: 'Additional Documents', description: 'Upload any other relevant documents (e.g., soil test report, water source proof, etc.).' },
]

export const verificationHighlights = [
  { icon: ShieldCheck, title: 'Verified Identity', description: 'Valid government ID (Aadhaar, PAN, etc.) with clear details.' },
  { icon: UsersRound, title: 'Farm/Land Proof', description: 'Valid land ownership or tenancy documents.' },
  { icon: Leaf, title: 'Organic Certification', description: 'Organic certificates from recognized bodies (if applicable).' },
  { icon: FileCheck2, title: 'Document Clarity', description: 'Ensure all documents are clear, readable, and up to date.' },
  { icon: MessageCircleMore, title: 'Admin Review Remarks', description: 'Our team will verify and may request additional information if needed.' },
]

export const verificationStatuses = ['Submitted', 'Under Review', 'Verified', 'Complete']
