export const shopkeeperProfile = { name: 'Suresh Kumar', role: 'Shopkeeper', location: 'Kanpur, UP', avatarTile: 3 }

export const dashboardStats = [
  { label: 'Total Products', value: '124', trend: '+8%', detail: '+6 new this month', tone: 'green', icon: 'package' },
  { label: 'Open Farmer Requests', value: '18', trend: '+20%', detail: '5 high priority', tone: 'blue', icon: 'users' },
  { label: 'Monthly Sales', value: '₹ 48,250', trend: '+12%', detail: 'vs. last month', tone: 'green', icon: 'sales' },
  { label: 'Store Rating', value: '4.7', trend: '+0.2', detail: '(128 reviews)', tone: 'amber', icon: 'star' },
]

export const farmerRequests = [
  { id: 'req-1', name: 'Rajesh Yadav', location: 'Kanpur, UP', avatarTile: 5, crop: 'Wheat', issue: 'Yellowing leaves', product: 'Urea Fertilizer', priority: 'High', date: 'Today', time: '10:30 AM' },
  { id: 'req-2', name: 'Sita Devi', location: 'Unnao, UP', avatarTile: 4, crop: 'Paddy', issue: 'Pest attack', product: 'Imidacloprid', priority: 'High', date: 'Today', time: '09:15 AM' },
  { id: 'req-3', name: 'Amit Singh', location: 'Bithoor, UP', avatarTile: 1, crop: 'Tomato', issue: 'Leaf curl virus', product: 'Paracetam (Herbicide)', priority: 'Medium', date: 'Yesterday', time: '05:20 PM' },
  { id: 'req-4', name: 'Karan Patel', location: 'Kanpur, UP', avatarTile: 3, crop: 'Chili', issue: 'Whiteflies', product: 'MOP (Potash)', priority: 'Medium', date: 'Yesterday', time: '01:10 PM' },
  { id: 'req-5', name: 'Sunita Maurya', location: 'Ramaipur, UP', avatarTile: 0, crop: 'Potato', issue: 'Early blight', product: 'Mancozeb', priority: 'Low', date: '12 Jun 2024', time: '11:45 AM' },
]

export const inventoryItems = [
  { id: 'stock-1', name: 'MOP (Potash)', remaining: '8 bags left', tile: 0 },
  { id: 'stock-2', name: 'Imidacloprid', remaining: '4 bottles left', tile: 3 },
  { id: 'stock-3', name: 'Hybrid Maize Seeds', remaining: '6 packets left', tile: 2 },
]

export const topProducts = [
  { id: 'product-1', name: 'Urea Fertilizer', size: '45 kg bag', badge: '#1 Best Seller', tone: 'amber', tile: 0 },
  { id: 'product-2', name: 'DAP Fertilizer', size: '50 kg bag', badge: 'High Demand', tone: 'green', tile: 1 },
  { id: 'product-3', name: 'MOP (Potash)', size: '50 kg bag', badge: 'Popular', tone: 'green', tile: 0 },
  { id: 'product-4', name: 'Imidacloprid', size: '500 ml', badge: 'Trending', tone: 'amber', tile: 3 },
  { id: 'product-5', name: 'Hybrid Maize Seeds', size: '1 kg packet', badge: 'Farmer Favorite', tone: 'green', tile: 2 },
]

export const notifications = [
  { id: 'notification-1', text: 'New farmer request from Rajesh Yadav', time: '10 minutes ago', tone: 'red' },
  { id: 'notification-2', text: 'MOP (Potash) is running low', time: '2 hours ago', tone: 'orange' },
  { id: 'notification-3', text: '3 new farmers joined your area', time: '5 hours ago', tone: 'green' },
  { id: 'notification-4', text: 'New review received (5 stars)', time: '1 day ago', tone: 'green' },
  { id: 'notification-5', text: 'Paracetam back in stock', time: '1 day ago', tone: 'green' },
]

export const salesByMonth = {
  month: [6, 12, 16, 20, 25, 22, 14, 19, 32, 25, 17, 21, 39, 26, 18, 23, 31, 27, 29, 43, 31, 34, 46, 49],
  week: [14, 22, 18, 29, 32, 26, 37],
}
