const item = (productId, name, pack, quantity = 1) => ({ productId, name, pack, quantity })

export const consumerOrders = [
  {
    id: 'KS8721', placedAt: '2025-04-24', status: 'outForDelivery', statusLabel: 'Out for Delivery', statusDate: 'Expected by Apr 26, 2025',
    farm: 'Sundar Farms', location: 'Sitapur, Uttar Pradesh', total: 1180, subtotal: 1125, deliveryCharge: 55, discount: 0, savings: 0, paidWith: 'UPI (GPay)', imageTile: 4,
    summary: 'Organic Basmati Rice, Honey, Fresh Vegetables + 2 more',
    items: [item(1, 'Organic Rice', '5 kg'), item(5, 'Wild Honey', '500 g'), item(7, 'Fresh Vegetables', '2 kg'), item(3, 'A2 Cow Ghee', '500 ml'), item(4, 'Organic Jaggery', '1 kg')],
    address: { name: 'Priya Sharma', lines: 'B-304, Green Park Apartments', city: 'New Delhi - 110016' },
    cancellation: { canCancel: true, cancellationDeadline: '2025-04-26T12:00:00+05:30' },
    tracking: [
      { title: 'Confirmed', date: 'Apr 24', time: '10:30 AM' }, { title: 'Packed', date: 'Apr 24', time: '04:15 PM' },
      { title: 'Shipped', date: 'Apr 25', time: '09:20 AM' }, { title: 'Out for Delivery', date: 'Apr 26', time: '08:00 AM' },
      { title: 'Delivered', date: 'Expected by', time: 'Apr 26, 2025' },
    ],
  },
  { id: 'KS7684', placedAt: '2025-04-18', status: 'delivered', statusLabel: 'Delivered', statusDate: 'Delivered on Apr 20, 2025', farm: 'Shanti Dairy', location: 'Haryana', total: 650, subtotal: 610, deliveryCharge: 40, discount: 0, savings: 80, paidWith: 'UPI', imageTile: 7, summary: 'A2 Cow Milk, Paneer, Curd', items: [item(8, 'A2 Cow Milk', '1 litre'), item(3, 'Paneer', '500 g'), item(8, 'Curd', '500 g')] },
  { id: 'KS7120', placedAt: '2025-04-10', status: 'shipped', statusLabel: 'Shipped', statusDate: 'Expected by Apr 14, 2025', farm: 'Madhav Organics', location: 'Maharashtra', total: 420, subtotal: 380, deliveryCharge: 40, discount: 0, savings: 60, paidWith: 'UPI', imageTile: 3, summary: 'Organic Jaggery, Raw Honey', items: [item(4, 'Organic Jaggery', '1 kg'), item(5, 'Raw Honey', '500 g')] },
  { id: 'KS6892', placedAt: '2025-04-05', status: 'processing', statusLabel: 'Processing', statusDate: 'Expected by Apr 08, 2025', farm: 'GreenFields Farm', location: 'Karnataka', total: 380, subtotal: 340, deliveryCharge: 40, discount: 0, savings: 100, paidWith: 'Card', imageTile: 5, summary: 'Mixed Pulses, Masoor Dal + 2 more', cancellation: { canCancel: true, cancellationDeadline: '2025-04-07T18:00:00+05:30' }, items: [item(6, 'Mixed Pulses', '1 kg'), item(6, 'Masoor Dal', '500 g'), item(6, 'Moong Dal', '500 g'), item(6, 'Toor Dal', '500 g')] },
  { id: 'KS6420', placedAt: '2025-03-28', status: 'cancelled', statusLabel: 'Cancelled', statusDate: 'Cancelled on Mar 29, 2025', farm: 'Organic Valley', location: 'Uttarakhand', total: 520, subtotal: 480, deliveryCharge: 40, discount: 0, savings: 0, paidWith: 'UPI', imageTile: 6, summary: 'Fresh Vegetables (Weekly Box)', items: [item(7, 'Fresh Vegetables', '2 kg'), item(7, 'Leafy Greens', '500 g'), item(7, 'Tomatoes', '1 kg'), item(7, 'Carrots', '500 g'), item(7, 'Cucumbers', '500 g'), item(7, 'Seasonal Produce', '500 g')] },
  { id: 'KS6218', placedAt: '2025-03-19', status: 'delivered', statusLabel: 'Delivered', statusDate: 'Delivered on Mar 21, 2025', farm: 'Sundar Farms', location: 'Uttar Pradesh', total: 820, subtotal: 780, deliveryCharge: 40, discount: 0, savings: 100, paidWith: 'UPI', imageTile: 0, summary: 'Organic Basmati Rice, Wild Honey', items: [item(1, 'Organic Basmati Rice', '5 kg'), item(5, 'Wild Honey', '500 g')] },
  { id: 'KS5980', placedAt: '2025-03-04', status: 'delivered', statusLabel: 'Delivered', statusDate: 'Delivered on Mar 06, 2025', farm: 'Satyam Organics', location: 'Madhya Pradesh', total: 450, subtotal: 410, deliveryCharge: 40, discount: 0, savings: 110, paidWith: 'Card', imageTile: 5, summary: 'Mixed Pulses Combo, Organic Jaggery', items: [item(6, 'Mixed Pulses Combo', '1 kg'), item(4, 'Organic Jaggery', '1 kg')] },
  { id: 'KS5541', placedAt: '2025-02-20', status: 'delivered', statusLabel: 'Delivered', statusDate: 'Delivered on Feb 22, 2025', farm: 'Himalaya Farms', location: 'Uttarakhand', total: 390, subtotal: 350, deliveryCharge: 40, discount: 0, savings: 130, paidWith: 'UPI', imageTile: 4, summary: 'Wild Forest Honey, Organic Jaggery', items: [item(5, 'Wild Forest Honey', '500 g'), item(4, 'Organic Jaggery', '1 kg')] },
  { id: 'KS5103', placedAt: '2025-02-08', status: 'delivered', statusLabel: 'Delivered', statusDate: 'Delivered on Feb 10, 2025', farm: 'Kisan Mitra Farm', location: 'Delhi NCR', total: 310, subtotal: 270, deliveryCharge: 40, discount: 0, savings: 150, paidWith: 'UPI', imageTile: 6, summary: 'Fresh Vegetable Basket, Cow Milk', items: [item(7, 'Fresh Vegetable Basket', '2 kg'), item(8, 'Fresh Cow Milk', '1 litre')] },
  { id: 'KS4866', placedAt: '2025-01-30', status: 'delivered', statusLabel: 'Delivered', statusDate: 'Delivered on Feb 01, 2025', farm: 'Green Fields Farm', location: 'Haryana', total: 360, subtotal: 320, deliveryCharge: 40, discount: 0, savings: 150, paidWith: 'Card', imageTile: 1, summary: 'Organic Wheat Flour (Atta)', items: [item(2, 'Organic Wheat Flour (Atta)', '5 kg')] },
  { id: 'KS4502', placedAt: '2025-01-12', status: 'delivered', statusLabel: 'Delivered', statusDate: 'Delivered on Jan 14, 2025', farm: 'Gokal Dairy', location: 'Rajasthan', total: 760, subtotal: 720, deliveryCharge: 40, discount: 0, savings: 160, paidWith: 'UPI', imageTile: 7, summary: 'Fresh Cow Milk, A2 Cow Ghee', items: [item(8, 'Fresh Cow Milk', '1 litre'), item(3, 'A2 Cow Ghee', '500 ml')] },
  { id: 'KS4124', placedAt: '2024-12-19', status: 'delivered', statusLabel: 'Delivered', statusDate: 'Delivered on Dec 21, 2024', farm: 'Sundar Farms', location: 'Uttar Pradesh', total: 960, subtotal: 920, deliveryCharge: 40, discount: 0, savings: 200, paidWith: 'UPI', imageTile: 0, summary: 'Organic Basmati Rice, Mixed Pulses', items: [item(1, 'Organic Basmati Rice', '5 kg'), item(6, 'Mixed Pulses Combo', '1 kg')] },
]

export const activeOrderStatuses = ['outForDelivery', 'shipped', 'processing']
export const orderFilterOptions = [
  { key: 'all', label: 'All Orders' },
  { key: 'active', label: 'In Transit' },
  { key: 'delivered', label: 'Delivered' },
  { key: 'cancelled', label: 'Cancelled' },
]
export const formatOrderDate = date => new Date(`${date}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
