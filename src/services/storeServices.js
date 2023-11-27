import httpcommon from '../httpcommon'

export const viewAllDesigns = () => {
  return httpcommon.get(`/marketplace/shop/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
    },
  })
}

export const resetPassword = (data) => {
  return httpcommon.patch(`/accounts/set_password`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
    },
  })
}

export const buyDesign = (data) => {
  return httpcommon.post(`/marketplace/design_pay/`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
    },
  })
}

export const paymentConfirmation = (data) => {
  return httpcommon.post(`/marketplace/payment-status/`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
    },
  })
}

export const viewPurchased = () => {
  return httpcommon.get(`/marketplace/owned/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
    },
  })
}


export const buySubscription = (data) => {
  return httpcommon.post(`/marketplace/subscription_payment/`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
    },
  })
}


export const paymentConfirmationSubscription = (data) => {
  return httpcommon.post(`/marketplace/subscription-status/`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
    },
  })
}

export const updateLikes = (data) => {
  return httpcommon.post(`/marketplace/like/`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
    },
  })
}

export const viewOneDesign = (id) => {
  return httpcommon.get(`/marketplace/shop/?design_id=${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
    },
  })
}
