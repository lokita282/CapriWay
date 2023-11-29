import { React, useState } from 'react'
import {
  btn_bank,
  circularprog,
  df_jc_ac,
} from '../../theme/CssMy'
import {
  Paper,
  Typography,
  Grid,
  FormControl,
  TextField,
  Select,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  MenuItem,
  Button,
  Box,
  CircularProgress,
} from '@mui/material'
import { addUser } from '../../services/adminServices'
import successHandler from '../toasts/successHandler' 
import errorHandler from '../toasts/errorHandler'

const styles = {
  paperContainer: {
    borderRadius: '10px',
    boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.21)',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 30px',
    width: '70%',
  },
  gradientText: {
    background: 'radial-gradient( #7E8AFF, #375EC0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: 'Poppins',
    padding: '15px 0px',
  },
  createBtn: {
    background: 'radial-gradient( #7E8AFF, #375EC0)',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    marginTop: 20,
    borderRadius: '5px',
    width: '10%',
    height: '50%',
    fontFamily: 'Poppins',
  },
  gridContainer: {
    marginTop: 7,
  },
}

const AddUserForm = () => {
  const [json, setJson] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number: '',
    city: '',
    state: '',
    country: '',
    username: '',
    role: 'designer',
    is_staff: true,
    is_active: true,
  })

  const [role, setRole] = useState('designer')
  const [load, setLoad] = useState(false)

  const handleChangeRole = (event) => {
    setRole(event.target.value)
    const name = event.target.name
    const value = event.target.value
    setJson({ ...json, [name]: value })
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setJson({ ...json, [name]: value })
    console.log(json)
  }

  const handleSubmit = async () => {
    if (json.username === "") {
      json.username = json.email
    }
    setLoad(true)
    console.log(json)
    await addUser(json)
      .then((res) => {
        console.log('first')
        console.log(res.data)
        successHandler('User created!')
        setLoad(false)
      })
      .catch((e) => {
        console.log(e)
        errorHandler('Create user failed')
        setLoad(false)
      })
  }

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Paper style={styles.paperContainer}>
        <Typography variant="h6" style={styles.gradientText}>
          <b>Create User</b>
        </Typography>
        <Grid container spacing={2} style={styles.gridContainer}>
          <Grid item xs={6}>
            <TextField
              id="fname"
              placeholder="First Name"
              name="first_name"
              variant="outlined"
              fullWidth
              value={json.first_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="lname"
              placeholder="Last Name"
              name="last_name"
              variant="outlined"
              value={json.last_name}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          {/* <Grid item xs={6}>
            <TextField
              id="username"
              placeholder="Username"
              name="username"
              variant="outlined"
              value={json.username}
              onChange={handleChange}
              fullWidth
            />
          </Grid> */}
          <Grid item xs={6}>
            <TextField
              id="email"
              placeholder="Email"
              name="email"
              variant="outlined"
              value={json.email}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              variant="outlined"
              value={json.password}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="phone_number"
              placeholder="Phone Number"
              name="phone_number"
              variant="outlined"
              value={json.phone_number}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="city"
              placeholder="City"
              name="city"
              variant="outlined"
              value={json.city}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="state"
              placeholder="State"
              name="state"
              variant="outlined"
              value={json.state}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="country"
              placeholder="Country"
              name="country"
              variant="outlined"
              value={json.country}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          {/* <Grid item xs={6}>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                placeholder="Role of user"
                value={role}
                displayEmpty
                label="Age"
                name="role"
                onChange={handleChangeRole}
              >
                <MenuItem value="">Role</MenuItem>
                <MenuItem value="designer">Designer</MenuItem>
                <MenuItem value="store">Store</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
          <Grid item xs={3.5}>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Role:
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={role}
                onChange={handleChangeRole}
                defaultChecked
                sx={{ display: 'flex', flexDirection: 'row' }}
              >
                <FormControlLabel
                  value="designer"
                  name="role"
                  control={<Radio />}
                  label="Designer"
                />
                <FormControlLabel
                  value="store"
                  name="role"
                  control={<Radio />}
                  label="Normal User"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            {role === 'store' ? (
              <TextField
                id="storeName"
                placeholder="Store Name"
                name="storeName"
                value={json.storeName}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            ) : (
              ''
            )}
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex' }}></Grid>
          <Grid item xs={6}></Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              justifyContent: 'end',
              paddingBottom: '20px',
            }}
          >
            {load ? (
              <Box sx={df_jc_ac}>
                <Button sx={btn_bank} onClick={handleSubmit}>
                  <CircularProgress size={15} sx={circularprog} />
                </Button>
              </Box>
            ) : (
              <Button sx={btn_bank} onClick={handleSubmit}>
                Create
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default AddUserForm
