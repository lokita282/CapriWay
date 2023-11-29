import React from 'react'
import SideDrawer from '../../components/sidebar/Sidebar'
import PaymentsTable from '../../components/admin/PaymentsTable'
import Typography from '@mui/material/Typography'

const styles = {
  gradientText: {
    background: 'radial-gradient( #7E8AFF, #375EC0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: 'Poppins',
    padding: '15px 0px',
  },
}

const ApproveDesign = () => {
  return (
    <SideDrawer>
      <Typography variant="h5" color="initial" style={styles.gradientText} sx={{mb: 1}}><b>View Payment Details here: </b></Typography>
            <PaymentsTable />
        </SideDrawer>
    
  )
}

export default ApproveDesign