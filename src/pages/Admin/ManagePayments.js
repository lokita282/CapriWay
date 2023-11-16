import React from 'react'
import SideDrawer from '../../components/sidebar/Sidebar'
import PaymentsTable from '../../components/admin/PaymentsTable'
import Typography from '@mui/material/Typography'

const ApproveDesign = () => {
  return (
    <SideDrawer>
      <Typography variant="h5" color="initial" sx={{mb: 1}}>View Payment Details here: </Typography>
            <PaymentsTable />
        </SideDrawer>
    
  )
}

export default ApproveDesign