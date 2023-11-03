import React from 'react'
import SideDrawer from '../../components/sidebar/Sidebar'
import  AddUserForm  from "../../components/admin/AddUserForm";

const AddUsers = () => {
  return (
    <SideDrawer>
            <AddUserForm />
        </SideDrawer>
    
  )
}

export default AddUsers