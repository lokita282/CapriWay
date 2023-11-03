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
  Checkbox,
} from '@mui/material'
import { uploadDesign } from '../../services/designerServices'
import Tags from './Tags'
import successHandler from '../toasts/successHandler' 
import errorHandler from '../toasts/errorHandler'
// import cloudinary from 'cloudinary'

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
    title: '',
    tags: {},
    _image: '',
    isPremium: false,
    uploaderEmail: localStorage.getItem('capriwayUserEmail')
  })
  

  const [title, setTitle] = useState('')
  const [file, setFile] = useState('')
  const [checked, setChecked] = useState(true)
  const [load, setLoad] = useState(false)
  const [tags, setTags] = useState([])

  const handleTags = (tagsFromChild) => {
    setTags(tagsFromChild)
    console.log(tags)
    setJson({ ...json, 'tags': {'tags':tags} })
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setJson({ ...json, [name]: value })
    console.log(json)
  }
  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
    console.log(e.target.value)
  }

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
    setJson({ ...json, 'isPremium': checked })
    console.log(json)
  }

  const handleSubmit = async () => {
    setLoad(true)
    // await uploadDesign(json)
    //   .then((res) => {
    //     console.log(json)
    //     console.log('first')
    //     console.log(res.data)
    //     successHandler(res.data.message)
    //     setLoad(false)
    //   })
    //   .catch((e) => {
    //     errorHandler('Create user failed')
    //     setLoad(false)
    //   })
    // console.log()
    var myHeaders = new Headers()
    myHeaders.append(
      'Authorization',
      `Bearer ${localStorage.getItem('capriwayToken')}`
    )
    // myHeaders.append('content-type', 'multipart/form-data')

    var formdata = new FormData()
    formdata.append('title', title)
    formdata.append(
      'tags',
      JSON.stringify({'tags': {'tags':tags}})
    )
    formdata.append('uploaderEmail', localStorage.getItem('capriwayUserEmail').replace(/['"]+/g, ''))
    formdata.append('isPremium', checked)
    formdata.append('_image', file, '[PROXY]')

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    }

    fetch(
      'https://ef34-2405-201-6-41fd-14b-fd60-18e6-5905.ngrok-free.app/marketplace/upload-design/',
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result)
        successHandler('Design uploaded successfully!')
        setLoad(false)
    })
      .catch((error) => console.log('error', error))
  }

    const handleUpload = (e) => {
      console.log(e.target.files)
      setFile(e.target.files[0])
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
          <b>Upload Design</b>
        </Typography>
        <Grid container spacing={2} style={styles.gridContainer}>
          <Grid item xs={6}>
            <TextField
              id="title"
              placeholder="Title"
              name="title"
              variant="outlined"
              fullWidth
              // value={json.title}
              // onChange={handleChange}
              onChange={handleChangeTitle}
            />
          </Grid>
          <Grid item xs={6}>
            <Tags handleTags={handleTags}/>
          </Grid>

          <Grid item xs={6} sx={{ paddingBottom: '20px' }}>
            <TextField
              id="file"
              // value={}
              onChange={handleUpload}
              type="file"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChecked}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label="Premium"
            />
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
                Upload
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default AddUserForm
