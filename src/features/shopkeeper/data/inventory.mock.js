export const inventoryStats = [
  { label: 'Total Products', value: 124, trend: '+8%', detail: '+6 new this month', tone: 'green', icon: 'total' },
  { label: 'In Stock', value: 96, trend: '+5%', detail: '78% of total products', tone: 'blue', icon: 'in' },
  { label: 'Low Stock', value: 18, trend: '+20%', detail: '15% of total products', tone: 'amber', icon: 'low' },
  { label: 'Out of Stock', value: 10, trend: '-9%', detail: '8% of total products', tone: 'red', icon: 'out' },
]

export const inventorySeed = [
  { id: 'urea', name: 'Urea Fertilizer', pack: '45 kg bag', category: 'Fertilizers', sku: 'KSA-U001', stock: 120, price: 266, supplier: 'IFFCO', tile: 0 },
  { id: 'dap', name: 'DAP Fertilizer', pack: '50 kg bag', category: 'Fertilizers', sku: 'KSA-D002', stock: 45, price: 1350, supplier: 'IFFCO', tile: 1 },
  { id: 'mop', name: 'MOP (Muriate of Potash)', pack: '50 kg bag', category: 'Fertilizers', sku: 'KSA-M003', stock: 8, price: 1120, supplier: 'IPL', tile: 0 },
  { id: 'paracetam', name: 'Paracetam (Herbicide)', pack: '1 L bottle', category: 'Pesticides', sku: 'KSA-P004', stock: 25, price: 620, supplier: 'Syngenta', tile: 3 },
  { id: 'imidacloprid', name: 'Imidacloprid (Insecticide)', pack: '500 ml bottle', category: 'Pesticides', sku: 'KSA-I005', stock: 4, price: 480, supplier: 'Bayer', tile: 3 },
  { id: 'maize', name: 'Hybrid Maize Seeds', pack: '1 kg packet', category: 'Seeds', sku: 'KSA-S006', stock: 0, price: 950, supplier: 'Pioneer', tile: 2 },
  { id: 'paddy', name: 'Hybrid Paddy Seeds', pack: '1 kg packet', category: 'Seeds', sku: 'KSA-S007', stock: 32, price: 780, supplier: 'UPL', tile: 2 },
  { id: 'tools', name: 'Farm Tools Kit', pack: '1 set', category: 'Farm Supplies', sku: 'KSA-F008', stock: 15, price: 1250, supplier: 'KisanKraft', tile: 0 },
]

// Additional local records make paging and filters usable until the inventory API is connected.
const extraTemplates = [inventorySeed[0], inventorySeed[1], inventorySeed[3], inventorySeed[6], inventorySeed[7], inventorySeed[2], inventorySeed[4], inventorySeed[5]]
export const inventoryProducts = [
  ...inventorySeed,
  ...Array.from({ length: 116 }, (_, index) => {
    const status = index < 91 ? 'in' : index < 107 ? 'low' : 'out'
    const template = extraTemplates[index % extraTemplates.length]
    return {
      ...template,
      id: `sample-${index + 9}`,
      sku: `${template.sku}-${String(index + 2).padStart(3, '0')}`,
      stock: status === 'in' ? 20 + (index % 70) : status === 'low' ? 1 + (index % 8) : 0,
    }
  }),
]

export const inventoryFeatures = [
  { title: 'Stock Tracking', detail: 'Real-time stock levels for all products', icon: 'tracking' },
  { title: 'Low-Stock Alerts', detail: 'Get notified when stock is low', icon: 'alerts' },
  { title: 'Product Categories', detail: 'Organize products by seeds, fertilizers, pesticides, and more', icon: 'categories' },
  { title: 'Price Control', detail: 'Set and update your selling prices', icon: 'price' },
  { title: 'Batch Information', detail: 'Track batch numbers and expiry dates', icon: 'batch' },
  { title: 'Quick Restocking', detail: 'Easily reorder from your suppliers', icon: 'restock' },
]

export const inventoryCategories = ['Fertilizers', 'Pesticides', 'Seeds', 'Farm Supplies']
export const stockStatus = product => product.stock === 0 ? 'out' : product.stock < 10 ? 'low' : 'in'
