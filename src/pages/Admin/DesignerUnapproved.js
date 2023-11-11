import {React, useState, useEffect} from 'react'
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
  Avatar
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import {getUnapprovedDesignsOfDesigner} from '../../services/adminServices'

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
        spacing={2}
        sx={{ height: '80vh', padding: '0', margin: '0' }}
      >
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
                            <Btn display={display} id={design.design_id} />
                            <IconButton aria-label="add to favorites">
                              <FavoriteIcon />
                            </IconButton>
                            <Typography variant="body1" color="initial">
                              {design.likes}
                            </Typography>
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
                            <IconButton aria-label="add to favorites">
                              <FavoriteIcon />
                            </IconButton>
                            <Typography variant="body1" color="initial">
                              {design.likes}
                            </Typography>
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
        {/* <Button
        variant="text"
        color="primary"
        onClick={() => {
          // navigate(`/designer-unapproved/${userId}`)
          navigate(`/designer-unapproved/1`)
        }}
      >
        View
      </Button> */}
      </Grid>
    </SideDrawer>
  )
}

export default DesignerUnapproved
