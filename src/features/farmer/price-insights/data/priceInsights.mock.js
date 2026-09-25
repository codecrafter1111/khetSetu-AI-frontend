import { ChartNoAxesCombined, Clock3, MapPin, Sparkles, TableProperties, UsersRound } from 'lucide-react'

export const priceSummary = [
  { label: 'Top Performing Crop', value: 'Maize', detail: 'Highest price increase this month', subvalue: '₹ 1,950 / quintal', change: '+18%', icon: 'crop' },
  { label: 'Avg. Price Change', value: '+12%', detail: 'Across key crops vs last month', icon: 'rupee' },
  { label: 'Best Demand Region', value: 'Uttar Pradesh', detail: 'Highest demand this week', icon: 'region' },
  { label: 'AI Recommendation Accuracy', value: '92%', detail: 'Farmers got better prices using our insights', icon: 'accuracy' },
]

export const chartSeries = {
  Wheat: [1850, 1920, 2050, 2280, 2350, 2280],
  Rice: [2530, 2610, 2660, 2700, 2760, 2800],
  Maize: [1450, 1510, 1600, 1680, 1810, 1950],
  Soybean: [3650, 3600, 3540, 3490, 3500, 3420],
  Mustard: [5480, 5400, 5360, 5240, 5300, 5120],
}

export const chartMonths = ['Nov 2024', 'Dec 2024', 'Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025']

export const insightFeatures = [
  { title: 'Market Trends', description: 'View historical and real-time price trends for major crops.', icon: ChartNoAxesCombined },
  { title: 'Crop Price Table', description: 'Compare current prices, weekly changes and market demand.', icon: TableProperties },
  { title: 'Demand Insights', description: 'See which regions have the highest demand for your crops.', icon: UsersRound },
  { title: 'Best Selling Time', description: 'Get AI-powered suggestions on when to sell for maximum profit.', icon: Clock3 },
  { title: 'Region Analysis', description: 'Explore state-wise demand and price variations across markets.', icon: MapPin },
  { title: 'AI Recommendation', description: 'Receive personalized selling advice based on market data and trends.', icon: Sparkles },
]

export const cropPrices = [
  { crop: 'Wheat', icon: '🌾', current: 2280, lastWeek: 2150, trend: 6, demand: 'High', action: 'Hold for better price', actionTone: 'blue' },
  { crop: 'Rice', icon: '🌾', current: 2800, lastWeek: 2760, trend: 1, demand: 'Medium', action: 'Good time to sell', actionTone: 'green' },
  { crop: 'Maize', icon: '🌽', current: 1950, lastWeek: 1650, trend: 18, demand: 'High', action: 'Sell now', actionTone: 'green' },
  { crop: 'Soybean', icon: '🫘', current: 3420, lastWeek: 3500, trend: -2, demand: 'Medium', action: 'Wait for better price', actionTone: 'orange' },
  { crop: 'Mustard', icon: '🌿', current: 5120, lastWeek: 5300, trend: -3, demand: 'Low', action: 'Wait', actionTone: 'orange' },
]

export const regionDemand = [
  { name: 'Uttar Pradesh', percent: 32 },
  { name: 'Madhya Pradesh', percent: 24 },
  { name: 'Punjab', percent: 18 },
  { name: 'Haryana', percent: 14 },
  { name: 'Rajasthan', percent: 8 },
  { name: 'Other States', percent: 4 },
]
