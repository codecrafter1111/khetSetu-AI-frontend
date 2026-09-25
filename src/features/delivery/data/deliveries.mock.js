export const deliveryStats = [
  { label: 'Assigned Deliveries', value: 6, trend: '+20%', detail: 'for today', icon: 'package', tone: 'green' },
  { label: 'In Transit', value: 4, trend: '+33%', detail: 'on the way', icon: 'truck', tone: 'blue' },
  { label: 'Delivered Today', value: 8, trend: '+14%', detail: 'successfully delivered', icon: 'check', tone: 'green' },
  { label: 'Failed / Rescheduled', value: 1, trend: '-50%', detail: 'needs attention', icon: 'alert', tone: 'red' },
]

export const deliveries = [
  { id:'#KS7821', customer:'Amit Verma', product:'Organic Vegetables', pickup:'Kisan Samooh Kendra', drop:'Lanka', time:'8:00 AM – 10:00 AM', weight:'12 kg', status:'In Transit', area:'Lanka', phone:'+91 98765 43210', batch:'Batch #VG782', category:'Fresh Produce', pickupDetail:'Sector 62, Varanasi', dropDetail:'Near BHU Main Gate', pickupTime:'8:05 AM', expectedTime:'10:00 AM', emoji:'🥬' },
  { id:'#KS7822', customer:'Priya Sharma', product:'Fresh Fruits', pickup:'City Fresh Market', drop:'Sigra', time:'9:00 AM – 11:00 AM', weight:'8 kg', status:'Assigned', area:'Sigra', phone:'+91 98765 43211', batch:'Batch #FR224', category:'Fresh Produce', pickupDetail:'Godowlia, Varanasi', dropDetail:'Sigra Crossing', pickupTime:'Pending', expectedTime:'11:00 AM', emoji:'🍎' },
  { id:'#KS7823', customer:'Rohit Singh', product:'Dairy Products', pickup:'FreshMart', drop:'Bhelupur', time:'10:30 AM – 12:30 PM', weight:'10 L', status:'Picked Up', area:'Bhelupur', phone:'+91 98765 43212', batch:'Batch #DP109', category:'Dairy', pickupDetail:'Cantonment, Varanasi', dropDetail:'Bhelupur Main Road', pickupTime:'10:36 AM', expectedTime:'12:30 PM', emoji:'🥛' },
  { id:'#KS7824', customer:'Neha Gupta', product:'Organic Grains', pickup:"Nature's Basket", drop:'Assi Ghat', time:'12:00 PM – 2:00 PM', weight:'20 kg', status:'Delivered', area:'Assi', phone:'+91 98765 43213', batch:'Batch #OG442', category:'Organic Grains', pickupDetail:'Lahurabir, Varanasi', dropDetail:'Assi Ghat Road', pickupTime:'12:08 PM', expectedTime:'1:52 PM', emoji:'🌾' },
  { id:'#KS7825', customer:'Suresh Yadav', product:'Fresh Greens', pickup:'Green Leaf Organics', drop:'Lanka', time:'2:00 PM – 4:00 PM', weight:'5 kg', status:'Assigned', area:'Lanka', phone:'+91 98765 43214', batch:'Batch #FG552', category:'Fresh Produce', pickupDetail:'Lanka, Varanasi', dropDetail:'Lanka Market', pickupTime:'Pending', expectedTime:'4:00 PM', emoji:'🥗' },
  { id:'#KS7826', customer:'Anjali Tiwari', product:'Farm Fresh Milk', pickup:'Kisan Kendra', drop:'Cantt', time:'3:00 PM – 5:00 PM', weight:'10 L', status:'Delayed', area:'Cantt', phone:'+91 98765 43215', batch:'Batch #FM782', category:'Dairy', pickupDetail:'Shivpur, Varanasi', dropDetail:'Cantt Station Road', pickupTime:'Delayed', expectedTime:'5:20 PM', emoji:'🥛' },
  { id:'#KS7827', customer:'Vikram Patel', product:'Organic Rice', pickup:'FreshMart', drop:'Bhelupur', time:'4:00 PM – 6:00 PM', weight:'20 kg', status:'Assigned', area:'Bhelupur', phone:'+91 98765 43216', batch:'Batch #OR912', category:'Organic Grains', pickupDetail:'Cantonment, Varanasi', dropDetail:'Bhelupur Road', pickupTime:'Pending', expectedTime:'6:00 PM', emoji:'🌾' },
  { id:'#KS7828', customer:'Meera Jain', product:'Fresh Tomatoes', pickup:'Green Leaf', drop:'Sigra', time:'5:00 PM – 7:00 PM', weight:'6 kg', status:'Assigned', area:'Sigra', phone:'+91 98765 43217', batch:'Batch #FT319', category:'Fresh Produce', pickupDetail:'Lanka, Varanasi', dropDetail:'Sigra Market', pickupTime:'Pending', expectedTime:'7:00 PM', emoji:'🍅' },
  { id:'#KS7829', customer:'Arun Mishra', product:'Seasonal Fruits', pickup:'Farm Hub', drop:'Lanka', time:'6:00 PM – 8:00 PM', weight:'9 kg', status:'Assigned', area:'Lanka', phone:'+91 98765 43218', batch:'Batch #SF119', category:'Fresh Produce', pickupDetail:'Ramnagar, Varanasi', dropDetail:'Lanka Main Road', pickupTime:'Pending', expectedTime:'8:00 PM', emoji:'🍊' },
  { id:'#KS7830', customer:'Kavita Rao', product:'Organic Pulses', pickup:'Kisan Kendra', drop:'Sigra', time:'6:30 PM – 8:30 PM', weight:'12 kg', status:'Assigned', area:'Sigra', phone:'+91 98765 43219', batch:'Batch #OP441', category:'Organic Grains', pickupDetail:'Shivpur, Varanasi', dropDetail:'Sigra Crossing', pickupTime:'Pending', expectedTime:'8:30 PM', emoji:'🫘' },
  { id:'#KS7831', customer:'Rahul Singh', product:'Fresh Vegetables', pickup:'Green Leaf', drop:'Cantt', time:'7:00 PM – 9:00 PM', weight:'8 kg', status:'Assigned', area:'Cantt', phone:'+91 98765 43220', batch:'Batch #FV830', category:'Fresh Produce', pickupDetail:'Lanka, Varanasi', dropDetail:'Cantt Road', pickupTime:'Pending', expectedTime:'9:00 PM', emoji:'🥕' },
  { id:'#KS7832', customer:'Divya Shah', product:'Farm Fresh Milk', pickup:'Dairy Hub', drop:'Assi Ghat', time:'7:30 PM – 9:30 PM', weight:'8 L', status:'Assigned', area:'Assi', phone:'+91 98765 43221', batch:'Batch #FM790', category:'Dairy', pickupDetail:'Kabir Nagar, Varanasi', dropDetail:'Assi Ghat Road', pickupTime:'Pending', expectedTime:'9:30 PM', emoji:'🥛' },
]

export const deliveryFeatures = [
  { icon:'list', title:'Delivery Queue Management', text:'View and manage all assigned deliveries' },
  { icon:'filter', title:'Status Filters', text:'Filter by status, date, area and more' },
  { icon:'phone', title:'Customer Contact', text:'Quick call or message to customers' },
  { icon:'pin', title:'Pickup & Drop Details', text:'Complete location info with timing' },
  { icon:'alert', title:'Issue Reporting', text:'Report delays, failures or other issues' },
  { icon:'settings', title:'Delivery Actions', text:'Update status, navigate, mark as delivered' },
]
