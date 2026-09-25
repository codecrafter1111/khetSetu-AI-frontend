const avatarPositions = [
  ['0%', '0%'], ['50%', '0%'], ['100%', '0%'],
  ['0%', '100%'], ['50%', '100%'], ['100%', '100%'],
]

export function ShopkeeperAvatar({ tile = 3, name, className = '' }) {
  const [x, y] = avatarPositions[tile] ?? avatarPositions[3]
  return <span role="img" aria-label={name} className={`inline-block shrink-0 rounded-full bg-white bg-[url('/images/orders/consumer-avatars.png')] bg-[length:300%_200%] bg-no-repeat ${className}`} style={{ backgroundPosition: `${x} ${y}` }} />
}

export function ShopkeeperProductImage({ tile = 0, name, className = '' }) {
  return <span role="img" aria-label={name} className={`inline-block shrink-0 bg-white bg-[url('/images/agri-stores/input-products.png')] bg-[length:400%_100%] bg-no-repeat ${className}`} style={{ backgroundPosition: `${(tile / 3) * 100}% center` }} />
}
