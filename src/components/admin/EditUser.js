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
import { editUser, getSingleUser } from '../../services/adminServices'

const EditUser = ({ userId, handleCloseEdit, state, setState }) => {
  const [user, setUser] = useState()
  // const [json, setJson] = useState({
  //   first_name: user.first_name,
  //   last_name: user.last_name,
  //   email: user.email,
  //   password: user.password,
  //   phone_number: user.phone_number,
  //   city: user.city,
  //   state: user.state,
  //   country: user.country,
  //   username: 'null',
  //   role: 'designer',
  //   is_staff: true,
  //   is_active: true,
  // })
  const [json, setJson] = useState({  })

  const [load, setLoad] = useState(false)

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setJson({ ...json, [name]: value })
    console.log(json)
  }

  const renderData = async () => {
    setState(!state)
  }

  const handleSubmit = async () => {
    setLoad(true)
    await editUser(userId, json)
      .then((res) => {
        console.log('first')
        console.log(res.data)
        successHandler('User updated!')
        setLoad(false)
      })
      .catch((e) => {
        console.log(e)
        errorHandler('Update user failed')
        setLoad(false)
      })
      await renderData()
      handleCloseEdit()
  }

  useEffect(() => {
    const func = async () => {
      try {
        await getSingleUser(userId).then((res) => {
          console.log(res.data)
          setUser(res.data)
          // use(res.data)
          //  setFilteredData(res.data)
          // console.log(users)
        })
      } catch (error) {
        console.log(error)
      }
    }
    func()
  }, [user])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} align="center">
        <Typography variant="h5" color="initial">
          Edit User
        </Typography>
      </Grid>
      {user ? (
        <>
          <Grid item xs={6}>
            <Typography variant="body1" color="initial">
              First Name
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id=""
              label=""
              defaultValue={user.first_name}
              name="first_name"
              // value={user.first_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="initial">
              Last Name
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id=""
              label=""
              defaultValue={user.last_name}
              name="last_name"
              // value={json.last_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="initial">
              Email
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id=""
              label=""
              defaultValue={user.email}
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="initial">
              Phone Number
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id=""
              label=""
              defaultValue={user.phone_number}
              name="phone_number"
              // value={json.phone_number}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="initial">
              City
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id=""
              label=""
              defaultValue={user.city}
              name="city"
              // value={json.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="initial">
              State
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id=""
              label=""
              defaultValue={user.state}
              name="state"
              // value={json.state}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="initial">
              Country
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id=""
              label=""
              defaultValue={user.country}
              name="country"
              // value={json.country}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}></Grid>
          <Grid item xs={6} align="right">
            {load ? (
              <Box sx={df_jc_ac}>
                <Button sx={btn_bank} onClick={handleSubmit}>
                  <CircularProgress size={15} sx={circularprog} />
                </Button>
              </Box>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Save
              </Button>
            )}
          </Grid>
        </>
      ) : (
        'Loading...'
      )}
    </Grid>
  )
}

export default EditUser
