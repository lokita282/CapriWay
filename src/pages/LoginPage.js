import { Box, CardMedia, Grid } from '@mui/material'
import React from 'react'
import Carousel from 'react-material-ui-carousel'
import img0 from '../images/login.png'
import Login from '../components/auth/Login'

function LoginPage() {

    var items = [
        {
            img: img0,
        }
    ]

    return (
        <Grid container>
            <Grid item md={5} sm={6} xs={0}>
                <Carousel
                    autoPlay={true}
                    swipe={true}
                    indicators={false}
                    cycleNavigation={true}
                    interval={2000}
                    animation='fade'
                >
                    {
                        items.map((item, i) => <Item key={i} item={item} i={i === 0 ? true : false} />)
                    }
                </Carousel>
            </Grid>
            <Grid item md={7} sm={6} xs={12} >
                <Login />
            </Grid>
        </Grid>
    )
}


function Item(props) {
    return (
        <>
            <Box sx={{ margin: 0, padding: 0 }} >
                <CardMedia component='img' image={props.item.img} sx={{ height: '100vh' }} />
            </Box>
        </>
    )
}

export default LoginPage