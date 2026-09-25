import { Leaf, Star } from 'lucide-react'
import { verificationHighlights } from '../data/verificationOptions'

export default function VerificationInfoCards() {
  return <>
    <section className="verification-side-card verification-highlights"><h2><Star /> Important Components</h2>{verificationHighlights.map(({ icon: Icon, title, description }) => <article key={title}><span><Icon /></span><div><strong>{title}</strong><p>{description}</p></div></article>)}</section>
    <section className="verification-side-card verification-matters"><Leaf /><div><h2>Why Verification Matters?</h2><p>A verified profile builds trust with buyers, helps you get better prices, unlocks premium markets, and gives you access to more features on KhetSetu AI.</p></div></section>
  </>
}
