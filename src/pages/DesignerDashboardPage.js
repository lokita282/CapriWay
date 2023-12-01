import {React, useState, useEffect} from 'react'
import {Grid, Typography, Paper, Box} from '@mui/material'
import designer from '../images/designerdash.png' 
import chest from '../images/chest.png' 
import sold from '../images/sold.png' 
import unsold from '../images/unsold.png' 
import approve from '../images/approve.png' 
import pending from '../images/pending.png' 
import reject from '../images/reject.png' 
import {dashboardStats} from '../services/designerServices'

const styles = {
  gradientText: {
    background: 'radial-gradient( #7E8AFF, #375EC0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: 'Poppins',
    padding: '80px 15px',

    fontWeight: 500
  },
  gradientText2: {
    background: 'radial-gradient( #7E8AFF, #375EC0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: 'Poppins',
    // padding: '80px 10px',
    fontWeight: 500
  },
  paperContainer: {
    borderRadius: '30px',
    boxShadow: '0px 1px 10px rgba(94, 99, 116, 0.21)',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 30px',
    minHeight: '250px',
    justifyContent: "center",
    alignItems: "center",
    // width: '0%',
  },
}

const DesignerDashboardPage = () => {
  const user = JSON.parse(localStorage.getItem('capriwayUsername'))

  const [data, setData] = useState()

  useEffect(() => {
    const func = async () => {
      try {
        await dashboardStats().then((res) => {
          console.log(res.data)
          setData(res.data)
          // console.log(data)
        })
      } catch (error) {
        console.log(error)
      }
    }
    func()
  
    
  }, [])
  

  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ marginBottom: '1em' }}
      >
        {data ? (
          <>
            <Grid item xs={7} md={6}>
              <Paper style={styles.paperContainer}>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item xs={7} md={6}>
                    <Typography
                      sx={{ typography: { sm: 'h4', xs: 'h5' } }}
                      color="initial"
                      style={styles.gradientText}
                    >
                      <b> Hi, {user} </b>
                    </Typography>
                  </Grid>
                  <Grid item xs={5} md={6} justifyContent="center">
                    <img src={designer} alt="designer" width="100%" />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={5} md={6}>
              <Paper style={styles.paperContainer}>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item xs={6} md={6}>
                    <img src={chest} width="80%" alt="chest" />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography
                      variant="h4"
                      color="initial"
                      style={styles.gradientText2}
                      align="center"
                    >
                      <b> {data.total_designs} </b>
                    </Typography>
                    <Typography
                      variant="h6"
                      color="#aeaeae"
                      // style={styles.gradientText2}
                      align="center"
                    >
                      <b> Total designs </b>
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={2.4} md={2.4}>
              <Paper style={styles.paperContainer}>
                <img src={approve} width="60%" alt="chest" />
                <Typography
                  variant="h4"
                  color="initial"
                  style={styles.gradientText2}
                  align="center"
                  sx={{ paddingTop: '0.5em' }}
                >
                  <b>{data.total_approved} </b>
                </Typography>
                <Typography
                  variant="h6"
                  color="#aeaeae"
                  // style={styles.gradientText2}
                  align="center"
                >
                  <b> Approved </b>
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={2.4} md={2.4}>
              <Paper style={styles.paperContainer}>
                <img src={pending} width="77%" alt="chest" />
                <Typography
                  variant="h4"
                  color="initial"
                  style={styles.gradientText2}
                  align="center"
                >
                  <b>{data.total_unapproved} </b>
                </Typography>
                <Typography
                  variant="h6"
                  color="#aeaeae"
                  // style={styles.gradientText2}
                  align="center"
                  sx={{ paddingBottom: '1em' }}
                >
                  <b> Unapproved </b>
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={2.4} md={2.4}>
              <Paper style={styles.paperContainer}>
                <img src={reject} width="60%" alt="chest" />
                <Typography
                  variant="h4"
                  color="initial"
                  style={styles.gradientText2}
                  align="center"
                  sx={{ paddingTop: '0.5em' }}
                >
                  <b>{data.total_rejected} </b>
                </Typography>
                <Typography
                  variant="h6"
                  color="#aeaeae"
                  // style={styles.gradientText2}
                  align="center"
                >
                  <b> Rejected </b>
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={2.4} md={2.4}>
              <Paper style={styles.paperContainer}>
                <img src={sold} width="60%" alt="chest" />
                <Typography
                  variant="h4"
                  color="initial"
                  style={styles.gradientText2}
                  align="center"
                  sx={{ paddingTop: '0.5em' }}
                >
                  <b>{data.total_sold} </b>
                </Typography>
                <Typography
                  variant="h6"
                  color="#aeaeae"
                  // style={styles.gradientText2}
                  align="center"
                >
                  <b> Sold </b>
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={2.4} md={2.4}>
              <Paper style={styles.paperContainer}>
                <img src={unsold} width="60%" alt="chest" />
                <Typography
                  variant="h4"
                  color="initial"
                  style={styles.gradientText2}
                  align="center"
                >
                  <b>{data.total_unsold} </b>
                </Typography>
                <Typography
                  variant="h6"
                  color="#aeaeae"
                  // style={styles.gradientText2}
                  align="center"
                >
                  <b> Unsold </b>
                </Typography>
              </Paper>
            </Grid>
          </>
        ) : (
          <Typography variant="body1" color="initial" sx={{ padding: '1em' }}>
            Loading...
          </Typography>
        )}
      </Grid>
    </>
  )
}

export default DesignerDashboardPage
