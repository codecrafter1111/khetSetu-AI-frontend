import { CalendarDays, CircleCheck, Droplets, FileCheck2, Leaf, MapPin, Recycle, ShieldCheck, Sprout, Tractor } from 'lucide-react'

export const farmProfile = {
  name: 'Shivam Kisan Farm', location: 'Varanasi, Uttar Pradesh', verifiedOn: 'Apr 12, 2024',
  size: '5.0 Acres', soilType: 'Loamy Soil', method: 'Organic', crops: 'Wheat, Rice, Maize, Vegetables', landRecord: 'Verified',
}

export const farmPhotos = [
  { id: 1, label: 'Main Farm', position: '0% 50%' },
  { id: 2, label: 'Rice field', position: '25% 50%' },
  { id: 3, label: 'Irrigation', position: '50% 50%' },
  { id: 4, label: 'Vegetable field', position: '75% 50%' },
  { id: 5, label: 'More farm photos', position: '100% 50%' },
]

export const farmLocation = { village: 'Bhadani', block: 'Chandauli', district: 'Varanasi', state: 'Uttar Pradesh', pin: '221109' }

export const seasons = [
  { id: 'kharif', name: 'Kharif', months: 'Jun - Oct' },
  { id: 'rabi', name: 'Rabi', months: 'Nov - Mar' },
  { id: 'zaid', name: 'Zaid', months: 'Mar - Jun' },
]

export const seasonalCrops = {
  kharif: [
    { name: 'Rice', period: 'Jun - Oct', status: 'Planned', image: 'rice' },
    { name: 'Maize', period: 'Jun - Sep', status: 'In Progress', image: 'maize' },
    { name: 'Vegetables', period: 'Jul - Oct', status: 'Planned', image: 'tomatoes' },
    { name: 'Wheat', period: 'Nov - Mar', status: 'Upcoming', image: 'wheat' },
  ],
  rabi: [
    { name: 'Wheat', period: 'Nov - Mar', status: 'Planned', image: 'wheat' },
    { name: 'Vegetables', period: 'Nov - Feb', status: 'Planned', image: 'tomatoes' },
    { name: 'Mustard', period: 'Oct - Mar', status: 'Upcoming', image: 'mustard' },
  ],
  zaid: [
    { name: 'Vegetables', period: 'Mar - Jun', status: 'Planned', image: 'tomatoes' },
    { name: 'Maize', period: 'Mar - Jun', status: 'Upcoming', image: 'maize' },
  ],
}

export const sustainabilityPractices = [
  { title: 'Organic Manure', description: 'Using farmyard manure', icon: Sprout },
  { title: 'Crop Rotation', description: 'Rotate crops annually', icon: Recycle },
  { title: 'Water Conservation', description: 'Drip irrigation system', icon: Droplets },
  { title: 'No Chemical Pesticides', description: 'Using bio-pesticides', icon: ShieldCheck },
]

export const farmActivities = [
  { date: 'Apr 26, 2025', title: 'Irrigation completed', description: 'Drip irrigation for vegetable crops' },
  { date: 'Apr 24, 2025', title: 'Fertilizer applied', description: 'Organic manure applied to maize field' },
  { date: 'Apr 20, 2025', title: 'Field preparation', description: 'Land prepared for next season sowing' },
  { date: 'Apr 15, 2025', title: 'Soil test conducted', description: 'pH 6.8, Nutrient levels are good' },
]

export const farmFeatures = [
  { title: 'Complete Farm Profile', description: 'Manage farm details, size, soil type and more', icon: Tractor },
  { title: 'Verification Status', description: 'Verified farmer profile with secure records', icon: ShieldCheck },
  { title: 'Crop Calendar & Planning', description: 'Plan seasonal crops and get reminders', icon: CalendarDays },
  { title: 'Farm Map Location', description: 'View and manage your farm location', icon: MapPin },
  { title: 'Soil & Irrigation Management', description: 'Track soil health and irrigation systems', icon: Droplets },
  { title: 'Activity Log', description: 'Track all farm activities in one place', icon: CircleCheck },
]

export const farmOverviewFields = [
  { label: 'Farm Size', key: 'size', icon: Tractor },
  { label: 'Soil Type', key: 'soilType', icon: Sprout },
  { label: 'Farming Method', key: 'method', icon: Leaf },
  { label: 'Crops Grown', key: 'crops', icon: Sprout },
  { label: 'Land Record Status', key: 'landRecord', icon: FileCheck2 },
]
