import React from 'react'
import {Grid, Typography} from '@mui/material'
import  AddDesignForm  from "../components/designer/AddDesignForm";

const DesignerDashboardPage = () => {
  const user = JSON.parse(localStorage.getItem('capriwayUsername'))

  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: '1em' }}>
        <Grid item xs={12}>
          <Typography variant="h4" color="initial">
            Hi, {user}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" color="initial">
            Create a design here
          </Typography>
        </Grid>
      </Grid>
      <AddDesignForm />
    </>
  )
}

export default DesignerDashboardPage
