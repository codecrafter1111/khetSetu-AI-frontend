import { MapPin, ShieldCheck, SlidersHorizontal, Star, UserRound } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { routes } from '../../../../config/routes'

const items = [
  [routes.consumer.profile, 'Personal Information', UserRound],
  [routes.consumer.profileAddresses, 'Addresses', MapPin],
  [routes.consumer.profilePreferences, 'Preferences', SlidersHorizontal],
  [routes.consumer.profileSecurity, 'Security', ShieldCheck],
  [routes.consumer.profileReviews, 'My Reviews', Star],
]

export default function ProfileSettingsNav() {
  return <nav className="consumer-settings-nav" aria-label="Profile settings">{items.map(([to, label, Icon]) => <NavLink key={to} to={to} end={to === routes.consumer.profile} className={({ isActive }) => isActive ? 'active' : ''}><Icon />{label}</NavLink>)}</nav>
}
