const images = {
  wheat: ['/images/dashboard/produce-grid.png', '0% 0%'],
  rice: ['/images/dashboard/produce-grid.png', '50% 0%'],
  maize: ['/images/dashboard/produce-grid.png', '100% 0%'],
  riceBag: ['/images/dashboard/produce-grid.png', '0% 100%'],
  jaggery: ['/images/dashboard/produce-grid.png', '50% 100%'],
  ghee: ['/images/dashboard/produce-grid.png', '100% 100%'],
  masoor: ['/images/products/additional-produce-grid.png', '0% 0%'],
  mustard: ['/images/products/additional-produce-grid.png', '50% 0%'],
  tomatoes: ['/images/products/additional-produce-grid.png', '100% 0%'],
  okra: ['/images/products/additional-produce-grid.png', '0% 100%'],
  peanuts: ['/images/products/additional-produce-grid.png', '50% 100%'],
  turmeric: ['/images/products/additional-produce-grid.png', '100% 100%'],
}

export default function ProductImage({ product, className = '' }) {
  const [url, position] = images[product.image] || images.wheat
  return <span role="img" aria-label={product.name} className={`inline-block shrink-0 rounded-md border border-slate-100 bg-white bg-[length:300%_200%] bg-no-repeat ${className}`} style={{ backgroundImage: `url(${url})`, backgroundPosition: position }} />
}
