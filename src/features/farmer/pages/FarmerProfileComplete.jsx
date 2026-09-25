import { ArrowRight, CheckCircle2, Leaf } from 'lucide-react'
import { Link } from 'react-router-dom'
import { routes } from '../../../config/routes'
import FarmerPageHero from '../components/FarmerPageHero'
import ProfileStepper from '../profile/components/ProfileStepper'
import '../profile/profile.css'

export default function FarmerProfileComplete() {
  return <><FarmerPageHero title="Profile Submitted" subtitle="Your KhetSetu farmer profile has been submitted successfully." icon={Leaf} iconPlacement="end" slogan={['Meri Mitti', 'Mera Pehchaan']} /><div className="farmer-profile-page"><ProfileStepper activeStep={4} /><section className="profile-next-card"><CheckCircle2 /><h2>Setup Complete</h2><p>Your documents are under review. We will notify you when verification is complete, usually within 2–3 working days.</p><Link to={routes.farmer.dashboard}>Go to Farmer Dashboard <ArrowRight /></Link></section></div></>
}
