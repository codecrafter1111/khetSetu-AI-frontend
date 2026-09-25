export default function ProduceImage({ tile, alt, className = '' }) {
  return <div role="img" aria-label={alt} className={`consumer-produce ${className}`} style={{ '--tile-x': `${(tile % 4) * 33.333}%`, '--tile-y': `${Math.floor(tile / 4) * 100}%` }} />
}
