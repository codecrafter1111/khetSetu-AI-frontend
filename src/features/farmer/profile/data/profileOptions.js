import { BadgeCheck, Languages, MapPin, Sprout, UserRound } from 'lucide-react'

export const profileSteps = ['Personal Info', 'Farm Basics', 'Verification', 'Finish']

export const languages = ['Hindi', 'English', 'Bhojpuri', 'Marathi', 'Punjabi']
export const states = ['Uttar Pradesh', 'Bihar', 'Madhya Pradesh', 'Maharashtra', 'Punjab']
export const districts = ['Varanasi', 'Prayagraj', 'Lucknow', 'Gorakhpur', 'Mirzapur']
export const experienceRanges = ['Less than 2 years', '2 - 5 years', '5 - 10 years', '10 - 15 years', 'More than 15 years']

export const profileHighlights = [
  { icon: UserRound, title: 'Personal Information', description: 'Add your name, contact details and profile photo.' },
  { icon: Languages, title: 'Language Preference', description: 'Choose your preferred language for a better experience.' },
  { icon: MapPin, title: 'Location Details', description: 'Help buyers find your farm with accurate location information.' },
  { icon: Sprout, title: 'Farming Experience', description: 'Share your farming experience and background.' },
  { icon: BadgeCheck, title: 'Verification Ready', description: 'Complete profile to proceed with document verification.' },
]
