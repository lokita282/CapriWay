import httpcommon from '../httpcommon'

export const addUser = (data) => {
  return httpcommon.post(`/user/`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
    },
  })
}

export const getNormalUsers = () => {
  return httpcommon.get(`/accounts/view-store/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
    },
  })
}

export const getDesignerUsers = () => {
  return httpcommon.get(`/accounts/view-designers/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
    },
  })
}
