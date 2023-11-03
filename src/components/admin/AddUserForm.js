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
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  CircularProgress,
} from '@mui/material'
import { addUser } from '../../services/adminServices'
import successHandler from '../toasts/successHandler' 
import errorHandler from '../toasts/errorHandler'
// import ReCAPTCHA from 'react-google-recaptcha'

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
    username: '',
    password: '',
    role: '',
    is_staff: true,
    is_active: true,
  })

  const [role, setRole] = useState('')
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
    setLoad(true)
    await addUser(json)
      .then((res) => {
        console.log('first')
        console.log(res.data)
        successHandler('user created')
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
      spacing={0}
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
          <Grid item xs={6}>
            <TextField
              id="username"
              placeholder="Username"
              name="username"
              variant="outlined"
              value={json.username}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
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
              placeholder="Password"
              name="password"
              variant="outlined"
              value={json.password}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
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
                {/* <MenuItem value="admin">Admin</MenuItem> */}
                <MenuItem value="designer">Designer</MenuItem>
                <MenuItem value="store">Store</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex' }}>
            {/* <ReCAPTCHA
              sitekey="6LeuTKImAAAAAHGzGmP26m4V8IAO55NVL-Pc4EoO"
              onChange={onChangeCaptcha}
            /> */}
          </Grid>
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
