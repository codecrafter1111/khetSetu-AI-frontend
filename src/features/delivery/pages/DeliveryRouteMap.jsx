import { useState } from 'react'
import { AlertTriangle, Box, Car, Check, CheckCircle2, ChevronDown, ChevronRight, Clock3, Crosshair, Expand, Filter, Fuel, Leaf, Map, MapPinned, Milestone, Navigation, Phone, Send, Share2, Shuffle, Star, TrendingUp, Truck } from 'lucide-react'
import routeReference from '../../../../Images/delevery/ChatGPT Image Sep 23, 2026, 09_54_22 PM (3).png'
import { optimizationInsights, routeFeatures, routeStops as initialStops, routeSummary, trafficAlerts } from '../data/route-map.mock'
import '../route-map.css'

const summaryIcons={box:Box,road:Milestone,clock:Clock3,fuel:Fuel}
const insightIcons={trend:TrendingUp,clock:Clock3,leaf:Leaf,star:Star}
const featureIcons={pin:MapPinned,sequence:Shuffle,clock:Clock3,alert:AlertTriangle,filter:Filter,map:Map}
const alertIcons={car:Car,alert:AlertTriangle,check:CheckCircle2}

function RouteHero(){return <section className="route-hero" style={{'--route-art':`url("${routeReference}")`}}><div className="route-hero-copy"><h1><MapPinned />Route Map</h1><p>Optimized routes for faster deliveries and fresher food.</p></div><div className="route-hero-script">Good<br /><span>Food Reaches</span><br />Further</div><div className="route-hero-brand"><Leaf /><strong>Fresh Farms<br />Stronger Cities</strong></div></section>}

function SummaryCards(){return <section className="route-summary" aria-label="Route summary">{routeSummary.map(item=>{const Icon=summaryIcons[item.icon];return <article key={item.label}><span className={`route-summary-icon ${item.tone}`}><Icon /></span><div><p>{item.label}</p><div className="route-summary-value"><strong>{item.value}</strong>{item.trend&&<em>↘ {item.trend}</em>}</div><small>{item.detail}</small></div></article>})}</section>}

function RouteMapPanel({selected,setSelected}){
  const [view,setView]=useState('Map View')
  const [centered,setCentered]=useState(0)
  return <section className="route-map-panel"><header><h2><Map />Live Route Map</h2><div><button type="button" onClick={()=>setCentered(value=>value+1)}><Crosshair />Re-center</button><label><span className="sr-only">Map view</span><select value={view} onChange={e=>setView(e.target.value)}><option>Map View</option><option>Satellite</option><option>Terrain</option></select><ChevronDown /></label><button type="button" aria-label="Expand map"><Expand /></button></div></header><div className={`route-map-canvas view-${view.toLowerCase().replace(' ','-')} recentered-${centered%2}`}><div className="map-grid-lines"/><div className="route-river">Ganga</div><div className="route-highway highway-a"/><div className="route-highway highway-b"/><div className="route-highway highway-c"/><div className="optimized-leg leg-1"/><div className="optimized-leg leg-2"/><div className="optimized-leg leg-3"/><div className="optimized-leg leg-4"/><div className="optimized-leg leg-5"/><div className="optimized-leg leg-6"/><span className="map-place place-start"><Truck />Kisan Samooh Kendra</span><strong className="map-place place-varanasi">Varanasi<small>वाराणसी</small></strong><span className="map-place place-bhu">Banaras<br/>Hindu University</span><span className="map-place place-assi">Assi Ghat</span><span className="map-place place-final">🏁 City Fresh Market</span>{initialStops.map(stop=><button type="button" key={stop.id} onClick={()=>setSelected(stop.id)} className={`route-map-marker marker-${stop.id} ${stop.alert?'alert':''} ${selected===stop.id?'selected':''}`}>{stop.id===6?<Check/>:stop.id}</button>)}<div className="map-zoom"><button type="button" aria-label="Zoom in">+</button><button type="button" aria-label="Zoom out">−</button></div><div className="route-map-legend"><span><Leaf/>Pickup Point</span><span><i className="delivery-dot"/>Delivery Point</span><span><i className="optimized-line"/>Optimized Route</span><span><i className="alternate-line"/>Alternative Route</span><span>🏁 Final Stop</span></div></div></section>
}

function StopsPanel({stops,selected,onSelect}){return <section className="route-stops-panel"><header><h2><MapPinned />Today&apos;s Stops</h2><button type="button">View All (12)<ChevronRight /></button></header><div>{stops.map(stop=><button type="button" key={stop.id} onClick={()=>onSelect(stop.id)} className={`route-stop-row ${selected===stop.id?'selected':''}`}><span className={`route-stop-index ${stop.alert?'alert':stop.status==='Completed'?'done':'current'}`}>{stop.id}</span>{stop.type==='pickup'?<Leaf className="stop-type pickup"/>:<MapPinned className="stop-type"/>}<span className="stop-copy"><strong>{stop.name}</strong><small>{stop.address}</small></span><span className="stop-meta"><time>{stop.time}</time><em className={stop.status.toLowerCase().replaceAll(' ','-')}>{stop.status}</em></span><ChevronRight className="stop-chevron"/></button>)}</div></section>}

function PanelHeader({icon:Icon,title,action}){return <header className="route-lower-title"><h2><Icon />{title}</h2>{action}</header>}

function OptimizationPanel(){return <section className="route-lower-panel optimization-panel"><PanelHeader icon={TrendingUp} title="Route Optimization Insights"/><div>{optimizationInsights.map(item=>{const Icon=insightIcons[item.icon];return <article key={item.title}><Icon/><span><strong>{item.title}</strong><small>{item.detail}</small></span></article>})}</div></section>}

function TrafficPanel(){return <section className="route-lower-panel traffic-panel"><PanelHeader icon={AlertTriangle} title="Traffic & Delay Alerts" action={<button type="button">View All <ChevronRight/></button>}/><div>{trafficAlerts.map(item=>{const Icon=alertIcons[item.icon];return <article key={item.title} className={item.tone}><Icon/><span><strong>{item.title}</strong>{item.location&&<small>{item.location}</small>}<small>{item.detail}</small></span><time>{item.time}</time></article>})}</div></section>}

function QuickActions({onReorder,reordered}){const actions=[{icon:Navigation,title:'Navigate Now',text:'Start navigation with live traffic',primary:true},{icon:reordered?Check:Shuffle,title:reordered?'Stops Reordered':'Reorder Stops',text:reordered?'Route sequence optimized':'Optimize your route sequence',action:onReorder},{icon:Share2,title:'Share ETA',text:'Share live location with customer'},{icon:Phone,title:'Call Customer',text:'Quickly connect with customer'}];return <section className="route-lower-panel quick-panel"><PanelHeader icon={Send} title="Quick Actions"/><div>{actions.map(({icon:Icon,title,text,primary,action})=><button type="button" onClick={action} className={primary?'primary':''} key={title}><Icon/><strong>{title}</strong><span>{text}</span></button>)}</div></section>}

function RouteKeyFeatures(){return <section className="route-lower-panel route-features-panel"><PanelHeader icon={Star} title="Key Features"/><div>{routeFeatures.map(feature=>{const Icon=featureIcons[feature.icon];return <article key={feature.title}><Icon/><span><strong>{feature.title}</strong><small>{feature.detail}</small></span></article>})}</div></section>}

export default function DeliveryRouteMap(){
  const [selected,setSelected]=useState(2)
  const [reordered,setReordered]=useState(false)
  const stops=reordered?[initialStops[0],initialStops[1],initialStops[2],initialStops[4],initialStops[3],initialStops[5]]:initialStops
  return <><RouteHero/><div className="route-page-content"><SummaryCards/><div className="route-main-grid"><RouteMapPanel selected={selected} setSelected={setSelected}/><StopsPanel stops={stops} selected={selected} onSelect={setSelected}/></div><div className="route-lower-grid"><OptimizationPanel/><TrafficPanel/><QuickActions onReorder={()=>setReordered(value=>!value)} reordered={reordered}/><RouteKeyFeatures/></div></div></>
}
