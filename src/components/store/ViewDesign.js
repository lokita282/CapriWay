import { React, useState, useEffect } from 'react'
import { viewAllDesigns } from '../../services/storeServices'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  Chip,
  Link,
  Box,
  CircularProgress,
} from '@mui/material'
import { link, btn_bank, df_jc_ac, circularprog } from '../../theme/CssMy'
import { Icon } from '@iconify/react'
import { buyDesign, paymentConfirmation } from '../../services/storeServices'
import successHandler from '../toasts/successHandler'
import errorHandler from '../toasts/errorHandler'

const PostedDesigns = () => {
  const isPaid = JSON.parse(localStorage.getItem('capriwayPaidUser'))
  const [designs, setDesigns] = useState()
  const [load, setLoad] = useState(false)
  const [json, setJson] = useState()
  const [state, setState] = useState(false)

  const handleSetData = (design) => {
    setJson({
      design_id: design.design_id,
      amount: design.price,
      name: JSON.parse(localStorage.getItem('capriwayUsername')),
      email: JSON.parse(localStorage.getItem('capriwayUserEmail')),
    })
  }

  const displayRazorpay = async() => {
     await buyDesign(json)
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
             }
             await paymentConfirmation(data).then(async (res) => {
               successHandler('Design bought')
             })
             setState(!state)
             console.log(state)
           },
           prefill: {
             name: '',
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
        errorHandler('Buying design failed')
        setLoad(false)
      })  
  }

  useEffect(() => {
    const func = async () => {
      try {
        await viewAllDesigns()
          .then((res) => {
            console.log(res.data.tags)
            setDesigns(res.data)
          })
      } catch (error) {
        console.log(error)
      }
    }
    func()
  }, [state])

  return (
    <>
    <Grid container spacing={2}>
      {designs
        ? designs.map((design) => {
            return (
              <>
                <Grid item xs={4}>
                  <Card sx={{ maxWidth: 345 }}>
                    {design.isPremium ? (
                      <CardMedia
                        sx={{ height: 140 }}
                        image={design._image}
                        title="green iguana"
                        style={{
                          filter: 'blur(5px)',
                          '-webkitFilter': 'blur(5px)',
                          '-moz-filter': 'blur(5px)',
                          '-o-filter': 'blur(5px)',
                          '-ms-filter': 'blur(5px)',
                        }}
                      />
                    ) : (
                      <CardMedia
                        sx={{ height: 140 }}
                        image={design._image}
                        title="green iguana"
                      />
                    )}
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {design.title}
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={10.5}>
                          {design.tags.tags.tags
                            ? design.tags.tags.tags.map((tag) => {
                                return (
                                  <Chip
                                    label={tag}
                                    sx={{ marginRight: '1em' }}
                                  />
                                )
                              })
                            : 'Loading...'}
                        </Grid>
                        <Grid item xs={1.5}>
                          {design.isPremium === true ? (
                            <Icon
                              icon="fa6-solid:crown"
                              color="#FCEA2B"
                              width="26"
                              height="26"
                              style={{ stroke: 'black', strokeWidth: '5' }}
                            />
                          ) : (
                            ''
                          )}
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <Grid item xs={8}>
                        <Typography variant="body1" color="initial">
                          Rs. {design.price}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        {design.isPremium ? (
                          <Button
                            sx={{ float: 'right', marginRight: '0.4em' }}
                            variant="contained"
                            onMouseEnter={() => {
                              handleSetData(design)
                            }}
                            onClick={() => {
                              displayRazorpay()
                            }}
                          >
                            Buy
                          </Button>
                        ) : (
                          <Button
                            sx={{ float: 'right', marginRight: '0.4em' }}
                            variant="contained"
                          >
                            <Link sx={link} href={design.asset}>
                              Download
                            </Link>
                          </Button>
                        )}
                      </Grid>
                    </CardActions>
                  </Card>
                </Grid>
              </>
            )
          })
        : 'Loading...'}
    </Grid>
    </>
  )
}

export default PostedDesigns
