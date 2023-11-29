import {React, useState, useEffect} from 'react'
import { Grid, Typography, Paper, Button, Box, Modal } from '@mui/material'
import { useNavigate } from 'react-router'
import SideDrawer from '../../components/sidebar/Sidebar'
import ViewUser from '../../components/admin/ViewUser'
import {getUnapprovedDesigns} from '../../services/adminServices'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: 5,
}

const ApproveDesign = () => {
  const navigate = useNavigate()

  const [userId, setUserId] = useState(false)
  const [openView, setOpenView] = useState(false)
  const [state, setState] = useState(false)
  const [data, setData] = useState()

   const handleOpenView = () => {
     console.log('OPEN')
     console.log(userId)
     setOpenView(true)
   }

  const handleCloseView = () => setOpenView(false)

  useEffect(() => {
    const func = async () => {
      try {
        await getUnapprovedDesigns().then((res) => {
          console.log(res.data)
          setData(res.data)
        })
      } catch (error) {
        console.log(error)
      }
    }
    func() 
  }, [])
  

  return (
    <SideDrawer>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {data ? (
          <Grid item xs={12}>
            <Paper
              sx={{ padding: 3, borderRadius: 3, marginBottom: 10 }}
              align="center"
            >
              <Typography variant="h5" color="initial">
                Total pending reviews: {data.total_unapproved}
              </Typography>
            </Paper>
            {data.users.map((user) => {
              return (
                <Paper sx={{ padding: 3, borderRadius: 3, marginBottom: 2 }}>
                  <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    <Grid item xs={6}>
                      <Typography variant="body1" color="initial">
                        Name: {user.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={2} align="center">
                      <Typography variant="body1" color="initial">
                        Total pending reviews: {user.unapproved_designs}
                      </Typography>
                    </Grid>
                    <Grid item xs={2} align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setUserId(user.id)
                          handleOpenView()
                        }}
                      >
                        Designer details
                      </Button>
                    </Grid>
                    <Grid item xs={2} align="center">
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          navigate(`/designer-unapproved/${user.id}`)
                        }}
                      >
                        Review
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              )
            })}
          </Grid>
        ) : (
          'Loading...'
        )}
      </Grid>

      <Modal
        open={openView}
        onClose={handleCloseView}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ViewUser
            userId={userId}
            handleCloseView={handleCloseView}
            state={state}
            setState={setState}
          />
        </Box>
      </Modal>
    </SideDrawer>
  )
}

export default ApproveDesign