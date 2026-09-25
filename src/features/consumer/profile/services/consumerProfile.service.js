const STORAGE_KEY = 'khetsetu-consumer-profile'

const initialProfile = {
  id: 'consumer-priya-01', fullName: 'Priya Sharma', email: 'priya.sharma@example.com', mobileNumber: '+91 98765 43210', preferredLanguage: 'English', profileImage: '/images/consumer/hero.png', city: 'Delhi', state: 'Delhi', verificationStatus: 'Verified Consumer',
}

const wait = (duration = 350) => new Promise((resolve) => window.setTimeout(resolve, duration))

export async function getConsumerProfile() {
  await wait()
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? { ...initialProfile, ...JSON.parse(stored) } : { ...initialProfile }
}

export async function updateConsumerProfile(profile) {
  await wait(450)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  return { ...profile, updatedAt: new Date().toISOString() }
}

export async function uploadConsumerProfileImage(file, onProgress) {
  if (!['image/jpeg', 'image/png'].includes(file.type)) throw new Error('Choose a JPG or PNG profile image.')
  if (file.size > 5 * 1024 * 1024) throw new Error('The profile image must be smaller than 5 MB.')
  for (const progress of [18, 42, 68, 88]) { await wait(70); onProgress?.(progress) }
  const profileImage = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('We could not read that image. Please try another file.'))
    reader.readAsDataURL(file)
  })
  onProgress?.(100)
  return { profileImage, imageId: `consumer-avatar-${Date.now()}` }
}
