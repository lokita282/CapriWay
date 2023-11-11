import { React, useState, useEffect } from 'react'
import SideDrawer from '../../components/sidebar/Sidebar'
import { getOneDesign } from '../../services/adminServices'
import { Grid, Paper, Typography, Box, Button, Modal, TextField } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: 5,
}

const ApproveSingleDesign = () => {
  const id = window.location.href.split('/')[4]
  const [design, setDesign] = useState()
  const [json, setJson] = useState()
  const [openApprove, setOpenApprove] = useState(false)
  const [openReject, setOpenReject] = useState(false)

  const handleOpenApprove = () => {
    // console.log(userId)
    setOpenApprove(true)
  }

  const handleCloseApprove = () => setOpenApprove(false)

  const handleOpenReject = () => {
    // console.log(userId)
    setOpenReject(true)
  }

  const handleCloseReject = () => setOpenReject(false)

   const handleChange = (e) => {
     const name = e.target.name
     const value = e.target.value
     setJson({ ...json, [name]: value })
     console.log(json)
   }

  // useEffect(() => {
  //   const func = async () => {
  //     try {
  //       await getOneDesign(id).then((res) => {
  //         console.log(res.data)
  //         setDesign(res.data[0])
  //       })
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   func()

  // }, [])

  return (
    <SideDrawer>
      <Grid container spacing={2}>
        {/* {design ? (
          <>
            <Grid item xs={12}>
              <Paper sx={{ padding: 3, borderRadius: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body1" color="initial">Name: {design.uploaderName}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" color="initial" align="right">Likes: {design.likes} </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper sx={{ padding: 3, borderRadius: 3, minHeight: '100%' }}>
                <img src={design._image} alt={design.title} />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper sx={{ padding: 3, borderRadius: 3 }}>
                <Typography variant="h5" color="initial" align="center"><b>{design.title}</b></Typography>
                <Typography variant="body1" color="initial">{design.description}</Typography>
                <Box textAlign='center'>
                <Button variant="contained" color="primary" align="center">
                  Download
                </Button>
                </Box>
              </Paper>
            </Grid>
          </>
        ) : (
          'Loading...'
        )} */}

        <Grid item xs={12}>
          <Paper sx={{ padding: 3, borderRadius: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1" color="initial">
                  {/* Name: {design.uploaderName} */}
                  name
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" color="initial" align="right">
                  {/* Likes: {design.likes} */}
                  Likes
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ padding: 3, borderRadius: 3 }}>
            {/* <img src={design._image} alt={design.title} /> */}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ padding: 3, borderRadius: 3 }}>
            <Typography variant="h5" color="initial" align="center">
              {/* <b>{design.title}</b> */}
              title
            </Typography>
            <Typography variant="body1" color="initial">
              {/* {design.description} */}
              desc
            </Typography>
            <Box textAlign="center">
              <Button variant="contained" color="primary" align="center">
                Download
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="primary"
            sx={{
              margin: 2,
              backgroundColor: 'green',
              '&:hover': {
                backgroundColor: 'green',
              },
            }}
            onClick={handleOpenApprove}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              margin: 2,
              backgroundColor: 'red',
              '&:hover': {
                backgroundColor: 'red',
              },
            }}
            onClick={handleOpenReject}
          >
            Reject
          </Button>
        </Grid>
      </Grid>

      {/* Approve design Modal */}
      <Modal
        open={openApprove}
        onClose={handleCloseApprove}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" color="initial" align="center">
                Approve Design
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1" color="initial">
                Set the price for the design:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id=""
                label=""
                type="number"
                // value=''
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} align="right" sx={{ marginRight: 2 }}>
              <Button variant="contained" color="primary">
                Confirm
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      {/* Reject design Modal */}
      <Modal
        open={openReject}
        onClose={handleCloseReject}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" color="initial" align="center">
                Reject Design
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1" color="initial">
              Are you sure you want to reject this design?
              </Typography>
            </Grid>
            <Grid item xs={12} align="right" sx={{ marginRight: 2 }}>
              <Button variant="contained" color="primary">
                Reject
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </SideDrawer>
  )
}

export default ApproveSingleDesign
