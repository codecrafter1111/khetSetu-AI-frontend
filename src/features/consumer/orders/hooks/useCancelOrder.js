import { useCallback, useEffect, useState } from 'react'
import { cancelConsumerOrder, getOrderCancellationOptions } from '../services/orderCancellation.service'

export function useCancelOrder(orderId, open) {
  const [options, setOptions] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open || !orderId) return undefined
    let active = true
    getOrderCancellationOptions(orderId)
      .then((result) => { if (active) setOptions(result) })
      .catch((caught) => { if (active) setError(caught.message || 'Cancellation options could not be loaded.') })
    return () => { active = false }
  }, [open, orderId])

  const submit = useCallback(async (payload) => {
    setSubmitting(true); setError('')
    try { return await cancelConsumerOrder(orderId, payload) }
    catch (caught) { setError(caught.message || 'The order could not be cancelled. Please try again.'); throw caught }
    finally { setSubmitting(false) }
  }, [orderId])

  const loading = open && (!options || options.orderId !== orderId) && !error
  return { options, loading, submitting, error, setError, submit }
}
