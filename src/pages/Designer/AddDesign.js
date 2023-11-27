import React from 'react'
import { Grid, Typography } from '@mui/material'
import SideDrawer from '../../components/sidebar/Sidebar'
import AddDesignForm from '../../components/designer/AddDesignForm'

const AddDesign = () => {
  const user = JSON.parse(localStorage.getItem('capriwayUsername'))

  return (
    <>
    <SideDrawer>
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
      </SideDrawer>
    </>
  )
}

export default AddDesign
