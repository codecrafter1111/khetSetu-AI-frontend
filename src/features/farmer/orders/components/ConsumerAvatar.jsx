const positions = { priya: '0% 0%', amit: '50% 0%', neha: '100% 0%', rahul: '0% 100%', sneha: '50% 100%' }

export default function ConsumerAvatar({ consumer, className = '' }) {
  return <span role="img" aria-label={consumer.name} className={`inline-block shrink-0 rounded-full bg-slate-100 bg-[url('/images/orders/consumer-avatars.png')] bg-[length:300%_200%] bg-no-repeat ${className}`} style={{ backgroundPosition: positions[consumer.avatar] || positions.priya }} />
}
