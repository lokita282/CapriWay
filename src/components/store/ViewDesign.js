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
  IconButton,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useNavigate } from 'react-router'
import Carousel from 'react-material-ui-carousel'
import { link, btn_bank, df_jc_ac, circularprog } from '../../theme/CssMy'
import { Icon } from '@iconify/react'
import { buyDesign, paymentConfirmation, updateLikes } from '../../services/storeServices'
import successHandler from '../toasts/successHandler'
import errorHandler from '../toasts/errorHandler'

const PostedDesigns = () => {
  const navigate = useNavigate()
  const [designs, setDesigns] = useState()
  const [isHovered, setIsHovered] = useState(false)
  const [load, setLoad] = useState(false)
  const [json, setJson] = useState()
  const [state, setState] = useState(false)
  const [liked, setLiked] = useState(false)


    const handleMouseOver = () => {
      setIsHovered(true)
    }

    const handleMouseOut = () => {
      setIsHovered(false)
    }
  
  const handleLike = async (id) => {
     await updateLikes({design_id: id})
       .then((res) => {
         console.log('first')
         console.log(res.data)
         setState(!state)
         setLiked(res.data.status)
        //  successHandler('User created!')
        //  setLoad(false)
       })
       .catch((e) => {
         console.log(e)
         errorHandler('failed')
       })
  }

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
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {designs
          ? designs.map((design) => {
              return (
                <>
                  <Grid item xs={4}>
                    <Card
                      sx={{ maxWidth: 345, height: 450 }}
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      {design.isPremium ? (
                        <CardMedia
                          sx={{ height: 230 }}
                          image={design._image}
                          title={design.title}
                          style={{
                            filter: 'blur(5px)',
                            '-webkitFilter': 'blur(5px)',
                            '-moz-filter': 'blur(5px)',
                            '-o-filter': 'blur(5px)',
                            '-ms-filter': 'blur(5px)',
                          }}
                        >
                          <Carousel
                            autoPlay={true}
                            swipe={true}
                            indicators={false}
                            cycleNavigation={true}
                            interval={5000}
                            animation="fade"
                          >
                            {design.items.map((item, i) => (
                              <Item
                                key={i}
                                item={item}
                                i={i === 0 ? true : false}
                              />
                            ))}
                          </Carousel>
                        </CardMedia>
                      ) : (
                        <CardMedia
                          sx={{ height: 230 }}
                          image={design._image}
                          title={design.title}
                        >
                          <Carousel
                            autoPlay={true}
                            swipe={true}
                            indicators={false}
                            cycleNavigation={true}
                            interval={5000}
                            animation="fade"
                          >
                            {design.items.map((item, i) => (
                              <Item
                                key={i}
                                item={item}
                                i={i === 0 ? true : false}
                              />
                            ))}
                          </Carousel>
                        </CardMedia>
                      )}
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {design.title}
                        </Typography>
                        <Grid
                          container
                          spacing={{ xs: 2, md: 3 }}
                          columns={{ xs: 4, sm: 8, md: 12 }}
                        >
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
                      {/* {isHovered ? (
                        <CardActions>
                          <Grid item xs={1}>
                            <IconButton
                              aria-label="add to favorites"
                              onClick={() => handleLike(design.design_id)}
                            >
                              {design.status ? (
                                <FavoriteIcon sx={{ color: '#E8425B' }} />
                              ) : (
                                <FavoriteIcon />
                              )}
                            </IconButton>
                          </Grid>
                          <Grid item xs={1}>
                            <Typography variant="body1" color="initial">
                              {design.likes_count}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body1" color="initial">
                              Rs. {design.price}
                            </Typography>
                          </Grid>
                          <Grid item xs={5}>
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
                          <Grid item xs={3}>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() =>
                                navigate(`/design/${design.design_id}`)
                              }
                            >
                              View
                            </Button>
                          </Grid>
                        </CardActions>
                      ) : ( */}
                      <CardActions>
                        <Grid item xs={1}>
                          <IconButton
                            aria-label="add to favorites"
                            onClick={() => handleLike(design.design_id)}
                          >
                            {design.status ? (
                              <FavoriteIcon sx={{ color: '#E8425B' }} />
                            ) : (
                              <FavoriteIcon />
                            )}
                          </IconButton>
                        </Grid>
                        <Grid item xs={1}>
                          <Typography variant="body1" color="initial">
                            {design.likes_count}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1" color="initial">
                            Rs. {design.price}
                          </Typography>
                        </Grid>
                        <Grid item xs={5} align="center">
                          {design.isPremium ? (
                            <Button
                              sx={{ margin: '0.4em' }}
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
                              sx={{ margin: '0.4em' }}
                              variant="contained"
                            >
                              <Link sx={link} href={design.asset}>
                                Download
                              </Link>
                            </Button>
                          )}
                          {/* <Grid item xs={5}> */}
                          {design.isPremium ? (
                            <Button
                              variant="contained"
                              color="primary"
                              disabled
                              onClick={() =>
                                navigate(`/design/${design.design_id}`)
                              }
                            >
                              View
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() =>
                                navigate(`/design/${design.design_id}`)
                              }
                            >
                              View
                            </Button>
                          )}
                          {/* </Grid> */}
                        </Grid>
                      </CardActions>
                      {/* ) */}
                      {/* } */}
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

function Item(props) {
  return (
    <>
      <Box
        sx={{
          // margin: 0,
          // padding: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        alignItems="center"
        justify="center"
        backgroundColor="#cccccc"
      >
        {/* <CardMedia
          component="img"
          
          // sx={{ height: '100vh' }}
        /> */}
        <img src={props.item.img} width="60%" alt="" style={{marginLeft: 'auto', marginRight: 'auto',  display: 'block'}} />
      </Box>
    </>
  )
}

export default PostedDesigns
