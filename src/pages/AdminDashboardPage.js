import {React, useState, useEffect} from 'react'
import { styled } from '@mui/material/styles'
import {Grid, Typography, Card, CardHeader, Paper, CardMedia, CardContent, CardActions, Button, Box, CardActionArea} from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useNavigate } from 'react-router'
import { Icon } from '@iconify/react'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {getAllDesigns, getStats} from '../services/adminServices'
import sold from '../images/sold.png' 
import unsold from '../images/unsold.png' 
import approve from '../images/approve.png' 
import pending from '../images/pending.png' 
import reject from '../images/reject.png' 

const styles = {
  gradientText: {
    background: 'radial-gradient( #7E8AFF, #375EC0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: 'Poppins',
    // padding: '80px 15px',

    fontWeight: 500,
  },
  gradientText2: {
    background: 'radial-gradient( #7E8AFF, #375EC0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: 'Poppins',
    // padding: '80px 10px',
    fontWeight: 500,
  },
  paperContainer: {
    borderRadius: '30px',
    boxShadow: '0px 1px 10px rgba(94, 99, 116, 0.21)',
    display: 'flex',
    flexDirection: 'column',
    // padding: '10px 30px',
    minHeight: '250px',
    justifyContent: 'center',
    alignItems: 'center',
    // width: '0%',
  },
  paperContainer1: {
    borderRadius: '30px',
    boxShadow: '0px 1px 10px rgba(94, 99, 116, 0.21)',
    display: 'flex',
    flexDirection: 'column',
    // padding: '10px 30px',
    minHeight: '200px',
    justifyContent: 'center',
    alignItems: 'center',
    // width: '0%',
  },
}
// const styles = {
//   paperContainer: {
//     height: '525px',
//     borderRadius: '30px',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//     textAlign: 'left',
//     verticalAlign: 'middle',
//     backgroundColor: '#f5f5f5',
//   },
//   paperContainerAnalysis: {
//     height: '500px',
//     borderRadius: '10px',
//     boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.21)',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     textAlign: 'center',
//     verticalAlign: 'middle',
//   },
//   gradientText: {
//     background: 'radial-gradient( #7E8AFF, #375EC0)',
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//     fontFamily: 'Poppins',
//   },
//   gradientTextH2: {
//     background: 'radial-gradient( #7E8AFF, #375EC0)',
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//     paddingLeft: 20,
//     fontFamily: 'Poppins',
//   },
//   paperContainerCharts: {
//     height: '500px',
//     borderRadius: '10px',
//     justifyContent: 'center',
//     alignItems: 'center',
//     textAlign: 'left',
//     verticalAlign: 'middle',
//     boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.21)'
//   },
//   payBtn: {
//     background: 'radial-gradient( #7E8AFF, #375EC0)',
//     color: '#fff',
//     padding: '10px 20px',
//     border: 'none',
//     cursor: 'pointer',
//     marginTop: 20,
//     borderRadius: '20px',
//     width: '30%',
//     height: '10.5%',
//     fontFamily: 'Poppins',
//   },
// }

// interface ExpandMoreProps extends IconButtonProps {
//   expand: boolean;
// }

const Btn = ({ display, id }) => {
  const navigate = useNavigate()
  return (
    <div className={display}>
      <Button
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        variant="contained"
        onClick={() => {navigate(`/design/${id}`)}}
      >
        View
      </Button>
    </div>
  )
}

// const ExpandMore = styled((props: ExpandMoreProps) => {
//   const { expand, ...other } = props
//   return <IconButton {...other} />
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }))


const AdminDashboardPage = () => {
  const navigate = useNavigate()

  const [expanded, setExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [display, setDisplay] = useState('notdisplayed')
  const [designs, setDesigns] = useState()
  const [stats, setStats] = useState()

  const user = JSON.parse(localStorage.getItem('capriwayUsername'))


  const handleMouseOver = () => {
    console.log('in')
    setIsHovered(true)
  }

  const handleMouseOut = () => {
    setIsHovered(false)
  }

  useEffect(() => {
    const func = async () => {
      try {
        await getStats().then((res) => {
          console.log(res.data)
          setStats(res.data)
        })
        await getAllDesigns().then((res) => {
          console.log(res.data)
          setDesigns(res.data)
          console.log(designs)
        })
      } catch (error) {
        console.log(error)
      }
    }
    func()
  }, [])
  

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      sx={{ height: '80vh', padding: '0', margin: '0' }}
    >
      <Grid item xs={12}>
        <Typography variant="h4" style={styles.gradientText} color="initial">
          <b>Hi, {user} </b>
        </Typography>
        <Typography variant="h5" style={styles.gradientText} color="initial">
          <b>View all stats here</b>
        </Typography>
      </Grid>
      {stats ? (
        <>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              style={styles.gradientText}
              color="initial"
            >
              Total Users: {stats.total_users}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Paper style={styles.paperContainer1}>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={6} alignItems="center" justifyContent="center">
                  <Grid item xs={6} alignItems="center" justifyContent="center">
                    <Typography
                      variant="h4"
                      color="initial"
                      style={styles.gradientText2}
                      align="center"
                      sx={{
                        paddingTop: '0.5em',
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        display: 'block',
                      }}
                      fullWidth
                    >
                      <b>{stats.total_approved} </b>
                    </Typography>
                  </Grid>
                  <Typography
                    variant="h6"
                    color="#aeaeae"
                    // style={styles.gradientText2}
                    align="center"
                  >
                    <b> Designers </b>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Icon
                    color={'#aeaeae'}
                    icon="fluent-emoji-high-contrast:artist"
                    width="100"
                    height="100"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper style={styles.paperContainer1}>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={6} alignItems="center" justifyContent="center">
                  <Grid item xs={6} alignItems="center" justifyContent="center">
                    <Typography
                      variant="h4"
                      color="initial"
                      style={styles.gradientText2}
                      align="center"
                      sx={{
                        paddingTop: '0.5em',
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        display: 'block',
                      }}
                      fullWidth
                    >
                      <b>{stats.total_shops} </b>
                    </Typography>
                  </Grid>
                  <Typography
                    variant="h6"
                    color="#aeaeae"
                    // style={styles.gradientText2}
                    align="left"
                    sx={{ paddingLeft: '1.5em' }}
                  >
                    <b> Shops </b>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Icon
                    color={'#aeaeae'}
                    icon="lets-icons:shop"
                    width="100"
                    height="100"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper style={styles.paperContainer1}>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={6} alignItems="center" justifyContent="center">
                  <Grid item xs={6} alignItems="center" justifyContent="center">
                    <Typography
                      variant="h4"
                      color="initial"
                      style={styles.gradientText2}
                      align="center"
                      sx={{
                        paddingTop: '0.5em',
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        display: 'block',
                      }}
                      fullWidth
                    >
                      <b>{stats.total_paid} </b>
                    </Typography>
                  </Grid>
                  <Typography
                    variant="h6"
                    color="#aeaeae"
                    // style={styles.gradientText2}
                    align="left"
                    sx={{ paddingLeft: '1.5em' }}
                  >
                    <b> Paid shops </b>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Icon
                    color={'#aeaeae'}
                    icon="ic:round-paid"
                    width="100"
                    height="100"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper style={styles.paperContainer1}>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={6} alignItems="center" justifyContent="center">
                  <Grid item xs={6} alignItems="center" justifyContent="center">
                    <Typography
                      variant="h4"
                      color="initial"
                      style={styles.gradientText2}
                      align="center"
                      sx={{
                        paddingTop: '0.5em',
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        display: 'block',
                      }}
                      fullWidth
                    >
                      <b>{stats.total_unpaid} </b>
                    </Typography>
                  </Grid>
                  <Typography
                    variant="h6"
                    color="#aeaeae"
                    // style={styles.gradientText2}
                    align="left"
                    sx={{ paddingLeft: '1.5em' }}
                  >
                    <b>Unpaid Shops </b>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Icon
                    color={'#aeaeae'}
                    icon="game-icons:buy-card"
                    width="100"
                    height="100"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="h6"
              style={styles.gradientText}
              color="initial"
            >
              Total Designs: {stats.total_designs}  
            </Typography>
          </Grid>
          <Grid item xs={2.4} md={2.4}>
            <Paper style={styles.paperContainer}>
              <img src={approve} width="50%" alt="chest" />
              <Typography
                variant="h4"
                color="initial"
                style={styles.gradientText2}
                align="center"
                sx={{ paddingTop: '0.5em' }}
              >
                <b>{stats.total_approved} </b>
              </Typography>
              <Typography
                variant="h6"
                color="#aeaeae"
                // style={styles.gradientText2}
                align="center"
              >
                <b> Approved </b>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={2.4} md={2.4}>
            <Paper style={styles.paperContainer}>
              <img src={pending} width="52%" alt="chest" />
              <Typography
                variant="h4"
                color="initial"
                style={styles.gradientText2}
                align="center"
                sx={{ paddingTop: '0.5em' }}
              >
                <b>{stats.total_unapproved} </b>
              </Typography>
              <Typography
                variant="h6"
                color="#aeaeae"
                // style={styles.gradientText2}
                align="center"
                sx={{ paddingBottom: '1em' }}
              >
                <b> Unapproved </b>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={2.4} md={2.4}>
            <Paper style={styles.paperContainer}>
              <img src={reject} width="50%" alt="chest" />
              <Typography
                variant="h4"
                color="initial"
                style={styles.gradientText2}
                align="center"
                sx={{ paddingTop: '0.5em' }}
              >
                <b>{stats.total_rejected} </b>
              </Typography>
              <Typography
                variant="h6"
                color="#aeaeae"
                // style={styles.gradientText2}
                align="center"
              >
                <b> Rejected </b>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={2.4} md={2.4}>
            <Paper style={styles.paperContainer}>
              <img src={sold} width="50%" alt="chest" />
              <Typography
                variant="h4"
                color="initial"
                style={styles.gradientText2}
                align="center"
                sx={{ paddingTop: '0.5em' }}
              >
                <b>{stats.total_sold} </b>
              </Typography>
              <Typography
                variant="h6"
                color="#aeaeae"
                // style={styles.gradientText2}
                align="center"
              >
                <b> Sold </b>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={2.4} md={2.4}>
            <Paper style={styles.paperContainer}>
              <img src={unsold} width="50%" alt="chest" />
              <Typography
                variant="h4"
                color="initial"
                style={styles.gradientText2}
                align="center"
              >
                <b>{stats.total_unsold} </b>
              </Typography>
              <Typography
                variant="h6"
                color="#aeaeae"
                // style={styles.gradientText2}
                align="center"
              >
                <b> Unsold </b>
              </Typography>
            </Paper>
          </Grid>
        </>
      ) : (
        'Loading...'
      )}

      <Grid item xs={12}>
        <Typography variant="h5" style={styles.gradientText} color="initial">
          <b>View all designs here</b>
        </Typography>
      </Grid>

      {designs
        ? designs.map((design) => {
            return (
              <Grid item xs={4}>
                <Card
                  sx={{ maxWidth: 345, height: 450 }}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                  onClick={() => {
                    navigate(`/design/${design.design_id}`)
                  }}
                >
                  <CardHeader
                    title={design.title}
                    subheader={design.isPremium ? 'Premium' : 'Free'}
                  />
                  <CardActionArea>
                    <CardContent sx={{ minHeight: '220px' }}>
                      <Box ml={2}>
                        <CardMedia
                          // component="img"
                          sx={{ height: 290 }}
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
                      </Box>
                      <CardActions>
                        {/* <Btn display={display} id={design.design_id} /> */}
                        <Typography variant="body1" color="initial">
                          Rs. {design.price}
                        </Typography>
                        {/* <IconButton
                            aria-label="add to favorites"
                            sx={{ marginLeft: 'auto' }}
                          >
                            <FavoriteIcon />
                          </IconButton> */}
                        {/* <Typography variant="body1" color="initial">
                            {design.likes_count}
                          </Typography> */}
                      </CardActions>
                    </CardContent>
                    {/* )} */}
                  </CardActionArea>
                  {/* <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <Typography variant="body1" color="initial">233</Typography>
          </CardActions> */}
                </Card>
              </Grid>
            )
          })
        : 'Loading...'}
    </Grid>
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
        // backgroundColor="#cccccc"
      >
        {/* <CardMedia
          component="img"
          
          // sx={{ height: '100vh' }}
        /> */}
        <img
          src={props.item.img}
          width="90%"
          alt=""
          style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
        />
      </Box>
    </>
  )
}

export default AdminDashboardPage

