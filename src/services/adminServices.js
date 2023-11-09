import httpcommon from '../httpcommon'

export const addUser = (data) => {
  return httpcommon.post(`/user/`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
    },
  })
}

export const editUser = (id, data) => {
  return httpcommon.patch(`/user/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
    },
  })
}

export const getSingleUser = (id) => {
  return httpcommon.get(`/user/${id}/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
    },
  })
}

export const deleteUser = (id) => {
  console.log('from services')
  console.log(id)
  return httpcommon.delete(`/user/${id}/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
    },
  })
}

export const getNormalUsers = () => {
  return httpcommon.get(`/accounts/store/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
    },
  })
}

export const getDesignerUsers = () => {
  return httpcommon.get(`/accounts/designers/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
    },
  })
}
