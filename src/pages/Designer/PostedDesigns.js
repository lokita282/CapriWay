import { React, useState, useEffect } from 'react'
import SideDrawer from '../../components/sidebar/Sidebar'
import { postedDesigns } from '../../services/designerServices'
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
  Box, Button,
} from '@mui/material'
import Fuse from 'fuzzy-search'
import { df_jc_ac, textField } from '../../theme/CssMy'

const styles = {
  gradientText: {
    background: 'radial-gradient( #7E8AFF, #375EC0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: 'Poppins',
    padding: '15px 0px',
  },
}

const PostedDesigns = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [designs, setDesigns] = useState()
  const [showMore, setShowMore] = useState(false)
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    const func = async () => {
      try {
        await postedDesigns().then((res) => {
          console.log(res.data.tags)
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
          <Typography style={styles.gradientText} variant="h4" color="initial">
            <b>View all posted designs</b>
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
                            sx={{ height: 200 }}
                            image={design._image}
                            // title={design.title}
                          />
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
        {/* {designs ? designs.map((design) => {
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
                    </CardContent>
                    <CardActions>
                    </CardActions>
                  </Card>
                </Grid>
              </>
            )
          }): ('Loading...')} */}
      </Grid>
    </SideDrawer>
  )
}

export default PostedDesigns
