import httpcommon from '../httpcommon'

// export const uploadDesign = (data) => {
//   return httpcommon.post(`/upload-design/`, data, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
//     },
//   })
// }

export const postedDesigns = () => {
  return httpcommon.get(`/marketplace/upload-design/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
    },
  })
}
