import { Headphones, Leaf, MessageCircle, Star } from 'lucide-react'
import { profileHighlights } from '../data/profileOptions'

export default function ProfileSidebarCards() {
  return (
    <aside className="profile-rail">
      <section className="profile-rail-card completion-card">
        <div className="completion-summary">
          <div className="completion-ring" aria-label="Profile 25 percent complete"><strong>25%</strong></div>
          <div><h2>Profile Completion</h2><p>1 of 4 steps completed</p><div className="completion-bar"><i /></div></div>
        </div>
        <div className="completion-note"><Leaf /><div><strong>Complete your profile to access all features</strong><p>Get verified, list your products, and connect with more buyers.</p></div></div>
      </section>

      <section className="profile-rail-card components-card">
        <h2><Star /> Important Components</h2>
        <div>{profileHighlights.map(({ icon: Icon, title, description }) => <article key={title}><span><Icon /></span><div><strong>{title}</strong><p>{description}</p></div></article>)}</div>
      </section>

      <section className="profile-rail-card support-card">
        <span><Headphones /></span><div><h2>Need Help?</h2><p>Our support team is here to help you complete your profile.</p><a href="mailto:support@khetsetu.ai"><MessageCircle /> Contact Support</a></div>
      </section>
    </aside>
  )
}
