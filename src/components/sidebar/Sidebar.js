import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import {
  AppBar,
  Button,
  CardMedia,
  Toolbar,
  Tooltip,
} from '@mui/material'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router'
import { btn, df_jc_ac, df_jfe_ac } from '../../theme/CssMy'
import { useContext } from 'react'
import { capriwaycontext } from '../../context/MainContext'

const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.05)',
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

const listItemBtn = {
  justifyContent: 'initial',
  px: 2.5,
}

const listItemIco = {
  minWidth: 0,
  justifyContent: 'center',
}

const gridcon = {
  display: 'flex',
  alignItems: 'space-between',
  flexDirection: 'column',
  height: '100vh',
  justifyContent: 'space-between',
}

export default function SideDrawer(props) {
  const { children } = props
  const url = window.location.href.split('/')[3]
  const navigate = useNavigate()

  const isAdmin = JSON.parse(localStorage.getItem('capriwayUser')) === 'admin' ? true : false
  const isDesigner = JSON.parse(localStorage.getItem('capriwayUser')) === 'designer' ? true : false

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        sx={{
          marginLeft: '50px',
          backgroundColor: 'white',
          color: '#375EC0',
          boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.05)',
        }}
      >
        <Toolbar sx={df_jfe_ac}>
          <Button
            sx={btn}
            onClick={() => {
              localStorage.setItem('capriwayUser', null)
              localStorage.setItem('capriwayToken', null)
              navigate('/login')
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent">
        <Box sx={gridcon}>
          <Box sx={{ ...df_jc_ac, marginTop: '5%' }}>
            <CardMedia
              component="img"
              sx={{ borderRadius: '50px', width: '98%', marginTop: '15%' }}
            />
          </Box>
          <Box>
            {isAdmin ? (
              <List>
                <Tooltip title="Dashboard">
                  <ListItem
                    disablePadding
                    onClick={() => navigate('/')}
                    sx={{ display: 'block', marginTop: '20%' }}
                  >
                    <ListItemButton sx={listItemBtn}>
                      <ListItemIcon sx={listItemIco}>
                        <Icon
                          icon="mdi:brush"
                          color={url === '' ? '#375EC0' : '#6A707F'}
                          width="30"
                          height="30"
                        />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
                <Tooltip title="Add Users">
                  <ListItem
                    disablePadding
                    onClick={() => navigate('/addusers')}
                    sx={{ display: 'block', marginTop: '20%' }}
                  >
                    <ListItemButton sx={listItemBtn}>
                      <ListItemIcon sx={listItemIco}>
                        <Icon
                          color={
                            url.includes('addusers') ? '#375EC0' : '#6A707F'
                          }
                          icon="mdi:account-multiple-outline"
                          width="28"
                          height="28"
                        />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
                <Tooltip title="Approve Design">
                  <ListItem
                    disablePadding
                    onClick={() => navigate('/approvedesign')}
                    sx={{ display: 'block', marginTop: '20%' }}
                  >
                    <ListItemButton sx={listItemBtn}>
                      <ListItemIcon sx={listItemIco}>
                        <Icon
                          color={
                            url.includes('approvedesign')
                              ? '#375EC0'
                              : '#6A707F'
                          }
                          icon="mdi:tag-approve"
                          width="24"
                          height="24"
                        />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
                <Tooltip title="Manage Payments">
                  <ListItem
                    disablePadding
                    onClick={() => navigate('/managepayments')}
                    sx={{ display: 'block', marginTop: '20%' }}
                  >
                    <ListItemButton sx={listItemBtn}>
                      <ListItemIcon sx={listItemIco}>
                        <Icon
                          color={
                            url.includes('managepayments')
                              ? '#375EC0'
                              : '#6A707F'
                          }
                          icon="mdi:cash"
                          width="24"
                          height="24"
                        />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
              </List>
            ) : isDesigner ? (
              <List>
                <Tooltip title="Dashboard">
                  <ListItem
                    disablePadding
                    onClick={() => navigate('/')}
                    sx={{ display: 'block', marginTop: '20%' }}
                  >
                    <ListItemButton sx={listItemBtn}>
                      <ListItemIcon sx={listItemIco}>
                        <Icon
                          icon="ion:create"
                          color={url === '' ? '#375EC0' : '#6A707F'}
                          width="26"
                          height="26"
                        />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                </Tooltip>

                <Tooltip title="View posted designs">
                  <ListItem
                    disablePadding
                    onClick={() => navigate('/posteddesigns')}
                    sx={{ display: 'block', marginTop: '20%' }}
                  >
                    <ListItemButton sx={listItemBtn}>
                      <ListItemIcon sx={listItemIco}>
                        <Icon
                          icon="material-symbols-light:grid-view"
                          color={
                            url.includes('posteddesigns')
                              ? '#375EC0'
                              : '#6A707F'
                          }
                          width="26"
                          height="26"
                        />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
              </List>
            ) : (
              <List>
                <Tooltip title="Dashboard">
                  <ListItem
                    disablePadding
                    onClick={() => navigate('/')}
                    sx={{ display: 'block', marginTop: '20%' }}
                  >
                    <ListItemButton sx={listItemBtn}>
                      <ListItemIcon sx={listItemIco}>
                        <Icon
                          icon="material-symbols:home-rounded"
                          color={url === '' ? '#375EC0' : '#6A707F'}
                          width="26"
                          height="26"
                        />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
                <Tooltip title="View Purchased Designs">
                  <ListItem
                    disablePadding
                    onClick={() => navigate('/purchased')}
                    sx={{ display: 'block', marginTop: '20%' }}
                  >
                    <ListItemButton sx={listItemBtn}>
                      <ListItemIcon sx={listItemIco}>
                        <Icon
                          icon="bxs:cart"
                          color={
                            url.includes('purchased') ? '#375EC0' : '#6A707F'
                          }
                          width="27"
                          height="27"
                        />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
              </List>
            )}
          </Box>
          <Box></Box>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
