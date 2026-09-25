const STORAGE_KEY = 'khetsetu-farm-details-draft'
const PHOTO_TYPES = ['image/jpeg', 'image/png']

const initialFarm = {
  farmName: 'Yadav Organic Farm', farmOwner: 'Ramesh Yadav', village: 'Bhadauni', district: 'Varanasi', state: 'Uttar Pradesh', pinCode: '221007',
  location: { address: 'Bhadauni, Varanasi, Uttar Pradesh', latitude: 25.3176, longitude: 82.9739 },
  totalArea: '2.5', areaUnit: 'Acres', soilType: 'Loamy', farmingMethod: 'Organic', irrigationType: 'Drip Irrigation', waterSource: 'Borewell',
  crops: ['Rice', 'Wheat', 'Vegetables'],
  photos: [
    { id: 'farm-1', src: '/images/dashboard/healthy-crops.png', name: 'Farm field' },
    { id: 'farm-2', src: '/images/dashboard/farmer-hero.png', name: 'Crop field' },
    { id: 'farm-3', src: '/images/my-farm/farm-photo-strip.png', name: 'Maize crop' },
    { id: 'farm-4', src: '/images/dashboard/produce-grid.png', name: 'Sunset farm' },
  ],
  sustainabilityPractices: ['Organic Farming', 'Crop Rotation', 'Agroforestry'], otherPractice: '',
}

const wait = (duration = 320) => new Promise((resolve) => window.setTimeout(resolve, duration))

export async function getFarmDetails() {
  await wait()
  const draft = localStorage.getItem(STORAGE_KEY)
  return draft ? { ...initialFarm, ...JSON.parse(draft) } : structuredClone(initialFarm)
}

export async function saveFarmDraft(farm) {
  await wait(280)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(farm))
  return structuredClone(farm)
}

export async function updateFarmDetails(farm) {
  await wait(460)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(farm))
  return { ...structuredClone(farm), updatedAt: new Date().toISOString() }
}

export async function uploadFarmPhotos(files, currentCount, onProgress) {
  const selected = Array.from(files)
  if (currentCount + selected.length > 5) throw new Error('You can upload a maximum of 5 farm photos.')
  const invalid = selected.find((file) => !PHOTO_TYPES.includes(file.type) || file.size > 5 * 1024 * 1024)
  if (invalid) throw new Error('Each photo must be a JPG or PNG smaller than 5 MB.')

  const uploaded = []
  for (let index = 0; index < selected.length; index += 1) {
    const file = selected[index]
    const src = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = () => reject(new Error('A photo could not be read. Please try again.'))
      reader.readAsDataURL(file)
    })
    uploaded.push({ id: `${Date.now()}-${index}`, src, name: file.name })
    onProgress?.(Math.round(((index + 1) / selected.length) * 100))
    await wait(100)
  }
  return uploaded
}

export async function searchFarmLocation(query) {
  await wait(450)
  if (!query.trim()) throw new Error('Enter a village, district, or address to search.')
  return { address: query.trim(), latitude: 25.3176, longitude: 82.9739 }
}

export async function saveFarmLocation(location) {
  await wait(160)
  return { ...location }
}
