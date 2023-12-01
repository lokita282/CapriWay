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
  FormControlLabel,
  TextField,
  Button,
  Box,
  CircularProgress,
  Checkbox,
} from '@mui/material'
import axios from 'axios'
import Tags from './Tags'
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

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [assets, setAssets] = useState('')
  const [checked, setChecked] = useState(true)
  const [load, setLoad] = useState(false)
  const [tags, setTags] = useState([])

  const handleTags = (tagsFromChild) => {
    setTags(tagsFromChild)
    console.log(tags)
  }

  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
    console.log(e.target.value)
  }

  const handleChangeDescription = (e) => {
    setDescription(e.target.value)
    console.log('desc')
    console.log(e.target.value)
  }

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  const handleSubmit = async () => {
    setLoad(true)

    const formdata = new FormData()
    formdata.append('_image', image)
    formdata.append('assets', assets)  
    formdata.append('title', title)
    formdata.append('description', description)
    formdata.append('tags', JSON.stringify({ tags: { tags: tags } }))
    formdata.append('uploaderEmail', localStorage.getItem('capriwayUserEmail').replace(/['"]+/g, ''))
    formdata.append('uploaderName', localStorage.getItem('capriwayUsername').replace(/['"]+/g, ''))
    formdata.append('isPremium', checked)

    axios
      .post(
        'https://649a-2405-201-6-41fd-1854-edd6-954d-a719.ngrok-free.app/marketplace/upload-design/',
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('capriwayToken')}`,
          },
        }
      )
      .then((response) => {
        console.log('Upload successful', response.data)
        successHandler('Design uploaded successfully!')
        setLoad(false)
      })
      .catch((error) => {
        console.log('error', error)
        errorHandler('Design upload failed')
        setLoad(false)
      })      
  }

    const handleUploadImage = (e) => {
      console.log(e.target.files[0])
      console.log(e.target.files)
      setImage(e.target.files)
     }

    const handleUploadAssets = (e) => {
      console.log(e.target.files[0])
      setAssets(e.target.files[0])
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
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          style={styles.gridContainer}
        >
          <Grid item xs={6}>
            <TextField
              id="title"
              placeholder="Title"
              name="title"
              variant="outlined"
              fullWidth
              onChange={handleChangeTitle}
            />
          </Grid>
          <Grid item xs={6}>
            <Tags handleTags={handleTags} />
          </Grid>

          <Grid item xs={1.5}>
            Upload Image:
          </Grid>
          <Grid item xs={4.5} sx={{ paddingBottom: '20px' }}>
            <TextField id="file" onChange={handleUploadImage} type="file" inputProps={{multiple: true}}/>
          </Grid>
          <Grid item xs={1.5}>
            Upload Assets:
          </Grid>
          <Grid item xs={4.5} sx={{ paddingBottom: '20px' }}>
            <TextField id="file" onChange={handleUploadAssets} type="file" />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="description"
              placeholder="Description"
              name="description"
              variant="outlined"
              fullWidth
              multiline
              onChange={handleChangeDescription}
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
