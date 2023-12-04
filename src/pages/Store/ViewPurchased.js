import { React, useState, useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import SideDrawer from '../../components/sidebar/Sidebar'
import { viewPurchased } from '../../services/storeServices'
import { Icon } from '@iconify/react'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Grid,
  Chip,
  InputAdornment,
  TextField,
  Box,
  Button,
  Link,
} from '@mui/material'
import Fuse from 'fuzzy-search'
import { df_jc_ac, textField, link } from '../../theme/CssMy'

const columns = ['title', 'tags']

const styles = {
  gradientText: {
    background: 'radial-gradient( #7E8AFF, #375EC0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: 'Poppins',
    padding: '15px 0px',
  }}

const ViewPurchased = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [designs, setDesigns] = useState()
  const [showMore, setShowMore] = useState(false)
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    const func = async () => {
      try {
        await viewPurchased().then((res) => {
          setDesigns(res.data)
          setFilteredData(res.data)
          console.log(designs)
        })
      } catch (error) {
        console.log(error)
      }
    }
    func()
  }, [])

  const handleSearch = (event) => {
    const { value } = event.target
    setSearchTerm(value)

    if (value === '') {
      setFilteredData(designs)
    } else {
      const fuse = new Fuse(designs, ['title', 'tags'], {
        caseSensitive: false,
      })
      const results = fuse.search(value)
      setFilteredData(results)
    }
  }

  return (
    <SideDrawer>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={12}>
          <Typography style={styles.gradientText} variant="h6" color="initial">
            View purchased designs here
          </Typography>
        </Grid>
        {filteredData.length ? (
          <>
            {/* <Grid item xs={12}>
              <Box sx={{ padding: '2% 20%' }}>
                <TextField
                  value={searchTerm}
                  sx={textField}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon icon="ic:round-search" width={22} height={22} />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search schemes"
                  onChange={handleSearch}  
                />
              </Box>
            </Grid> */}
            {designs
              ? designs.map((design) => {
                  return (
                    <>
                      <Grid item xs={4}>
                        <Card sx={{ maxWidth: 345 }}>
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
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {design.title}
                            </Typography>
                            {/* {design.description ? (
                              showMore ? (
                                <Typography variant="body1" color="initial">
                                  {design.description}
                                </Typography>
                              ) : (
                                <>
                                  <Typography
                                    variant="body1"
                                    color="initial"
                                    display="inline"
                                  >
                                    {design.description.substring(0, 100)}...
                                  </Typography>
                                  <Button
                                    variant="text"
                                    color="black"
                                    onClick={() => {
                                      setShowMore(true)
                                    }}
                                  >
                                    Read More
                                  </Button>
                                </>
                              )
                            ) : (
                              ''
                            )} */}
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
                                    style={{
                                      stroke: 'black',
                                      strokeWidth: '5',
                                    }}
                                  />
                                ) : (
                                  ''
                                )}
                                <Grid item xs={12} align="right">
                                  <Button
                                    sx={{
                                      float: 'right',
                                      marginRight: '0.4em',
                                    }}
                                    variant="contained"
                                  >
                                    <Link sx={link} href={design.asset}>
                                      Download
                                    </Link>
                                  </Button>
                                </Grid>
                              </Grid>
                            </Grid>
                          </CardContent>
                          <CardActions></CardActions>
                        </Card>
                      </Grid>
                    </>
                  )
                })
              : 'Loading...'}
          </>
        ) : (
          <Box sx={{ ...df_jc_ac, height: '80vh' }}>{/* <Loading /> */}</Box>
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
        backgroundColor="#cccccc"
      >
        {/* <CardMedia
          component="img"
          
          // sx={{ height: '100vh' }}
        /> */}
        <img
          src={props.item.img}
          width="60%"
          alt=""
          style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
        />
      </Box>
    </>
  )
}

export default ViewPurchased
