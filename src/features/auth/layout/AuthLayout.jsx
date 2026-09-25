import { Leaf, ShieldCheck, Sprout, Truck, Utensils, UsersRound } from 'lucide-react'
import { Outlet, useLocation } from 'react-router-dom'
import Brand from '../components/Brand'
import '../auth.css'

const loginBenefits = [
  [Sprout, 'Better', 'Livelihoods'],
  [Utensils, 'Fresh &', 'Healthy Food'],
  [UsersRound, 'Stronger', 'Local Economies'],
  [Leaf, 'A Greener', 'Tomorrow'],
]
const signupBenefits = [
  [ShieldCheck, 'Trusted', 'Network'],
  [Leaf, 'Traceable', 'Produce'],
  [Utensils, 'Healthy', 'Food'],
  [UsersRound, 'Stronger', 'Communities'],
]

export default function AuthLayout() {
  const { pathname } = useLocation()
  const signup = pathname.endsWith('/signup')
  const benefits = signup ? signupBenefits : loginBenefits

  return (
    <div className={`auth-page auth-page--${signup ? 'signup' : 'login'}`}>
      <section className="auth-story" aria-label="KhetSetu mission">
        <Brand />
        <div className="auth-story__motto">Local Roots<br /><span>Global Impact</span></div>
        <div className="auth-story__copy">
          <h2>{signup ? <>Real People.<br />Real Produce.<br /></> : <>Stronger<br />Connections<br /></>}<em>A {signup ? 'Brighter' : 'Healthier'} Tomorrow.</em></h2>
          <p>Connecting farmers, consumers and communities<br />for a more sustainable food future.</p>
          <div className="auth-benefits">
            {benefits.map(([Icon, first, second]) => (
              <div className="auth-benefit" key={`${first}-${second}`}>
                <span><Icon aria-hidden="true" /></span>
                <p>{first}<br />{second}</p>
              </div>
            ))}
          </div>
        </div>
        <img className="auth-story__farmer" src="/images/dashboard/farmer-cutout.png" alt="Smiling KhetSetu farmer" />
        <div className="auth-story__path" aria-hidden="true">
          <span><Sprout /></span><b>Farmers<br />Grow</b>
          <i />
          <span><Truck /></span><b>Food Reaches<br />Communities</b>
          <i />
          <span><UsersRound /></span><b>Healthier<br />People</b>
        </div>
        <p className="auth-story__script">Same Soil.<br />Brighter Tomorrows</p>
        <p className="auth-story__footer">Bridging Fields and Futures</p>
      </section>

      <section className="auth-panel">
        <div className="auth-panel__top">People <i /> Produce <i /> Progress <Leaf aria-hidden="true" /></div>
        <Outlet />
      </section>
    </div>
  )
}
