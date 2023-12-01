import {React, useState, useEffect} from 'react'
import SideDrawer from '../../components/sidebar/Sidebar'
import { Grid, Typography, Paper, Button, Box, Link } from '@mui/material'
import Carousel from 'react-material-ui-carousel'

import {link} from '../../theme/CssMy'
import {getOneDesign} from '../../services/adminServices'
import {viewOneDesign} from '../../services/storeServices'

const ViewOneDesign = () => {
  const id = window.location.href.split('/')[4]
  const [design, setDesign] = useState()
  const isAdmin = JSON.parse(localStorage.getItem('capriwayUser')) === 'admin' ? true : false

  useEffect(() => {
    const func = async () => {
      if (isAdmin){
        try {
          await getOneDesign(id).then((res) => {
            console.log(res.data)
            setDesign(res.data[0])
          })
        } catch (error) {
          console.log(error)
        }
      } else{
        try {
          await viewOneDesign(id).then((res) => {
            console.log(res.data)
            setDesign(res.data[0])
          })
        } catch (error) {
          console.log(error)
        }
      }
      
    }
    func()
  
    
  }, [])
  
  
  return (
    <SideDrawer>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {design ? (
          <>
            <Grid item xs={12}>
              <Paper sx={{ padding: 3, borderRadius: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body1" color="initial">
                      Name: {design.uploaderName}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" color="initial" align="right">
                      Likes: {design.likes_count}{' '}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={6} alignItems="center">
              <Paper sx={{ padding: 3, borderRadius: 3, minHeight: '100%' }}>
                {/* <img
                  src={design._image}
                  alt={design.title}
                  style={{ margin: 'auto' }}
                  width="100%"
                /> */}
                <Carousel
                  autoPlay={true}
                  swipe={true}
                  indicators={false}
                  cycleNavigation={true}
                  interval={5000}
                  animation="fade"
                >
                  {design.items.map((item, i) => (
                    <Item key={i} item={item} i={i === 0 ? true : false} />
                  ))}
                </Carousel>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper sx={{ padding: 3, borderRadius: 3 }}>
                <Typography variant="h5" color="initial" align="center">
                  <b>{design.title}</b>
                </Typography>
                <Typography variant="body1" color="initial">
                  {design.description}
                </Typography>
                <Box textAlign="center">
                  <Button variant="contained" color="primary" align="center">
                    <Link sx={link} href={design.asset}>
                      Download
                    </Link>
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </>
        ) : (
          'Loading...'
        )}
      </Grid>
    </SideDrawer>
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
          width="80%"
          alt=""
          style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
        />
      </Box>
    </>
  )
}

export default ViewOneDesign
