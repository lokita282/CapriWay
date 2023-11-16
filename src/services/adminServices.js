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

export const getAllDesigns = () => {
  return httpcommon.get(`/marketplace/admin_view`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
    },
  })
}

export const getOneDesign = (id) => {
  return httpcommon.get(`/marketplace/admin_view/?design_id=${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
    },
  })
}

export const getUnapprovedDesigns = () => {
  return httpcommon.get(`marketplace/admin_user_pending/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
    },
  })
}

export const getUnapprovedDesignsOfDesigner = (id) => {
  return httpcommon.get(`marketplace/admin_specific_pending/?id=${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
    },
  })
}

export const updateDesignStatus = (id, data) => {
  return httpcommon.patch(`/marketplace/admin_view/?design_id=${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
    },
  })
}

export const getTransactions = () => {
  return httpcommon.get(`marketplace/transactions`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
    },
  })
}