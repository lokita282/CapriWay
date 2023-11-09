import React from 'react'
import {Tabs, Tab, Typography, Box} from '@mui/material';
import PropTypes from 'prop-types'
import SideDrawer from '../../components/sidebar/Sidebar'
import NormalUsersTable from '../../components/admin/NormalUsersTable'
import DesignerUsersTable from '../../components/admin/DesignerUsersTable'
import  AddUserForm  from "../../components/admin/AddUserForm";


function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}


const AddUsers = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    <SideDrawer>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        centered
        sx={{ width: '90vw' }}
      >
        <Tab label="Normal Users" {...a11yProps(0)} />
        <Tab label="Designer Users" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <NormalUsersTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DesignerUsersTable />
      </TabPanel>
      <AddUserForm />
    </SideDrawer>
  )
}

export default AddUsers