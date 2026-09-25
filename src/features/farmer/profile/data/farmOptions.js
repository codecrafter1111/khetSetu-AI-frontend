import { Images, Leaf, MapPin, Sprout, Tractor } from 'lucide-react'

export const farmSelectOptions = {
  districts: ['Varanasi', 'Prayagraj', 'Lucknow', 'Gorakhpur', 'Mirzapur'],
  states: ['Uttar Pradesh', 'Bihar', 'Madhya Pradesh', 'Maharashtra', 'Punjab'],
  areaUnits: ['Acres', 'Hectares', 'Bigha'],
  soilTypes: ['Loamy', 'Clay', 'Sandy', 'Silt', 'Black Soil', 'Red Soil'],
  farmingMethods: ['Organic', 'Natural', 'Conventional', 'Integrated'],
  irrigationTypes: ['Drip Irrigation', 'Sprinkler', 'Flood Irrigation', 'Rain-fed'],
  waterSources: ['Borewell', 'Canal', 'River', 'Pond', 'Rainwater Harvesting'],
  crops: ['Rice', 'Wheat', 'Vegetables', 'Maize', 'Mustard', 'Sugarcane', 'Pulses', 'Potato'],
}

export const sustainabilityOptions = ['Organic Farming', 'Crop Rotation', 'Natural Fertilizers', 'Water Conservation', 'Soil Health Management', 'Integrated Pest Management', 'Agroforestry', 'Other (Please specify)']

export const farmHighlights = [
  { icon: MapPin, title: 'Farm Location', description: 'Accurate location helps buyers find your farm and products.' },
  { icon: Tractor, title: 'Farm Size & Details', description: 'Total area, soil type and farming method provide key information.' },
  { icon: Sprout, title: 'Crops Grown', description: 'Add main crops to showcase your produce.' },
  { icon: Images, title: 'Farm Photos', description: 'Upload clear photos to build trust with buyers.' },
  { icon: Leaf, title: 'Sustainability Practices', description: 'Highlight eco-friendly practices for better visibility and value.' },
]
