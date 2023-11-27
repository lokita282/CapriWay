import {React, useState} from 'react'
import { Grid, Typography, Button, TextField} from '@mui/material'
import  ViewDesign  from "../components/store/ViewDesign"
import successHandler from '../components/toasts/successHandler'
import errorHandler from '../components/toasts/errorHandler'
import {buySubscription, paymentConfirmationSubscription, resetPassword} from '../services/storeServices'

const StoreDashboardPage = () => {
  const user = JSON.parse(localStorage.getItem('capriwayUsername'))
  const isPaid = JSON.parse(localStorage.getItem('capriwayPaidUser'))
  const changedPass= JSON.parse(localStorage.getItem('capriwayChangedPass'))

  const [load, setLoad] = useState(false)
  const [password, setPassword] = useState()
  const [state, setState] = useState(false)

  const json = {
    amount: 1000,
  }

  const displayRazorpay = async () => {
    await buySubscription(json)
      .then(async (res) => {
        console.log('first')
        console.log(res.data)

        const options = {
          key: 'rzp_test_HJtppEK315iHxh',
          currency: 'INR',
          amount: 100,
          name: 'Design Payment',
          description: 'Design Payment',
          image:
            'https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/raml2xzpwgc9tpomgaxd',
          subscription_id: res.data.subscription_id,
          handler: async function (response) {
            console.log(response)
            //  alert(response.razorpay_payment_id)
            //  alert(response.razorpay_order_id)
            //  alert(response.razorpay_signature)
            const data = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_subscription_id: response.razorpay_subscription_id,
              razorpay_signature: response.razorpay_signature,
              email: JSON.parse(localStorage.getItem('capriwayUserEmail')),
            }
            await paymentConfirmationSubscription(data).then(async (res) => {
              localStorage.setItem('capriwayPaidUser', JSON.stringify(true))
              successHandler('Membership bought')
            })
            setState(!state)
            console.log(state)
          },
          prefill: {
            name: JSON.parse(localStorage.getItem('capriwayUser')),
            email: JSON.parse(localStorage.getItem('capriwayUserEmail')),
            contact: '',
          },
        }

        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
        setLoad(false)
      })
      .catch((e) => {
        console.log(e)
        errorHandler('Buying membership failed')
        setLoad(false)
      })
  }

  const handleSubmit = async () => {
    await resetPassword({password: password})
      .then((res) => {
        console.log('first')
        console.log(res.data)
        localStorage.setItem('capriwayChangedPass', JSON.stringify(true))
        successHandler('Password Updated!')
        setLoad(false)
        window.location.reload()
      })
      .catch((e) => {
        console.log(e)
        errorHandler('Reset password failed')
        setLoad(false)
      })
  }

  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: '1em' }}>
        <Grid item xs={12}>
          <Typography variant="h4" color="initial">
            Hi, {user}
          </Typography>
        </Grid>
      </Grid>
      {isPaid ? (
        changedPass ? (
          <>
            <Grid container spacing={2} sx={{ marginBottom: '1em' }}>
              <Grid item xs={12}>
                <Typography variant="body1" color="initial">
                  View all designs here
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <ViewDesign />
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" color="initial">
                  Before proceeding, please reset your password
                </Typography>
              </Grid>

              <Grid item xs={1} align="center">
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ paddingTop: '1em' }}
                >
                  Password:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  variant="outlined"
                  // value={json.password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: '1em' }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </>
        )
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="body1" color="initial">
                Please complete your payment to access the designs.
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                // onMouseEnter={() => {
                //   handleSetData(design)
                // }}
                onClick={() => {
                  displayRazorpay()
                }}
              >
                Pay
              </Button>
            </Grid>

            {/* <Grid item xs={12}>
              <Typography variant="body1" color="initial">change pass</Typography>
            </Grid> */}
          </Grid>
        </>
      )}
    </>
  )
}

export default StoreDashboardPage
