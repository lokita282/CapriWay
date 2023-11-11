import React from 'react'
import { useNavigate } from 'react-router'
import SideDrawer from '../../components/sidebar/Sidebar'
import Button from '@mui/material/Button'

const DesignerUnapproved = () => {
  const navigate = useNavigate()
  return (
    <SideDrawer>
      <div>DesignerUnapproved</div>
      <Button
        variant="text"
        color="primary"
        onClick={() => {
          // navigate(`/designer-unapproved/${userId}`)
          navigate(`/designer-unapproved/1`)
        }}
      >
        View
      </Button>
    </SideDrawer>
  )
}

export default DesignerUnapproved
