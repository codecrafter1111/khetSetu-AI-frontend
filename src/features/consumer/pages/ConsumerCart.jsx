import { useState } from 'react'
import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../../config/routes'
import { useConsumerCommerce } from '../state/useConsumerCommerce'
import { CartCheckoutHeader, CartItemsCard, CheckoutFeatures, CheckoutProgress, CheckoutTrustStrip, DeliveryAddressCard, DeliverySlotCard, OrderSummary, PromoCodeCard } from '../components/cart/CheckoutSections'

const initialAddresses = [
  { id: 'home', label: 'Home - New Delhi', lines: 'B-102, Sunrise Apartments, Sector 62, Noida, New Delhi - 110062', name: 'Priya Sharma', phone: '+91 98765 43210', default: true },
  { id: 'office', label: 'Office - Noida', lines: 'C-210, Tech Park, Sector 62, Noida - 201309', name: 'Priya Sharma', phone: '+91 98765 43210' },
]
const dateOptions = Array.from({ length: 4 }, (_, index) => {
  const date = new Date()
  date.setDate(date.getDate() + index)
  return { key: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`, label: index === 0 ? 'Today' : date.toLocaleDateString('en-IN', { weekday: 'short' }), display: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }) }
})
const initialTime = '9:00 AM – 12:00 PM'

function AddressDialog({ onClose, onSave }) {
  const [form, setForm] = useState({ label: '', lines: '', name: '', phone: '' })
  const update = event => setForm(current => ({ ...current, [event.target.name]: event.target.value }))
  return <div className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/50 p-4" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}><div role="dialog" aria-modal="true" aria-labelledby="address-dialog-title" className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl"><div className="flex items-center justify-between"><h2 id="address-dialog-title" className="text-lg font-bold text-slate-950">Add delivery address</h2><button type="button" aria-label="Close address form" onClick={onClose}><X size={20} /></button></div><form onSubmit={event => { event.preventDefault(); onSave({ ...form, id: `address-${Date.now()}` }) }} className="mt-4 space-y-3">{[['label', 'Label (e.g. Home)'], ['lines', 'Full address'], ['name', 'Contact name'], ['phone', 'Phone number']].map(([key, label]) => <label key={key} className="block text-xs font-medium text-slate-700">{label}<input required name={key} value={form[key]} onChange={update} className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-700" /></label>)}<button type="submit" className="w-full rounded-lg bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white">Save address</button></form></div></div>
}

export default function ConsumerCart() {
  const navigate = useNavigate()
  const { cartItems, cartCount, cartSubtotal, deliveryFee, totalSavings, savedItems, setCartQuantity, removeFromCart, clearCart, saveForLater, restoreSavedItem } = useConsumerCommerce()
  const [addresses, setAddresses] = useState(initialAddresses)
  const [selectedAddress, setSelectedAddress] = useState('home')
  const [addressDialogOpen, setAddressDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(dateOptions[0].key)
  const [selectedTime, setSelectedTime] = useState(initialTime)
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoMessage, setPromoMessage] = useState('')
  const [checkoutError, setCheckoutError] = useState('')
  const promoDiscount = promoApplied ? Math.round((cartSubtotal - totalSavings) * 0.1) : 0
  const payable = Math.max(0, cartSubtotal + deliveryFee - totalSavings - promoDiscount)

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'KISAN10' && cartCount > 0) {
      setPromoApplied(true)
      setPromoMessage('KISAN10 applied: 10% off your products.')
    } else {
      setPromoApplied(false)
      setPromoMessage(cartCount ? 'This promo code is not valid.' : 'Add products before applying a promo code.')
    }
  }
  const proceed = () => {
    if (!cartCount) { setCheckoutError('Add a product to your cart to continue.'); return }
    if (!selectedAddress) { setCheckoutError('Select a delivery address to continue.'); return }
    if (!selectedDate || !selectedTime) { setCheckoutError('Select a delivery slot to continue.'); return }
    setCheckoutError('')
    sessionStorage.setItem('khetsetu-consumer-checkout', JSON.stringify({ address: addresses.find(item => item.id === selectedAddress), date: selectedDate, time: selectedTime, promoCode: promoApplied ? 'KISAN10' : null, promoDiscount, totalPayable: payable }))
    navigate(routes.consumer.payment)
  }

  return <div className="min-h-[calc(100vh-72px)] bg-[#f5fbfd] px-3 pb-6 pt-4 sm:px-5 lg:px-4 xl:px-5">
    <CartCheckoutHeader />
    <CheckoutProgress />
    <div className="grid items-start gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(285px,320px)]">
      <div className="min-w-0 space-y-3"><div id="cart-items"><CartItemsCard cartItems={cartItems} savedItems={savedItems} onQuantity={setCartQuantity} onRemove={removeFromCart} onSave={saveForLater} onRestore={restoreSavedItem} onClear={clearCart} /></div><div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-2"><DeliveryAddressCard addresses={addresses} selectedId={selectedAddress} onSelect={id => { setSelectedAddress(id); setCheckoutError('') }} onAdd={() => setAddressDialogOpen(true)} /><DeliverySlotCard dates={dateOptions} date={selectedDate} onDate={setSelectedDate} time={selectedTime} onTime={setSelectedTime} /></div></div>
      <aside className="min-w-0 space-y-3"><CheckoutFeatures /><PromoCodeCard code={promoCode} setCode={setPromoCode} applied={promoApplied} message={promoMessage} onApply={applyPromo} onRemove={() => { setPromoApplied(false); setPromoCode(''); setPromoMessage('') }} /><OrderSummary count={cartCount} subtotal={cartSubtotal} fee={deliveryFee} savings={totalSavings} promoDiscount={promoDiscount} payable={payable} disabled={!cartCount} error={checkoutError} onProceed={proceed} /></aside>
    </div>
    <CheckoutTrustStrip />
    {addressDialogOpen && <AddressDialog onClose={() => setAddressDialogOpen(false)} onSave={address => { setAddresses(current => [...current, address]); setSelectedAddress(address.id); setAddressDialogOpen(false); setCheckoutError('') }} />}
  </div>
}
