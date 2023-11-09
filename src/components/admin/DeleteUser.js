import { React, useState } from 'react'
import { Grid, Button, Typography } from '@mui/material'
import { btn_bank, circularprog, df_jc_ac } from '../../theme/CssMy'
import successHandler from '../toasts/successHandler'
import errorHandler from '../toasts/errorHandler'
import { deleteUser } from '../../services/adminServices'

const DeleteUser = ({ userId, handleCloseDelete, state, setState }) => {
  const [load, setLoad] = useState(false)

  const renderData = async () => {
    setState(!state)
  }

  const handleSubmit = async () => {
    setLoad(true)
    await deleteUser(userId)
      .then((res) => {
        console.log('delete')
        successHandler('User deleted!')
        setLoad(false)
      })
      .catch((e) => {
        console.log(e)
        errorHandler('Delete user failed')
        setLoad(false)
      })
    await renderData()
    handleCloseDelete()
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} align="center">
          <Typography variant="h5" color="initial">
            Delete User
          </Typography>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={3}>
          <Button
            onClick={handleCloseDelete}
            variant="contained"
            color="primary"
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'red',
              '&:hover': {
                backgroundColor: 'red',
              },
            }}
            onClick={() => handleSubmit()}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default DeleteUser
