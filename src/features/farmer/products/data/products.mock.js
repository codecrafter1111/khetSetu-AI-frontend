import { ChartNoAxesCombined, CircleCheck, CircleHelp, Leaf, Package, Plus, Tag, TriangleAlert, Trophy, Upload, Warehouse } from 'lucide-react'

export const productStats = [
  { label: 'Active Listings', value: '12', change: '+20%', detail: '+4 from last month', icon: Leaf },
  { label: 'Total Stock', value: '450 kg', change: '+12%', detail: 'Across all products', icon: Package },
  { label: 'Low Stock Items', value: '3', change: '-25%', detail: 'Need attention', icon: TriangleAlert, tone: 'warning' },
  { label: 'Best Selling Category', value: 'Grains', detail: '42% of total sales', icon: Trophy },
]

const baseProducts = [
  { id: 1, name: 'Organic Rice', packageSize: '5 kg bag', image: 'riceBag', category: 'Grains', quantity: 120, quantityUnit: 'kg', unitPrice: 62, priceUnit: 'kg', stockStatus: 'in_stock', batchId: 'BATCH-RY-001', listingStatus: 'active', updatedAt: '2025-04-28' },
  { id: 2, name: 'Wheat', packageSize: '10 kg bag', image: 'wheat', category: 'Grains', quantity: 80, quantityUnit: 'kg', unitPrice: 28, priceUnit: 'kg', stockStatus: 'low_stock', batchId: 'BATCH-RY-002', listingStatus: 'active', updatedAt: '2025-04-27' },
  { id: 3, name: 'Maize', packageSize: '10 kg bag', image: 'maize', category: 'Grains', quantity: 200, quantityUnit: 'kg', unitPrice: 26, priceUnit: 'kg', stockStatus: 'in_stock', batchId: 'BATCH-RY-003', listingStatus: 'active', updatedAt: '2025-04-26' },
  { id: 4, name: 'Natural Jaggery', packageSize: '1 kg pack', image: 'jaggery', category: 'Processed', quantity: 40, quantityUnit: 'kg', unitPrice: 320, priceUnit: 'kg', stockStatus: 'low_stock', batchId: 'BATCH-RY-004', listingStatus: 'active', updatedAt: '2025-04-25' },
  { id: 5, name: 'Pure Cow Ghee', packageSize: '500 ml', image: 'ghee', category: 'Dairy', quantity: 30, quantityUnit: 'kg', unitPrice: 680, priceUnit: 'kg', stockStatus: 'in_stock', batchId: 'BATCH-RY-005', listingStatus: 'active', updatedAt: '2025-04-24' },
  { id: 6, name: 'Masoor Dal', packageSize: '1 kg pack', image: 'masoor', category: 'Pulses', quantity: 25, quantityUnit: 'kg', unitPrice: 110, priceUnit: 'kg', stockStatus: 'out_of_stock', batchId: 'BATCH-RY-006', listingStatus: 'inactive', updatedAt: '2025-04-23' },
  { id: 7, name: 'Mustard Seeds', packageSize: '1 kg pack', image: 'mustard', category: 'Oilseeds', quantity: 60, quantityUnit: 'kg', unitPrice: 95, priceUnit: 'kg', stockStatus: 'in_stock', batchId: 'BATCH-RY-007', listingStatus: 'active', updatedAt: '2025-04-22' },
  { id: 8, name: 'Fresh Tomatoes', packageSize: '5 kg crate', image: 'tomatoes', category: 'Vegetables', quantity: 35, quantityUnit: 'kg', unitPrice: 40, priceUnit: 'kg', stockStatus: 'low_stock', batchId: 'BATCH-RY-008', listingStatus: 'active', updatedAt: '2025-04-21' },
  { id: 9, name: 'Fresh Okra', packageSize: '5 kg crate', image: 'okra', category: 'Vegetables', quantity: 75, quantityUnit: 'kg', unitPrice: 48, priceUnit: 'kg', stockStatus: 'in_stock', batchId: 'BATCH-RY-009', listingStatus: 'active', updatedAt: '2025-04-20' },
  { id: 10, name: 'Raw Peanuts', packageSize: '2 kg pack', image: 'peanuts', category: 'Oilseeds', quantity: 90, quantityUnit: 'kg', unitPrice: 120, priceUnit: 'kg', stockStatus: 'in_stock', batchId: 'BATCH-RY-010', listingStatus: 'active', updatedAt: '2025-04-19' },
  { id: 11, name: 'Fresh Turmeric', packageSize: '1 kg pack', image: 'turmeric', category: 'Spices', quantity: 18, quantityUnit: 'kg', unitPrice: 85, priceUnit: 'kg', stockStatus: 'low_stock', batchId: 'BATCH-RY-011', listingStatus: 'active', updatedAt: '2025-04-18' },
  { id: 12, name: 'Basmati Rice', packageSize: '5 kg bag', image: 'rice', category: 'Grains', quantity: 110, quantityUnit: 'kg', unitPrice: 75, priceUnit: 'kg', stockStatus: 'in_stock', batchId: 'BATCH-RY-012', listingStatus: 'active', updatedAt: '2025-04-17' },
]

const imageKeys = ['riceBag', 'wheat', 'maize', 'jaggery', 'ghee', 'masoor', 'mustard', 'tomatoes', 'okra', 'peanuts', 'turmeric', 'rice']
const categoryDetails = {
  Grains: { subcategory: 'Grains & Cereals', quality: [['Grain Type', 'Premium whole grain'], ['Purity', '99% (Premium Grade)'], ['Moisture Content', '12% (Optimal)'], ['Foreign Matter', '< 0.5%'], ['Certification', 'Naturally Grown'], ['Quality Check Date', 'Oct 18, 2024']] },
  Processed: { subcategory: 'Natural Sweeteners', quality: [['Processing', 'Traditional open-pan'], ['Purity', '100% natural'], ['Moisture Content', '< 5%'], ['Additives', 'None'], ['Certification', 'FSSAI Certified'], ['Quality Check Date', 'Oct 20, 2024']] },
  Dairy: { subcategory: 'Dairy Products', quality: [['Milk Source', 'Indigenous cows'], ['Milk Fat', 'A2 rich'], ['Purity', '99.8%'], ['Shelf Life', '9 months'], ['Certification', 'FSSAI Certified'], ['Quality Check Date', 'Apr 18, 2025']] },
  Pulses: { subcategory: 'Pulses & Lentils', quality: [['Variety', 'Premium Masoor'], ['Purity', '98.5%'], ['Moisture Content', '11%'], ['Polish', 'Unpolished'], ['Certification', 'Naturally Grown'], ['Quality Check Date', 'Apr 17, 2025']] },
  Oilseeds: { subcategory: 'Seeds & Oilseeds', quality: [['Seed Grade', 'Grade A'], ['Purity', '98%'], ['Oil Content', '38-42%'], ['Moisture Content', '8%'], ['Certification', 'Quality Tested'], ['Quality Check Date', 'Apr 16, 2025']] },
  Vegetables: { subcategory: 'Fresh Vegetables', quality: [['Freshness Grade', 'Grade A'], ['Harvest Type', 'Hand picked'], ['Pesticide Residue', 'Within safe limits'], ['Sorting', 'Size graded'], ['Certification', 'Farm Verified'], ['Quality Check Date', 'Apr 27, 2025']] },
  Spices: { subcategory: 'Fresh Spices', quality: [['Variety', 'High curcumin'], ['Freshness Grade', 'Grade A'], ['Curcumin Content', '5.2%'], ['Moisture Content', '10%'], ['Certification', 'Farm Verified'], ['Quality Check Date', 'Apr 17, 2025']] },
}
const descriptions = {
  Grains: 'Premium quality grain grown naturally on our farm using sustainable practices. Carefully cleaned and selected for excellent taste, aroma, and nutrition.',
  Processed: 'Traditionally prepared from farm-grown produce with no artificial colours or preservatives. Rich flavour and natural goodness in every pack.',
  Dairy: 'Pure farm-fresh dairy product prepared from milk sourced from healthy indigenous cows and processed under strict quality controls.',
  Pulses: 'Clean, protein-rich pulses grown with responsible farming practices, naturally dried and carefully sorted for everyday wholesome meals.',
  Oilseeds: 'High-quality seeds harvested at peak maturity, cleaned and graded to preserve natural oils, flavour, and nutritional value.',
  Vegetables: 'Freshly harvested vegetables grown with responsible farming practices and delivered quickly to preserve taste, texture, and nutrition.',
  Spices: 'Aromatic farm-grown spice harvested at peak freshness, carefully cleaned, graded, and packed to retain its natural colour and flavour.',
}

export const products = baseProducts.map((product, index) => {
  const category = categoryDetails[product.category] || categoryDetails.Grains
  const pricePerDisplayUnit = product.category === 'Grains' ? product.unitPrice * 100 : product.unitPrice
  const displayUnit = product.category === 'Grains' ? 'quintal' : product.priceUnit
  const total = Math.max(3, Math.round(product.quantity / (product.category === 'Grains' ? 10 : 5)))
  const reserved = Math.max(1, Math.round(total * .3))
  const images = [0, 1, 2, 3].map(offset => imageKeys[(index + offset) % imageKeys.length])
  return { ...product, detail: {
    subcategory: category.subcategory,
    price: pricePerDisplayUnit,
    priceUnit: displayUnit,
    harvestDate: index < 7 ? 'Oct 15, 2024' : 'Apr 27, 2025',
    source: `Yadav Organic Farm, Varanasi, Uttar Pradesh`,
    tags: product.category === 'Vegetables' ? ['Farm Fresh', 'Verified Product', 'Naturally Grown', 'Premium Quality'] : ['Organic', 'Farm Fresh', 'Verified Product', 'Premium Quality'],
    description: `${descriptions[product.category]} ${product.name} is batch-tested and packed with care for KhetSetu buyers.`,
    images,
    inventory: { total, reserved, available: total - reserved, unit: product.category === 'Grains' ? 'Quintals' : product.quantityUnit, totalKg: product.quantity, reservedKg: Math.round(product.quantity * .3), availableKg: Math.round(product.quantity * .7) },
    recentOrders: [
      { id:`#KS${4582-index}`, buyer:['GreenMart','Organic Hub','FreshBite'][index%3], date:'Apr 26, 2025', quantity:'2 Qtls', status:'Delivered' },
      { id:`#KS${4578-index}`, buyer:'Organic Hub', date:'Apr 24, 2025', quantity:'1 Qtl', status:'Shipped' },
      { id:`#KS${4569-index}`, buyer:'FreshBite', date:'Apr 22, 2025', quantity:'3 Qtls', status:'Delivered' },
      { id:`#KS${4556-index}`, buyer:'NatureKart', date:'Apr 18, 2025', quantity:'1 Qtl', status:'Pending' },
    ],
    rating: { average:(4.5 + (index % 5) * .1).toFixed(1), count:28 + index * 2, distribution:[72 + index % 7,18,7,2,1], reviewer:['Sunil Verma','Anita Sharma','Ravi Singh'][index%3], date:'Apr 20, 2025', text:`Excellent quality ${product.name.toLowerCase()}! Fresh, well packed, and delivered on time.` },
    priceInsight: { current:pricePerDisplayUnit, change:8 + index % 7, low:Math.round(pricePerDisplayUnit * .86), high:Math.round(pricePerDisplayUnit * 1.14), unit:displayUnit },
    qualityDetails: category.quality,
    batchInfo: { productId:`PRD-2024-${String(index+18).padStart(4,'0')}`, batchNumber:product.batchId, harvestDate:index < 7 ? 'Oct 15, 2024' : 'Apr 27, 2025', lastUpdated:product.updatedAt, qualityCheck:index < 7 ? 'Oct 18, 2024' : 'Apr 28, 2025', visibility:'Visible to all buyers' },
  }}
})

export const categories = [...new Set(products.map(product => product.category))]

export const quickActions = [
  { label: 'Add New Product', icon: Plus },
  { label: 'Update Stock', icon: Package },
  { label: 'Manage Batch IDs', icon: Tag },
  { label: 'Bulk Upload (CSV)', icon: Upload },
  { label: 'View Product Performance', icon: ChartNoAxesCombined },
]

export const productFeatures = [
  { title: 'Product Listing', description: 'Add and showcase your farm products to reach more buyers.', icon: Warehouse },
  { title: 'Stock Management', description: 'Track real-time stock levels and get low stock alerts.', icon: CircleCheck },
  { title: 'Batch Tracking', description: 'Maintain batch IDs for full traceability from farm to buyer.', icon: CircleHelp },
  { title: 'Pricing Control', description: 'Set and update your product prices based on market trends.', icon: ChartNoAxesCombined },
  { title: 'Add New Product', description: 'Easily list new products with images, category and details.', icon: Plus },
  { title: 'Status Control', description: 'Activate, deactivate or update listings anytime.', icon: CircleCheck },
]
