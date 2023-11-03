import {React, useState, useEffect} from 'react'
import SideDrawer from '../../components/sidebar/Sidebar'
import {postedDesigns} from '../../services/designerServices'
import { Icon } from '@iconify/react'
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Grid, Chip } from '@mui/material'

const PostedDesigns = () => {

  const [designs, setDesigns] = useState()

  useEffect(() => {
    const func = async () => {
      try {
        await postedDesigns().then((res) => {
          // res.data.tags.tags.tags.pop()
          console.log(res.data.tags)
          setDesigns(res.data)
          console.log(designs)
          // designs.map((design) => {
          //   // console.log()
          //   design.tags.tags.tags.pop()
          // })
        })
      } catch (error) {
        console.log(error)
      }
      
    }
    func()
  }, [])

  return (
    <SideDrawer>
      <Grid container spacing={2}>
      {designs ? designs.map((design) => {
            return (
              <>
                <Grid item xs={4}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      sx={{ height: 140 }}
                      image="/static/images/cards/contemplative-reptile.jpg"
                      title="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {design.title}
                      </Typography>
                      {/* <Typography variant="body2" color="text.secondary"> */}
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
                      {/* {console.log('jikcfj akcCM V')}
                        {console.log(design.tags.tags.tags)} */}
                      {/* </Typography> */}
                    </CardContent>
                    <CardActions>
                      <Grid xs={8}> </Grid>
                      <Grid xs={4}>
                        <Button
                          sx={{ float: 'right', marginRight: '0.4em' }}
                          variant="contained"
                        >
                          Buy
                        </Button>
                      </Grid>
                    </CardActions>
                  </Card>
                </Grid>
              </>
            )
          }): ('Loading...')}
    </Grid>
    </SideDrawer>
  )
}

export default PostedDesigns
