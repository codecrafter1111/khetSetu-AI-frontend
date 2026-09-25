import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, Droplets, House, Landmark, Leaf, MapPin, Ruler, Save, ScanLine, Sprout, UserRound, Waves } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../../config/routes'
import FarmerPageHero from '../components/FarmerPageHero'
import CropMultiSelect from '../profile/components/CropMultiSelect'
import FarmHighlights from '../profile/components/FarmHighlights'
import FarmMapPicker from '../profile/components/FarmMapPicker'
import FarmPhotoUploader from '../profile/components/FarmPhotoUploader'
import FarmPreview from '../profile/components/FarmPreview'
import ProfileField from '../profile/components/ProfileField'
import ProfileStepper from '../profile/components/ProfileStepper'
import { farmSelectOptions, sustainabilityOptions } from '../profile/data/farmOptions'
import { getFarmDetails, saveFarmDraft, updateFarmDetails, uploadFarmPhotos } from '../profile/services/farmDetails.service'
import '../profile/profile.css'
import '../profile/farm-details.css'

const emptyFarm = { farmName: '', farmOwner: '', village: '', district: '', state: '', pinCode: '', location: { address: '', latitude: '', longitude: '' }, totalArea: '', areaUnit: '', soilType: '', farmingMethod: '', irrigationType: '', waterSource: '', crops: [], photos: [], sustainabilityPractices: [], otherPractice: '' }

function validate(farm) {
  const errors = {}
  if (farm.farmName.trim().length < 2) errors.farmName = 'Enter a farm name with at least 2 characters.'
  if (!farm.farmOwner.trim()) errors.farmOwner = 'Enter the farm owner name.'
  if (!farm.village.trim()) errors.village = 'Enter the village.'
  if (!farm.district) errors.district = 'Select a district.'
  if (!farm.state) errors.state = 'Select a state.'
  if (!/^\d{6}$/.test(farm.pinCode)) errors.pinCode = 'Enter a valid 6-digit PIN code.'
  if (!Number.isFinite(Number(farm.location.latitude)) || !Number.isFinite(Number(farm.location.longitude))) errors.location = 'Set a valid farm location.'
  if (!farm.totalArea || Number(farm.totalArea) <= 0) errors.totalArea = 'Enter a positive farm area.'
  if (!farm.areaUnit) errors.areaUnit = 'Select an area unit.'
  if (!farm.soilType) errors.soilType = 'Select a soil type.'
  if (!farm.farmingMethod) errors.farmingMethod = 'Select a farming method.'
  if (!farm.irrigationType) errors.irrigationType = 'Select an irrigation type.'
  if (!farm.waterSource) errors.waterSource = 'Select a water source.'
  if (!farm.crops.length) errors.crops = 'Add at least one main crop.'
  if (farm.sustainabilityPractices.includes('Other (Please specify)') && !farm.otherPractice.trim()) errors.otherPractice = 'Describe the other practice.'
  return errors
}

export default function FarmerProfileFarmBasics() {
  const navigate = useNavigate()
  const [farm, setFarm] = useState(emptyFarm)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [photoError, setPhotoError] = useState('')
  const [toast, setToast] = useState('')

  const load = async () => {
    setLoading(true); setLoadError('')
    try { setFarm(await getFarmDetails()) } catch { setLoadError('We could not load your farm details. Please try again.') } finally { setLoading(false) }
  }

  useEffect(() => {
    let active = true
    getFarmDetails().then((data) => { if (active) setFarm(data) }).catch(() => { if (active) setLoadError('We could not load your farm details. Please try again.') }).finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])
  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(''), 2800)
    return () => window.clearTimeout(timer)
  }, [toast])

  const update = (event) => {
    const { name, value } = event.target
    setFarm((current) => ({ ...current, [name]: name === 'pinCode' ? value.replace(/\D/g, '').slice(0, 6) : value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }
  const updateLocation = (location) => { setFarm((current) => ({ ...current, location })); setErrors((current) => ({ ...current, location: '' })) }
  const updateCrops = (crops) => { setFarm((current) => ({ ...current, crops })); setErrors((current) => ({ ...current, crops: '' })) }
  const togglePractice = (practice) => setFarm((current) => ({ ...current, sustainabilityPractices: current.sustainabilityPractices.includes(practice) ? current.sustainabilityPractices.filter((item) => item !== practice) : [...current.sustainabilityPractices, practice] }))

  const addPhotos = async (files) => {
    setUploading(true); setPhotoError(''); setUploadProgress(0)
    try { const photos = await uploadFarmPhotos(files, farm.photos.length, setUploadProgress); setFarm((current) => ({ ...current, photos: [...current.photos, ...photos] })); setToast('Farm photos uploaded') } catch (error) { setPhotoError(error.message) } finally { setUploading(false) }
  }

  const save = async (mode) => {
    if (mode === 'continue') {
      const nextErrors = validate(farm)
      setErrors(nextErrors)
      if (Object.keys(nextErrors).length) { document.querySelector('.has-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return }
    }
    setSaving(true)
    try {
      if (mode === 'draft') { await saveFarmDraft(farm); setToast('Farm details saved as draft') }
      if (mode === 'back') { await saveFarmDraft(farm); navigate(routes.farmer.profile) }
      if (mode === 'continue') { await updateFarmDetails(farm); navigate(routes.farmer.profileVerification) }
    } catch { setToast('Something went wrong. Please try again.') } finally { setSaving(false) }
  }

  return <>
    <FarmerPageHero title="Add Farm Details" subtitle="Set up your farm profile to showcase your land, crops and farming practices." icon={Leaf} iconPlacement="end" slogan={['Meri Mitti', 'Mera Bharosa']} />
    <div className="farmer-profile-page farm-basics-page">
      <ProfileStepper activeStep={2} />
      {loading ? <FarmLoading /> : loadError ? <div className="profile-error"><h2>Farm details unavailable</h2><p>{loadError}</p><button type="button" onClick={load}>Try again</button></div> : <div className="farm-details-layout">
        <form className="farm-details-form" onSubmit={(event) => { event.preventDefault(); save('continue') }} noValidate>
          <section className="farm-form-section">
            <SectionHeading icon={Leaf} title="Basic Farm Information" subtitle="Tell us about your farm and its location." />
            <div className="farm-basic-layout"><div className="farm-basic-fields">
              <ProfileField label="Farm Name" required icon={UserRound} name="farmName" value={farm.farmName} onChange={update} error={errors.farmName} />
              <ProfileField label="Farm Owner" required icon={UserRound} name="farmOwner" value={farm.farmOwner} onChange={update} error={errors.farmOwner} />
              <ProfileField label="Village" required icon={House} name="village" value={farm.village} onChange={update} error={errors.village} />
              <ProfileField label="District" required icon={Landmark} name="district" value={farm.district} onChange={update} error={errors.district} options={farmSelectOptions.districts} />
              <ProfileField label="State" required icon={MapPin} name="state" value={farm.state} onChange={update} error={errors.state} options={farmSelectOptions.states} />
              <ProfileField label="PIN Code" required icon={ScanLine} name="pinCode" value={farm.pinCode} onChange={update} error={errors.pinCode} inputMode="numeric" />
            </div><FarmMapPicker location={farm.location} onChange={updateLocation} error={errors.location} /></div>
          </section>
          <section className="farm-form-section">
            <SectionHeading icon={Leaf} title="Farm Land Details" subtitle="Provide details about your farm size, soil and farming method." />
            <div className="farm-land-grid">
              <ProfileField label="Total Farm Area" required icon={Ruler} name="totalArea" value={farm.totalArea} onChange={update} error={errors.totalArea} type="number" min="0" step="0.1" />
              <ProfileField label="Area Unit" required icon={Ruler} name="areaUnit" value={farm.areaUnit} onChange={update} error={errors.areaUnit} options={farmSelectOptions.areaUnits} />
              <ProfileField label="Soil Type" required icon={Sprout} name="soilType" value={farm.soilType} onChange={update} error={errors.soilType} options={farmSelectOptions.soilTypes} />
              <ProfileField label="Farming Method" required icon={Leaf} name="farmingMethod" value={farm.farmingMethod} onChange={update} error={errors.farmingMethod} options={farmSelectOptions.farmingMethods} />
            </div>
            <div className="farm-water-grid">
              <ProfileField label="Irrigation Type" required icon={Droplets} name="irrigationType" value={farm.irrigationType} onChange={update} error={errors.irrigationType} options={farmSelectOptions.irrigationTypes} />
              <ProfileField label="Water Source" required icon={Waves} name="waterSource" value={farm.waterSource} onChange={update} error={errors.waterSource} options={farmSelectOptions.waterSources} />
              <CropMultiSelect value={farm.crops} onChange={updateCrops} error={errors.crops} />
            </div>
          </section>
          <section className="farm-form-section"><SectionHeading icon={Landmark} title="Farm Photos" subtitle="Upload clear photos of your farm (max 5 images)." /><FarmPhotoUploader photos={farm.photos} uploading={uploading} progress={uploadProgress} error={photoError} onUpload={addPhotos} onRemove={(id) => setFarm((current) => ({ ...current, photos: current.photos.filter((photo) => photo.id !== id) }))} /></section>
          <section className="farm-form-section sustainability-section"><SectionHeading icon={Leaf} title="Sustainability Practices" subtitle="Tell us about the sustainable and eco-friendly practices you follow." /><div className="practice-grid">{sustainabilityOptions.map((practice) => <label key={practice}><input type="checkbox" checked={farm.sustainabilityPractices.includes(practice)} onChange={() => togglePractice(practice)} /><span />{practice}</label>)}</div>{farm.sustainabilityPractices.includes('Other (Please specify)') && <label className={`other-practice${errors.otherPractice ? ' has-error' : ''}`}><span>Other Practice</span><input name="otherPractice" value={farm.otherPractice} onChange={update} placeholder="Describe your sustainable practice" />{errors.otherPractice && <small>{errors.otherPractice}</small>}</label>}</section>
          <div className="farm-form-actions"><button type="button" onClick={() => save('back')} disabled={saving}><ArrowLeft /> Back</button><button type="button" onClick={() => save('draft')} disabled={saving}><Save /> Save as Draft</button><span /><button type="submit" disabled={saving || uploading}>{saving ? 'Saving...' : 'Continue to Verification'} <ArrowRight /></button></div>
        </form>
        <aside className="farm-details-rail"><FarmPreview farm={farm} onEdit={() => document.querySelector('.farm-details-form')?.scrollIntoView({ behavior: 'smooth' })} /><FarmHighlights /></aside>
      </div>}
    </div>
    {toast && <div className={`profile-toast${toast.startsWith('Something') ? ' error' : ''}`} role="status"><CheckCircle2 />{toast}</div>}
  </>
}

function SectionHeading({ icon: Icon, title, subtitle }) { return <header className="farm-section-heading"><Icon /><div><h2>{title}</h2><p>{subtitle}</p></div></header> }
function FarmLoading() { return <div className="farm-loading" aria-label="Loading farm details"><div /><aside><i /><i /></aside></div> }
