import {React, useState} from 'react'
import { Grid, Typography, Button} from '@mui/material'
import  ViewDesign  from "../components/store/ViewDesign"
import successHandler from '../components/toasts/successHandler'
import errorHandler from '../components/toasts/errorHandler'
import {buySubscription, paymentConfirmationSubscription} from '../services/storeServices'

const StoreDashboardPage = () => {
  const user = JSON.parse(localStorage.getItem('capriwayUsername'))
  const isPaid = JSON.parse(localStorage.getItem('capriwayPaidUser'))

  const [load, setLoad] = useState(false)
  // const [json, setJson] = useState({

  // })
  const [state, setState] = useState(false)

  // const json = {
  //   amount: 1000,
  //   name: JSON.parse(localStorage.getItem('capriwayUsername')),
  //   email: JSON.parse(localStorage.getItem('capriwayUserEmail')),
  // }
  const json = {
    amount: 1000,
  }

  // const handleSetData = (design) => {
  //   setJson({
  //     amount: 100000,
  //     name: JSON.parse(localStorage.getItem('capriwayUsername')),
  //     email: JSON.parse(localStorage.getItem('capriwayUserEmail')),
  //   })
  // }

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
          order_id: res.data.order_id,
          handler: async function (response) {
            console.log(response)
            //  alert(response.razorpay_payment_id)
            //  alert(response.razorpay_order_id)
            //  alert(response.razorpay_signature)
            const data = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
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
        <>
          <Typography variant="body1" color="initial">
            View all designs here
          </Typography>
          <ViewDesign />
        </>
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
          </Grid>
        </>
      )}
    </>
  )
}

export default StoreDashboardPage
