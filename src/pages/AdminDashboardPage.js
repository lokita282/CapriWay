import React from 'react'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import gipphy from '../images/dangerGif.svg'
import giphy from '../images/giphy.gif'
import { df_jfs_ac_fdc } from '../theme/CssMy'

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
    // display: 'flex',
    // flexDirection: 'column',
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

const AdminDashboardPage = () => {
  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: userscan,
  //   rendererSettings: {
  //     preserveAspectRatio: 'xMidYMid slice',
  //   },
  // }
  return (
    <Grid container spacing={2} sx={{ height: '80vh', padding: '0', margin: '0' }}>
      <Grid item xs={12} md={5} sx={df_jfs_ac_fdc}>
        <Paper style={styles.paperContainer} elevation={0}>
          <Typography variant="h2" style={styles.gradientText}>
            <b>Scan. Verify. Redeem.</b>
          </Typography>
          <Link style={{...styles.payBtn, width:'auto'}} to="">
            <Button sx={{ color: '#fff', fontFamily: 'Poppins', width:'auto' }}>
              <b>Get Started ➤</b>
            </Button>
          </Link>
        </Paper>
      </Grid>
      <Grid item xs={0} md={7} sx={{ padding: '0', position: 'relative', margin: '0', display: 'flex', justifyContent: 'flex-end' }}>
        <img style={{ marginTop: '-35px', height: '89vh' }} src={gipphy} />
        <img src={giphy} style={{ position: 'absolute', top: '165px', left: '150px' }} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" style={{ ...styles.gradientTextH2, marginTop: '10%' }}>
          <b>Transaction Overview </b>
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Paper style={styles.paperContainerAnalysis}>
          <Typography
            variant="h6"
            color="initial"
            sx={{ fontFamily: 'Poppins' }}
          >
            <b>Weekly Activity</b>
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={3}>
      </Grid>
      <Grid item xs={9}>
        <Paper style={styles.paperContainerAnalysis}>
          <Typography
            variant="h6"
            color="initial"
            sx={{ fontFamily: 'Poppins' }}
          >
            <b>Category vs Time Analysis</b>
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={3} sx={{ marginBottom: '10%' }}>
        <Paper style={styles.paperContainerCharts}>
          <Typography
            variant="h6"
            color="initial"
            sx={{ padding: 5, paddingBottom: 2, fontFamily: 'Poppins' }}
          >
            <b>Comparing Expenditure</b>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default AdminDashboardPage

