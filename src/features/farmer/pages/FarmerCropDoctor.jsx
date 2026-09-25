import { Leaf } from 'lucide-react'
import FarmerPageHero from '../components/FarmerPageHero'
import UploadCropImage from '../crop-doctor/components/UploadCropImage'
import DiagnosisResult from '../crop-doctor/components/DiagnosisResult'
import TreatmentSuggestions from '../crop-doctor/components/TreatmentSuggestions'
import CropCareChecklist from '../crop-doctor/components/CropCareChecklist'
import CropDoctorKeyFeatures from '../crop-doctor/components/CropDoctorKeyFeatures'
import RecentScans from '../crop-doctor/components/RecentScans'
import WeatherInfluence from '../crop-doctor/components/WeatherInfluence'

export default function FarmerCropDoctor() {
  return <>
    <FarmerPageHero title="Crop Doctor (AI)" subtitle="Upload a photo of your crop or leaf to detect disease, get expert advice, and keep your farm healthy." icon={Leaf} iconPlacement="end" slogan={['Healthy Crops', 'Happier Farmers', 'Brighter Tomorrows']} />
    <div className="mx-auto max-w-[1600px] px-4 pb-10 pt-4 sm:px-5">
      <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_318px]">
        <div className="min-w-0">
          <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,348fr)_minmax(0,493fr)]"><UploadCropImage /><DiagnosisResult /></div>
          <div className="mt-4 grid min-w-0 gap-4 lg:grid-cols-[minmax(0,519fr)_minmax(0,323fr)]"><TreatmentSuggestions /><CropCareChecklist /></div>
        </div>
        <aside aria-label="Crop doctor insights" className="grid min-w-0 content-start gap-4 sm:grid-cols-2 xl:grid-cols-1"><CropDoctorKeyFeatures /><RecentScans /><WeatherInfluence /></aside>
      </div>
    </div>
  </>
}
