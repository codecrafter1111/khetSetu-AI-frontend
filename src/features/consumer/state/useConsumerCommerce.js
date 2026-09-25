import { useContext } from 'react'
import { ConsumerCommerceContext } from './ConsumerCommerceContext'

export function useConsumerCommerce() {
  const commerce = useContext(ConsumerCommerceContext)
  if (!commerce) throw new Error('Consumer commerce state is unavailable')
  return commerce
}
