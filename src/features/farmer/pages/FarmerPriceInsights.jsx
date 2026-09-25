import { ChartNoAxesCombined } from 'lucide-react'
import FarmerPageHero from '../components/FarmerPageHero'
import PriceSummary from '../price-insights/components/PriceSummary'
import MarketTrends from '../price-insights/components/MarketTrends'
import PriceKeyFeatures from '../price-insights/components/PriceKeyFeatures'
import CropPriceComparison from '../price-insights/components/CropPriceComparison'
import DemandByRegion from '../price-insights/components/DemandByRegion'
import AIRecommendation from '../price-insights/components/AIRecommendation'
import FarmerTestimonial from '../price-insights/components/FarmerTestimonial'

export default function FarmerPriceInsights() {
  return <>
    <FarmerPageHero title="Price Insights" subtitle="Get smart market recommendations and sell at the right time for better profits." icon={ChartNoAxesCombined} slogan={['Sahi', 'Jankari', 'Badi Kamai']} />
    <div className="mx-auto max-w-[1600px] px-4 pb-10 pt-4 sm:px-5">
      <PriceSummary />
      <div className="mt-4 grid min-w-0 gap-4 xl:grid-cols-[minmax(0,785fr)_minmax(0,388fr)]"><div className="grid min-w-0 content-start gap-4"><MarketTrends /><CropPriceComparison /></div><PriceKeyFeatures /></div>
      <div className="mt-4 grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-[minmax(0,454fr)_minmax(0,435fr)_minmax(0,272fr)]"><DemandByRegion /><AIRecommendation /><FarmerTestimonial /></div>
    </div>
  </>
}
