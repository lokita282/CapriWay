import httpcommon from '../httpcommon'

export const viewAllDesigns = () => {
  return httpcommon.get(`/marketplace/shop/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
    },
  })
}

export const viewPurchased = () => {
  return httpcommon.get(`/marketplace/shop/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
    },
  })
}
