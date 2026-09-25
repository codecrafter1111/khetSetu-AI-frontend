import { ChevronDown, Sprout, X } from 'lucide-react'
import { useState } from 'react'
import { farmSelectOptions } from '../data/farmOptions'

export default function CropMultiSelect({ value, onChange, error }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const options = farmSelectOptions.crops.filter((crop) => !value.includes(crop) && crop.toLowerCase().includes(query.toLowerCase()))

  const add = (crop) => { onChange([...value, crop]); setQuery(''); setOpen(false) }
  const remove = (crop) => onChange(value.filter((item) => item !== crop))
  const onKeyDown = (event) => {
    if (event.key === 'Enter' && query.trim()) {
      event.preventDefault()
      add(options[0] || query.trim().replace(/\b\w/g, (letter) => letter.toUpperCase()))
    }
  }

  return <label className={`crop-select${error ? ' has-error' : ''}`}>
    <span>Main Crops Grown <b>*</b></span>
    <span className="crop-select__control"><Sprout />{value.map((crop) => <i key={crop}>{crop}<button type="button" onClick={() => remove(crop)} aria-label={`Remove ${crop}`}><X /></button></i>)}<input value={query} onChange={(event) => { setQuery(event.target.value); setOpen(true) }} onFocus={() => setOpen(true)} onKeyDown={onKeyDown} placeholder={value.length ? 'Add crop' : 'Search crops'} /><ChevronDown /></span>
    {open && options.length > 0 && <span className="crop-select__menu">{options.slice(0, 5).map((crop) => <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => add(crop)} key={crop}>{crop}</button>)}</span>}
    {error && <small role="alert">{error}</small>}
  </label>
}
