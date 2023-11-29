import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import SideDrawer from '../../components/sidebar/Sidebar'
import {
  Button,
  Grid,
  Card,
  CardHeader,
  Typography,
  Box,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Avatar,
  Chip,
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Icon } from '@iconify/react'
import { getUnapprovedDesignsOfDesigner } from '../../services/adminServices'

const styles = {
  gradientText: {
    background: 'radial-gradient( #7E8AFF, #375EC0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: 'Poppins',
    padding: '15px 0px',
  },
}

const Btn = ({ display, id }) => {
  const navigate = useNavigate()
  return (
    <div className={display}>
      <Button
        // style={{
        //   position: 'absolute',
        //   top: '50%',
        //   left: '50%',
        //   transform: 'translate(-50%, -50%)',
        // }}
        variant="contained"
        onClick={() => {
          navigate(`/designer-unapproved/design/${id}`)
        }}
      >
        View
      </Button>
    </div>
  )
}

const DesignerUnapproved = () => {
  const id = window.location.href.split('/')[4]
  const [isHovered, setIsHovered] = useState(false)
  const [display, setDisplay] = useState('notdisplayed')

  const [designs, setDesigns] = useState()

  const handleMouseOver = () => {
    setIsHovered(true)
  }

  const handleMouseOut = () => {
    setIsHovered(false)
  }

  useEffect(() => {
    const func = async () => {
      try {
        await getUnapprovedDesignsOfDesigner(id).then((res) => {
          console.log(res.data)
          setDesigns(res.data)
        })
      } catch (error) {
        console.log(error)
      }
    }
    func()
  }, [])

  const navigate = useNavigate()
  return (
    <SideDrawer>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        // sx={{ height: '80vh', padding: '0', margin: '0' }}
      >
        <Grid item xs={12}>
          <Typography variant="h5" color="initial" style={styles.gradientText}>
            <b>Unapproved designs:</b>
          </Typography>
        </Grid>
        {/* <Paper sx={{ padding: 3, borderRadius: 3, marginBottom: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1" color="initial">
                Name: {user._first_name}
              </Typography>
            </Grid>
            <Grid item xs={2} align="center">
              <Typography variant="body1" color="initial">
                Total pending reviews: {user.unapproved_designs}
              </Typography>
            </Grid>
            <Grid item xs={2} align="center">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setUserId(user.id)
                  handleOpenView()
                }}
              >
                Designer details
              </Button>
            </Grid>
            <Grid item xs={2} align="center">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  navigate(`/designer-unapproved/${user.id}`)
                }}
              >
                Review
              </Button>
            </Grid>
          </Grid>
        </Paper> */}
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
                      avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                          R
                        </Avatar>
                      }
                      title={design.title}
                      // subheader="September 14, 2023"
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
                            {/* <IconButton aria-label="add to favorites">
                              <FavoriteIcon />
                            </IconButton> */}
                            {/* <Typography variant="body1" color="initial">
                              {design.likes}
                            </Typography> */}
                            <Grid item xs={10.5}>
                              {design.tags.tags.tags
                                ? design.tags.tags.tags.map((tag) => {
                                    return (
                                      <Chip
                                        label={tag}
                                        sx={{ marginLeft: '1em' }}
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
                                  style={{
                                    stroke: 'black',
                                    strokeWidth: '5',
                                  }}
                                />
                              ) : (
                                ''
                              )}
                            </Grid>
                            <Btn display={display} id={design.design_id} />
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
                            {/* <IconButton aria-label="add to favorites">
                              <FavoriteIcon />
                            </IconButton> */}
                            {/* <Typography variant="body1" color="initial">
                              {design.likes}
                            </Typography> */}
                            <Grid item xs={10.5}>
                              {design.tags.tags.tags
                                ? design.tags.tags.tags.map((tag) => {
                                    return (
                                      <Chip
                                        label={tag}
                                        sx={{ marginLeft: '1em' }}
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
                                  style={{
                                    stroke: 'black',
                                    strokeWidth: '5',
                                  }}
                                />
                              ) : (
                                ''
                              )}
                            </Grid>
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
    </SideDrawer>
  )
}

export default DesignerUnapproved
