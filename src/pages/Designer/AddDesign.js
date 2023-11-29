import React from 'react'
import { Grid, Typography } from '@mui/material'
import SideDrawer from '../../components/sidebar/Sidebar'
import AddDesignForm from '../../components/designer/AddDesignForm'

const styles = {
  gradientText: {
    background: 'radial-gradient( #7E8AFF, #375EC0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: 'Poppins',
    padding: '15px 0px',
  },
}

const AddDesign = () => {

  return (
    <>
      <SideDrawer>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ marginBottom: '1em' }}
        >
          <Grid item xs={12}>
            <Typography style={styles.gradientText} variant="h4" color="initial">
              <b>Create a design here</b>
            </Typography>
          </Grid>
        </Grid>
        <AddDesignForm />
      </SideDrawer>
    </>
  )
}

export default AddDesign
