import { useCallback, useEffect, useRef, useState } from 'react'
import { getOrderTracking } from '../services/orderTracking.service'

const terminalStatuses = new Set(['DELIVERED', 'CANCELLED', 'FAILED'])

export function useOrderTracking(orderId, pollInterval = 30000) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')
  const mounted = useRef(true)

  const fetchTracking = useCallback(async (quiet = false) => {
    if (!quiet) setLoading(true); else setRefreshing(true)
    setError('')
    try { const result = await getOrderTracking(orderId); if (mounted.current) setData(result) }
    catch (caught) { if (mounted.current) setError(caught.message === 'ORDER_NOT_FOUND' ? 'We could not find this order.' : 'Tracking could not be loaded. Please try again.') }
    finally { if (mounted.current) { setLoading(false); setRefreshing(false) } }
  }, [orderId])

  useEffect(() => {
    mounted.current = true
    getOrderTracking(orderId)
      .then((result) => { if (mounted.current) setData(result) })
      .catch((caught) => { if (mounted.current) setError(caught.message === 'ORDER_NOT_FOUND' ? 'We could not find this order.' : 'Tracking could not be loaded. Please try again.') })
      .finally(() => { if (mounted.current) setLoading(false) })
    return () => { mounted.current = false }
  }, [orderId])

  useEffect(() => {
    if (!data || terminalStatuses.has(data.status)) return undefined
    const interval = window.setInterval(() => fetchTracking(true), pollInterval)
    return () => window.clearInterval(interval)
  }, [data, fetchTracking, pollInterval])

  return { data, loading, refreshing, error, retry: fetchTracking }
}
