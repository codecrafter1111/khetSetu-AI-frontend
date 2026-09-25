import { Star } from 'lucide-react'
import { farmHighlights } from '../data/farmOptions'

export default function FarmHighlights() {
  return <section className="farm-side-card farm-highlights"><h2><Star /> Important Components</h2><div>{farmHighlights.map(({ icon: Icon, title, description }) => <article key={title}><span><Icon /></span><div><strong>{title}</strong><p>{description}</p></div></article>)}</div></section>
}
