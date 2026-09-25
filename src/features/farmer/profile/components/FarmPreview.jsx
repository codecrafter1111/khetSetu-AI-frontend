import { BadgeCheck, Droplets, Leaf, MapPin, Sprout, Tractor } from 'lucide-react'

export default function FarmPreview({ farm, onEdit }) {
  const cover = farm.photos[0]?.src || '/images/dashboard/healthy-crops.png'
  const items = [
    { icon: MapPin, value: `${farm.village}, ${farm.district}, ${farm.state}`, label: `PIN: ${farm.pinCode}` },
    { icon: Tractor, value: `${farm.totalArea} ${farm.areaUnit}`, label: 'Total Farm Area' },
    { icon: Sprout, value: `${farm.soilType} Soil`, label: 'Soil Type' },
    { icon: Droplets, value: `${farm.irrigationType} (${farm.waterSource})`, label: 'Irrigation Type & Water Source' },
    { icon: Leaf, value: farm.crops.join(', '), label: 'Main Crops Grown' },
  ]
  return <section className="farm-side-card farm-preview-card">
    <header><h2><span>◉</span> Farm Overview Preview</h2><button type="button" onClick={onEdit}>Edit ✎</button></header>
    <img className="farm-preview-cover" src={cover} alt="Farm overview" />
    <div className="farm-preview-title"><h3>{farm.farmName || 'Your Farm'}</h3><span><BadgeCheck />{farm.farmingMethod || 'Method'}</span></div>
    <div className="farm-preview-items">{items.map(({ icon: Icon, value, label }) => <article key={label}><span><Icon /></span><div><strong>{value || 'Not added yet'}</strong><small>{label}</small></div></article>)}</div>
  </section>
}
