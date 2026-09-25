import { Brain, Camera, ChartNoAxesColumnIncreasing, Clock3, FileText, Leaf } from 'lucide-react'

export const diagnosis = {
  scannedAt: 'Apr 28, 2025, 10:24 AM',
  image: '/images/crop-doctor/early-blight-leaf.png',
  alert: 'Leaf Disease Detected',
  disease: 'Early Blight',
  scientificName: 'Alternaria solani',
  confidence: 87,
  severity: 'Moderate',
  affectedCrop: 'Tomato',
  affectedPart: 'Leaf',
  description: 'Early blight is a fungal disease that causes brown, concentric spots on older leaves. It can reduce photosynthesis and lower yield if not treated in time.',
  actions: ['Remove and destroy affected leaves', 'Use recommended fungicide (see below)', 'Ensure proper spacing and air circulation', 'Avoid overhead irrigation', 'Monitor regularly and repeat treatment if needed'],
}

export const uploadTips = ['Upload a clear, well-lit photo', 'Focus on the affected leaf or plant part', 'Include both healthy and damaged parts if possible']

export const cropDoctorFeatures = [
  { title: 'Image Upload', description: 'Upload leaf or crop images easily', icon: Camera },
  { title: 'AI Disease Detection', description: 'Get instant AI-powered diagnosis', icon: Brain },
  { title: 'Confidence Score', description: 'Know how accurate the result is', icon: ChartNoAxesColumnIncreasing },
  { title: 'Treatment Suggestions', description: 'Get personalized treatment options', icon: Leaf },
  { title: 'Scan History', description: 'View and track your past scans', icon: Clock3 },
  { title: 'Advisory Notes', description: 'Additional tips for better crop care', icon: FileText },
]

export const recentScans = [
  { id: 1, name: 'Early Blight', crop: 'Tomato', date: 'Apr 28, 2025', status: 'Moderate', image: '/images/crop-doctor/early-blight-leaf.png' },
  { id: 2, name: 'Healthy Leaf', crop: 'Chilli', date: 'Apr 22, 2025', status: 'Healthy', image: '/images/dashboard/healthy-crops.png' },
  { id: 3, name: 'Powdery Mildew', crop: 'Cucumber', date: 'Apr 18, 2025', status: 'High', image: '/images/crop-doctor/early-blight-leaf.png' },
  { id: 4, name: 'Leaf Spot', crop: 'Brinjal', date: 'Apr 10, 2025', status: 'Mild', image: '/images/crop-doctor/early-blight-leaf.png' },
]

export const treatments = {
  chemical: [
    { id: 'mancozeb', name: 'Mancozeb 75% WP', description: 'Effective against Early Blight and other fungal diseases.', dose: '2.5 g per liter of water', frequency: 'Spray at 10–15 day intervals', imagePosition: 'left' },
    { id: 'chlorothalonil', name: 'Chlorothalonil 75% WP', description: 'Broad spectrum fungicide for leaf spot diseases.', dose: '2 g per liter of water', frequency: 'Spray at 7–10 day intervals', imagePosition: 'right' },
  ],
  organic: [
    { id: 'neem', name: 'Neem Oil Spray', description: 'Natural option to support crop protection.', dose: 'Follow product label dilution', frequency: 'Apply as directed on the label', imagePosition: 'left' },
    { id: 'compost', name: 'Compost Tea', description: 'Support soil and plant health naturally.', dose: 'Use a properly prepared solution', frequency: 'Apply according to crop guidance', imagePosition: 'right' },
  ],
}

export const careChecklist = [
  { id: 'remove-leaves', label: 'Remove affected leaves', checked: true },
  { id: 'spacing', label: 'Ensure proper spacing and airflow', checked: true },
  { id: 'irrigation', label: 'Avoid overhead irrigation', checked: false },
  { id: 'fungicide', label: 'Use recommended fungicide', checked: false },
  { id: 'monitor', label: 'Monitor regularly for new symptoms', checked: false },
  { id: 'clean-field', label: 'Keep the field clean and weed-free', checked: false },
]

export const cropWeather = { location: 'Varanasi, Uttar Pradesh', temperature: '32°C', condition: 'Partly Cloudy', humidity: '62%', rainChance: '20%', wind: '12 km/h', risk: 'Moderate', riskMessage: 'Warm and humid conditions can favor fungal diseases like Early Blight. Keep monitoring your crops and follow preventive measures.' }
