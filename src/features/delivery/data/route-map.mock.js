export const routeSummary = [
  { label:'Total Stops Today', value:'12', detail:'8 Deliveries • 4 Pickups', icon:'box', tone:'green' },
  { label:'Distance to Cover', value:'38.4 km', trend:'-12%', detail:'vs. yesterday', icon:'road', tone:'green' },
  { label:'Estimated Time', value:'3 hr 45 min', detail:'incl. stops & traffic', icon:'clock', tone:'orange' },
  { label:'Fuel Efficiency', value:'22.5 km/L', trend:'+8%', detail:'Optimized route', icon:'fuel', tone:'green' },
]

export const routeStops = [
  { id:1, name:'Kisan Samooh Kendra', address:'Sector 62, Varanasi', time:'8:00 AM', status:'Completed', type:'pickup' },
  { id:2, name:'Green Leaf Organics', address:'Lanka, Varanasi', time:'10:30 AM', status:'On the way', type:'delivery' },
  { id:3, name:'FreshMart Superstore', address:'Cantonment, Varanasi', time:'12:00 PM', status:'Upcoming', type:'delivery' },
  { id:4, name:"Nature's Basket", address:'Assi, Varanasi', time:'1:30 PM', status:'Upcoming', type:'delivery', alert:true },
  { id:5, name:'Organic World', address:'Bhelupur, Varanasi', time:'3:00 PM', status:'Upcoming', type:'delivery' },
  { id:6, name:'City Fresh Market', address:'Sigra, Varanasi', time:'4:20 PM', status:'Upcoming', type:'delivery' },
]

export const optimizationInsights = [
  { icon:'trend', title:'12% shorter route', detail:'AI optimized vs. default route' },
  { icon:'clock', title:'2 stops reordered', detail:'For better time efficiency' },
  { icon:'leaf', title:'Estimated fuel savings', detail:'~0.8 L (₹65)' },
  { icon:'star', title:'On-time delivery probability', detail:'92%' },
]

export const trafficAlerts = [
  { icon:'car', tone:'red', title:'Moderate Traffic', location:'NH31 near Lanka', detail:'Expect 8-12 min delay', time:'10:15 AM' },
  { icon:'alert', tone:'orange', title:'Road Work', location:'Assi Ghat Road', detail:'Expect 5-10 min delay', time:'12:30 PM' },
  { icon:'check', tone:'green', title:'All Clear', detail:'No major delays on your route', time:'Updated 2 min ago' },
]

export const routeFeatures = [
  { icon:'pin', title:'Live Route Navigation', detail:'Get turn-by-turn directions with real-time traffic' },
  { icon:'sequence', title:'Stop Sequencing', detail:'AI-optimized delivery & pickup order' },
  { icon:'clock', title:'ETA Tracking', detail:'Accurate arrival time at each stop' },
  { icon:'alert', title:'Traffic Alerts', detail:'Real-time delay and road updates' },
  { icon:'filter', title:'Delivery Prioritization', detail:'High-priority & perishable items first' },
  { icon:'map', title:'Map-based Monitoring', detail:'Track your entire journey on a single map' },
]
