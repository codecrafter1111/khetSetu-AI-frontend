import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChevronRight, House, ShoppingCart } from 'lucide-react'
import { routes } from '../../../config/routes'
import { gheeProduct } from '../data/productDetail.mock'
import ProductDetailGallery from '../components/ProductDetailGallery'
import ProductPurchasePanel from '../components/ProductPurchasePanel'
import ProductFarmAside from '../components/ProductFarmAside'
import ProductInfoTabs from '../components/ProductInfoTabs'
import RelatedProducts from '../components/RelatedProducts'
import { useConsumerCommerce } from '../state/useConsumerCommerce'

export default function ConsumerProductDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { addToCart, cartCount } = useConsumerCommerce()
  const [message, setMessage] = useState('')
  if (slug !== gheeProduct.slug) return <div className="p-6"><h1 className="text-2xl font-bold">Product not found</h1><Link to={routes.consumer.products} className="mt-3 inline-block text-emerald-800 underline">Return to Shop Products</Link></div>

  const addProduct = (product, quantity = 1) => { addToCart(product, quantity); setMessage(`${product.name} added to cart`) }
  const buyNow = (product, quantity) => { addToCart(product, quantity); navigate(routes.consumer.cart) }
  return <div className="min-w-0 space-y-5 bg-[#f8fcfd] p-3 md:p-4"><nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-slate-600"><Link to={routes.consumer.dashboard} aria-label="Dashboard"><House size={15} /></Link><Link to={routes.consumer.products} className="hover:text-emerald-800">Shop Products</Link><ChevronRight size={14} /><Link to={routes.consumer.products} className="hover:text-emerald-800">Dairy &amp; Dairy Products</Link><ChevronRight size={14} /><span className="font-medium text-slate-900">A2 Cow Ghee</span></nav>
    <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(310px,365px)]"><div className="min-w-0 space-y-5"><div className="grid min-w-0 gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.04fr)]"><ProductDetailGallery /><ProductPurchasePanel onAdd={addProduct} onBuy={buyNow} /></div><ProductInfoTabs /></div><ProductFarmAside /></div>
    <RelatedProducts onAdd={addProduct} />
    {message && <div role="status" className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg bg-emerald-900 px-4 py-3 text-sm text-white shadow-xl"><ShoppingCart size={17} />{message}{cartCount > 0 && <span className="rounded-full bg-white/20 px-2">{cartCount} item{cartCount === 1 ? '' : 's'}</span>}<Link to={routes.consumer.cart} className="font-semibold underline">View Cart</Link><button type="button" onClick={() => setMessage('')} aria-label="Dismiss notification" className="ml-2 text-lg leading-none">×</button></div>}
  </div>
}
