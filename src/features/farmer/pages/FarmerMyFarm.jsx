import { Leaf } from 'lucide-react'
import FarmerPageHero from '../components/FarmerPageHero'
import FarmOverview from '../my-farm/components/FarmOverview'
import FarmPhotos from '../my-farm/components/FarmPhotos'
import FarmLocation from '../my-farm/components/FarmLocation'
import CropCalendar from '../my-farm/components/CropCalendar'
import IrrigationSystem from '../my-farm/components/IrrigationSystem'
import SoilHealth from '../my-farm/components/SoilHealth'
import SustainabilityPractices from '../my-farm/components/SustainabilityPractices'
import FarmActivityTimeline from '../my-farm/components/FarmActivityTimeline'
import FarmKeyFeatures from '../my-farm/components/FarmKeyFeatures'

export default function FarmerMyFarm() {
  return <>
    <FarmerPageHero title="My Farm" subtitle="Manage your farm, plan better, and grow a brighter tomorrow." icon={Leaf} iconPlacement="end" slogan={['Meri Mitti', 'Mera Bhavishya']} showFarmer={false} />
    <div className="mx-auto max-w-[1600px] px-4 pb-10 pt-4 sm:px-5">
      <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,597fr)_minmax(0,571fr)]">
        <div className="grid min-w-0 content-start gap-4"><FarmOverview /><CropCalendar /></div>
        <div className="grid min-w-0 content-start gap-4"><FarmPhotos /><FarmLocation /><div className="grid min-w-0 gap-4 sm:grid-cols-2"><IrrigationSystem /><SoilHealth /></div></div>
      </div>
      <div className="mt-4 grid min-w-0 gap-4 xl:grid-cols-[minmax(0,377fr)_minmax(0,406fr)_minmax(0,371fr)]"><SustainabilityPractices /><FarmActivityTimeline /><FarmKeyFeatures /></div>
    </div>
  </>
}
