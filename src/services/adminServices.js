import httpcommon from '../httpcommon'

export const addUser = (data) => {
  return httpcommon.post(`/user/`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
    },
  })
}
