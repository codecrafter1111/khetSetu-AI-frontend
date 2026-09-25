import { farmPassport } from '../../features/consumer/data/farmPassport.mock'
import { apiRequest } from '../apiClient'

// The local record keeps the passport usable while the Django endpoint is being built.
export function getFarmPassport() {
  return farmPassport
}

export function fetchFarmPassport() {
  return apiRequest('/consumer/farm-passport/')
}
