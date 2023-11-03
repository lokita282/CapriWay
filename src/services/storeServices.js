import httpcommon from '../httpcommon'

export const viewAllDesigns = () => {
  return httpcommon.get(`/marketplace/shop/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
    },
  })
}
