import {React, useState} from 'react'
import { styled } from '@mui/material/styles'
import {Grid, Typography, Card, CardHeader, Avatar, CardMedia, CardContent, CardActions, Button, Box, CardActionArea} from '@mui/material'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useNavigate } from 'react-router'
import { Icon } from '@iconify/react'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'

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

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

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

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))


const AdminDashboardPage = () => {
  const [expanded, setExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [display, setDisplay] = useState('notdisplayed')


  const handleMouseOver = () => {
    console.log('in')
    setIsHovered(true)
  }

  const handleMouseOut = () => {
    setIsHovered(false)
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{ height: '80vh', padding: '0', margin: '0' }}
    >
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
            title="Design a"
            subheader="September 14, 2023"
          />
          <CardActionArea>
            {isHovered ? (
              <CardContent sx={{ minHeight: '220px' }}>
                <Box ml={2}>
                  <CardMedia
                    component="img"
                    height="194"
                    image="/static/images/cards/design.jpg"
                    alt="design a"
                  />
                </Box>
                <CardActions>
                  <Btn display={display} id={1}/>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <Typography variant="body1" color="initial">
                    233
                  </Typography>
                </CardActions>
              </CardContent>
            ) : (
              <CardContent sx={{ minHeight: '220px' }}>
                <Box ml={2}>
                  <CardMedia
                    component="img"
                    height="194"
                    image="/static/images/cards/paella.jpg"
                    alt="design a "
                  />
                </Box>
                <CardActions>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <Typography variant="body1" color="initial">
                    233
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
    </Grid>
  )
}

export default AdminDashboardPage

