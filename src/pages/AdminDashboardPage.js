import {React, useState, useEffect} from 'react'
import { styled } from '@mui/material/styles'
import {Grid, Typography, Card, CardHeader, Avatar, CardMedia, CardContent, CardActions, Button, Box, CardActionArea} from '@mui/material'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useNavigate } from 'react-router'
import { Icon } from '@iconify/react'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {getAllDesigns} from '../services/adminServices'

const styles = {
  paperContainer: {
    height: '525px',
    borderRadius: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    textAlign: 'left',
    verticalAlign: 'middle',
    backgroundColor: '#f5f5f5',
  },
  paperContainerAnalysis: {
    height: '500px',
    borderRadius: '10px',
    boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.21)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  gradientText: {
    background: 'radial-gradient( #7E8AFF, #375EC0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: 'Poppins',
  },
  gradientTextH2: {
    background: 'radial-gradient( #7E8AFF, #375EC0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    paddingLeft: 20,
    fontFamily: 'Poppins',
  },
  paperContainerCharts: {
    height: '500px',
    borderRadius: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',
    verticalAlign: 'middle',
    boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.21)'
  },
  payBtn: {
    background: 'radial-gradient( #7E8AFF, #375EC0)',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    marginTop: 20,
    borderRadius: '20px',
    width: '30%',
    height: '10.5%',
    fontFamily: 'Poppins',
  },
}

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
  const [expanded, setExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [display, setDisplay] = useState('notdisplayed')
  const [designs, setDesigns] = useState()

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
        <Typography variant="h6" style={styles.gradientText}  color="initial">
          View all designs here
        </Typography>
        <Typography variant="body1" color="initial"></Typography>
      </Grid>
      {designs
        ? designs.map((design) => {
            return (
              <Grid item xs={4}>
                <Card
                  sx={{ maxWidth: 345 }}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  <CardHeader
                    title={design.title}
                    subheader={design.isPremium ? 'Premium' : 'Free'}
                  />
                  <CardActionArea>
                    {isHovered ? (
                      <CardContent sx={{ minHeight: '220px' }}>
                        <Box ml={2}>
                          <CardMedia
                            component="img"
                            height="194"
                            image={design._image}
                            alt={design.title}
                          />
                        </Box>
                        <CardActions>
                          <Btn display={display} id={design.design_id} />
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
                    ) : (
                      <CardContent sx={{ minHeight: '220px' }}>
                        <Box ml={2}>
                          <CardMedia
                            component="img"
                            height="194"
                            image={design._image}
                            alt={design.title}
                          />
                        </Box>
                        <CardActions>
                          <Typography variant="body1" color="initial">
                            Rs. {design.price}
                          </Typography>
                          {/* <IconButton
                            aria-label="add to favorites"
                            sx={{ marginLeft: 'auto' }}
                          >
                            <FavoriteIcon />
                          </IconButton>
                          <Typography variant="body1" color="initial">
                            {design.likes_count}
                          </Typography> */}
                        </CardActions>
                      </CardContent>
                    )}
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

export default AdminDashboardPage

