import { Leaf, Map, Phone, ShieldCheck, Sprout, Star, Store, Truck } from 'lucide-react'

export const storeStats = [
  { value: '12', label: 'Nearby Stores', detail: 'Within 10 km of your location', icon: Store },
  { value: '350+', label: 'In-stock Medicines', detail: 'Fertilizers, pesticides, seeds & more', icon: Leaf },
  { value: '8', label: 'Stores offer Delivery', detail: 'Get inputs at your doorstep', icon: Truck },
  { value: '10', label: 'Trusted Partners', detail: 'Verified and reliable stores', icon: ShieldCheck },
]

export const stores = [
  { id: 1, name: 'Shivam Agro Center', address: 'Lanka Road, Varanasi', pin: '221005', rating: 4.8, reviews: 96, distance: 1.2, open: true, categories: ['Fungicide', 'Fertilizer', 'Seeds', 'Bio-pesticide'], position: { left: '28%', top: '49%' } },
  { id: 2, name: 'Kisan Seva Kendra', address: 'Bhelupur, Varanasi', pin: '221010', rating: 4.5, reviews: 128, distance: 2.3, open: true, categories: ['Fertilizer', 'Seeds'], position: { left: '34%', top: '24%' } },
  { id: 3, name: 'GreenField Agro Inputs', address: 'Sigra, Varanasi', pin: '221002', rating: 4.3, reviews: 74, distance: 3.1, open: true, categories: ['Fungicide', 'Bio-pesticide'], position: { left: '65%', top: '18%' } },
  { id: 4, name: 'Bharat Krishi Bhandar', address: 'Assi Road, Varanasi', pin: '221005', rating: 4.6, reviews: 89, distance: 4.7, open: false, categories: ['Seeds', 'Fertilizer'], position: { left: '70%', top: '46%' } },
  { id: 5, name: 'Maa Annapurna Agro', address: 'Rohania Road, Varanasi', pin: '221108', rating: 4.4, reviews: 61, distance: 6.2, open: true, categories: ['Fungicide', 'Seeds', 'Bio-pesticide'], position: { left: '48%', top: '74%' } },
]

export const recommendedProducts = [
  { id: 1, name: 'Bavistin', category: 'Fungicide', price: '₹ 520', unit: '1 kg', position: '0% 50%' },
  { id: 2, name: 'IFFCO DAP 18:46:0', category: 'Fertilizer', price: '₹ 1,350', unit: '50 kg', position: '33.333% 50%' },
  { id: 3, name: 'Pioneer Hybrid Maize Seeds', category: 'Seeds', price: '₹ 950', unit: '4 kg', position: '66.667% 50%' },
  { id: 4, name: 'Neem Oil', category: 'Bio-pesticide', price: '₹ 420', unit: '1 L', position: '100% 50%' },
]

export const storeFeatures = [
  { title: 'Nearby Store Discovery', description: 'Find trusted agri-input stores near you.', icon: Store },
  { title: 'Map View', description: 'See store locations on an interactive map.', icon: Map },
  { title: 'Product Availability', description: 'Check real-time availability of seeds, fertilizers, pesticides and more.', icon: Leaf },
  { title: 'Ratings & Reviews', description: 'Choose from verified stores with farmer reviews.', icon: Star },
  { title: 'Contact & Directions', description: 'Call stores directly and get directions with one click.', icon: Phone },
  { title: 'Treatment-linked Suggestions', description: 'Get recommended products based on crop diseases from Crop Doctor (AI).', icon: Sprout },
]

export const localStoreBenefits = [
  'Genuine and quality products',
  'Expert advice from local agri experts',
  'Timely availability during season',
  'Support local farmers and businesses',
]
