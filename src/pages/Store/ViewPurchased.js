import { React, useState, useEffect } from 'react'
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
  Link
} from '@mui/material'
import Fuse from 'fuzzy-search'
import { df_jc_ac, textField, link } from '../../theme/CssMy'

const columns = ['title', 'tags']

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
      <Grid container spacing={2}>
        {filteredData.length ? (
          <>
            <Grid item xs={12}>
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
            </Grid>
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
                                <Grid item xs={12} align="right">
                                  <Button
                              sx={{ float: 'right', marginRight: '0.4em' }}
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

export default ViewPurchased
