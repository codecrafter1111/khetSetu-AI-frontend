const STORAGE_KEY = 'khetsetu-farmer-profile-draft'

const initialProfile = {
  fullName: 'Ramesh Yadav',
  mobileNumber: '+91 98765 43210',
  email: 'ramesh.yadav@example.com',
  preferredLanguage: 'Hindi',
  state: 'Uttar Pradesh',
  district: 'Varanasi',
  village: 'Bhadauni',
  farmingExperience: '10 - 15 years',
  shortBio: 'I am a progressive farmer from Varanasi, growing rice, wheat and vegetables using organic and sustainable farming practices.',
  profileImage: '/images/dashboard/farmer-cutout.png',
}

const wait = (duration = 350) => new Promise((resolve) => window.setTimeout(resolve, duration))

export async function getFarmerProfile() {
  await wait()
  const draft = localStorage.getItem(STORAGE_KEY)
  return draft ? { ...initialProfile, ...JSON.parse(draft) } : { ...initialProfile }
}

export async function saveProfileDraft(profile) {
  await wait(280)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  return { ...profile }
}

export async function updateFarmerProfile(profile) {
  await wait(450)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  return { ...profile, updatedAt: new Date().toISOString() }
}

export async function uploadProfileImage(file, onProgress) {
  if (!['image/jpeg', 'image/png'].includes(file.type)) throw new Error('Please choose a JPG or PNG image.')
  if (file.size > 5 * 1024 * 1024) throw new Error('The selected image must be smaller than 5 MB.')

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    let progress = 12
    const timer = window.setInterval(() => {
      progress = Math.min(progress + 16, 88)
      onProgress?.(progress)
    }, 80)
    reader.onload = () => {
      window.clearInterval(timer)
      onProgress?.(100)
      window.setTimeout(() => resolve(reader.result), 180)
    }
    reader.onerror = () => {
      window.clearInterval(timer)
      reject(new Error('We could not read that image. Please try another file.'))
    }
    reader.readAsDataURL(file)
  })
}
