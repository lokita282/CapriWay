import { Box, Button, CircularProgress, Grid, Switch, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { bold_name, btn_connect, circularprog, df_jc_ac, df_jfs_ac, df_jfs_ac_fdc, link, ptag, textField } from '../../theme/CssMy'
import { useNavigate } from 'react-router'
import { login } from '../../services/userServices'
import { capriwaycontext } from '../../context/MainContext'
import successHandler from '../toasts/successHandler'
import errorHandler from '../toasts/errorHandler'

export default function Login() {
    const navigate = useNavigate()
    const { user, setUser, token, setToken } = useContext(capriwaycontext)
    const [load, setLoad] = useState(false)
    const [json, setJson] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setJson({ ...json, [name]: value });
    }

    const clickSubmit = async () => {
      setLoad(true)
      if (json.email && json.password) {
          await login(json)
              .then((res) => {
                  console.log(res.data)
                  localStorage.setItem('capriwayToken', res.data.access)
                  localStorage.setItem('capriwayUser', JSON.stringify(res.data.role))
                  localStorage.setItem('capriwayUserEmail', JSON.stringify(res.data.email))
                  localStorage.setItem('capriwayPaidUser', JSON.stringify(res.data.paid))
                  localStorage.setItem('capriwayUsername', JSON.stringify(res.data.name))
                  setUser(JSON.stringify(res.data.role))
                  setToken(res.data.access)
                  successHandler('Logged in successfully')
                  navigate('/')
                  setLoad(false)
              }).catch((e) => {
                console.log(e)
                  errorHandler('Login failed')
                  setLoad(false)
              })
      } else {
          !json.phone && errorHandler('Phone number cannot be empty')
          !json.password && errorHandler('Password cannot be empty')
          setLoad(false)
      }
    }

    return (
        <>
            <Box sx={{ ...df_jfs_ac, height: '100%', padding: '0 15%' }}>
                <Box sx={{ ...df_jfs_ac_fdc, width: '100%' }}>
                    <Grid container rowSpacing={3}>
                        <Grid item md={12}>
                            <Typography variant='h5' sx={{ ...bold_name }}>Welcome back!</Typography>
                        </Grid>
                        <Grid item md={12}>
                            <p style={ptag}>Email</p>
                            <TextField value={json.email} name='email' onChange={handleChange} sx={textField} placeholder='Email' />
                        </Grid>
                        <Grid item md={12}>
                            <p style={ptag}>Password</p>
                            <TextField sx={textField} type='password' value={json.password} name='password' onChange={handleChange} placeholder='Password' />
                        </Grid>
                        <Grid item md={12}>
                            {load ? <Box sx={df_jc_ac}>
                                <CircularProgress size={30} sx={circularprog} />
                            </Box> :
                                <Button sx={btn_connect} onClick={clickSubmit} >Login</Button>}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}
