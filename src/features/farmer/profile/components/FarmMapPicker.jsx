import { LocateFixed, MapPin, Minus, Plus, Search } from 'lucide-react'
import { useState } from 'react'
import { saveFarmLocation, searchFarmLocation } from '../services/farmDetails.service'

export default function FarmMapPicker({ location, onChange, error }) {
  const [query, setQuery] = useState(location.address)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [pin, setPin] = useState({ x: 50, y: 52 })

  const search = async (event) => {
    event?.preventDefault()
    setLoading(true); setMessage('')
    try { onChange(await searchFarmLocation(query)) } catch (caught) { setMessage(caught.message) } finally { setLoading(false) }
  }

  const useMyLocation = () => {
    if (!navigator.geolocation) { setMessage('Location access is not supported by this browser.'); return }
    setLoading(true); setMessage('')
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => { onChange(await saveFarmLocation({ ...location, latitude: coords.latitude, longitude: coords.longitude })); setLoading(false) },
      () => { setMessage('Location access was unavailable. You can place the pin manually.'); setLoading(false) },
      { enableHighAccuracy: true, timeout: 8000 },
    )
  }

  const placePin = async (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width) * 100
    const y = ((event.clientY - bounds.top) / bounds.height) * 100
    setPin({ x, y })
    const latitude = 25.3176 + ((50 - y) / 100) * 0.08
    const longitude = 82.9739 + ((x - 50) / 100) * 0.08
    onChange(await saveFarmLocation({ ...location, latitude, longitude }))
  }

  return <div className={`farm-map-field${error ? ' has-error' : ''}`}>
    <label>Farm Location <b>*</b></label>
    <form onSubmit={search}><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search village, district or enter address" aria-label="Search farm location" /><button type="submit" disabled={loading}>{loading ? 'Searching' : 'Search'}</button></form>
    <button className="farm-map" type="button" onClick={placePin} aria-label="Click map to set farm location">
      <span className="farm-map__pin" style={{ left: `${pin.x}%`, top: `${pin.y}%` }}><MapPin /></span>
      <span className="farm-map__zoom"><i><Plus /></i><i><Minus /></i></span>
    </button>
    <button className="farm-map-location" type="button" onClick={useMyLocation} disabled={loading}><LocateFixed /> {loading ? 'Locating...' : 'Set Location on Map'}</button>
    <div className="farm-coordinates"><span>Latitude: {Number(location.latitude).toFixed(4)}° N</span><span>Longitude: {Number(location.longitude).toFixed(4)}° E</span></div>
    {(error || message) && <small role="alert">{error || message}</small>}
  </div>
}
