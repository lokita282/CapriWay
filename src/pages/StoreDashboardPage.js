import React from 'react'
import  ViewDesign  from "../components/store/ViewDesign"
import { Grid, Typography} from '@mui/material'

const StoreDashboardPage = () => {
  const user = JSON.parse(localStorage.getItem('capriwayUsername'))

  return (
    <>
    <Grid
      container
      spacing={2}
      sx={{  marginBottom: '1em' }}
    >
      <Grid item xs={12}>
        <Typography variant="h4" color="initial">
          Hi, {user}
        </Typography>
        <Typography variant="body1" color="initial">View all designs here</Typography>
      </Grid>
      </Grid>
  <ViewDesign />
  </>
  )
}

export default StoreDashboardPage
