import { useEffect, useState } from 'react'
import { getConsumerProfile, updateConsumerProfile, uploadConsumerProfileImage } from '../services/consumerProfile.service'

export default function useConsumerProfile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [imageError, setImageError] = useState('')

  const load = async () => {
    setLoading(true); setError('')
    try { setProfile(await getConsumerProfile()) } catch { setError('We could not load your profile. Please try again.') } finally { setLoading(false) }
  }

  useEffect(() => {
    let active = true
    getConsumerProfile().then((data) => { if (active) setProfile(data) }).catch(() => { if (active) setError('We could not load your profile. Please try again.') }).finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  const update = (name, value) => { setProfile((current) => ({ ...current, [name]: value })); setDirty(true) }
  const save = async () => { setSaving(true); try { setProfile(await updateConsumerProfile(profile)); setDirty(false); return true } finally { setSaving(false) } }
  const uploadImage = async (file) => {
    setUploading(true); setImageError(''); setUploadProgress(0)
    try { const result = await uploadConsumerProfileImage(file, setUploadProgress); setProfile((current) => ({ ...current, ...result })); setDirty(true); return true } catch (caught) { setImageError(caught.message); return false } finally { setUploading(false) }
  }

  return { profile, loading, error, dirty, saving, uploading, uploadProgress, imageError, update, save, uploadImage, retry: load }
}
