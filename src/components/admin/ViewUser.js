import { React, useState, useEffect } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  ListItemIcon,
  ListItemButton,
  Grid,
  Modal,
  Box,
  Button,
  Typography,
  CircularProgress,
  TextField,
} from '@mui/material'
import { btn_bank, circularprog, df_jc_ac } from '../../theme/CssMy'
import successHandler from '../toasts/successHandler'
import errorHandler from '../toasts/errorHandler'
import { getSingleUser } from '../../services/adminServices'

const ViewUser = ({ userId, handleCloseView, state, setState }) => {
  const [load, setLoad] = useState(false)
  const [user, setUser] = useState()

  useEffect(() => {
    const func = async () => {
      try {
        await getSingleUser(userId).then((res) => {
          console.log(res.data)
          setUser(res.data)
          //  setFilteredData(res.data)
          console.log(user)
        })
      } catch (error) {
        console.log(error)
      }
    }
    func()
  
    
  }, [])
  

  const renderData = async () => {
    setState(!state)
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} align="center">
          <Typography variant="h5" color="initial">
            View User
          </Typography>
        </Grid>
        {user ? (
          <>
            <Grid item xs={6}>
              First Name: {user.first_name}
            </Grid>
            {/* <Grid item xs={3}></Grid> */}

            <Grid item xs={6}>
              Last Name: {user.last_name}
            </Grid>

            <Grid item xs={12}>
              Email: {user.email}
            </Grid>

            <Grid item xs={6}>
              Phone: {user.phone_number}
            </Grid>

            <Grid item xs={6}>
              City: {user.city}
            </Grid>

            <Grid item xs={6}>
              State: {user.state}
            </Grid>

            <Grid item xs={6}>
              Country: {user.country}
            </Grid>

            {user.role === 'store' ? (
              <>
                <Grid item xs={6}>
                  <Typography variant="body1" color="initial">
                    Store Name: {user.storeName}
                  </Typography>
                </Grid>
              </>
            ) : (
              <></>
            )}

            <Grid item xs={6}></Grid>
            <Grid item xs={6} align="right">
              <Button
                onClick={handleCloseView}
                variant="contained"
                color="primary"
              >
                Close
              </Button>
            </Grid>
          </>
        ) : (
          'Loading...'
        )}
      </Grid>
    </div>
  )
}

export default ViewUser
