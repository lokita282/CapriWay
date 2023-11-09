import { React, useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
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
} from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router'
import EditUser from './EditUser'
import DeleteUser from './DeleteUser'
import ViewUser from './ViewUser'
import { getDesignerUsers } from '../../services/adminServices'

const listItemBtn = {
  justifyContent: 'initial',
  px: 2.5,
}

const listItemIco = {
  minWidth: 0,
  justifyContent: 'center',
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#375EC0',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'Email', minWidth: 100 },
  {
    id: 'size',
    label: '',
    minWidth: 170,
  },
]

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  // boxShadow: 24,
  p: 4,
  borderRadius: 5
}

export default function StickyHeadTable() {
  const [users, setUsers] = useState()
  const [userId, setUserId] = useState()
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openView, setOpenView] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [state, setState] = useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleOpenEdit = () => {
    console.log('OPEN')
    console.log(userId)
    setOpenEdit(true)
  }

  const handleOpenDelete = () => {
    console.log('OPEN')
    console.log(userId)
    setOpenDelete(true)
  }

  const handleOpenView = () => {
    console.log('OPEN')
    console.log(userId)
    setOpenView(true)
  }

  const handleCloseEdit = () => setOpenEdit(false)

  const handleCloseDelete = () => setOpenDelete(false)

  const handleCloseView = () => setOpenView(false)

  useEffect(() => {
    const func = async () => {
      try {
        await getDesignerUsers().then((res) => {
          console.log(res.data.tags)
          setUsers(res.data)
          console.log(users)
        })
      } catch (error) {
        console.log(error)
      }
    }
    func()
  }, [state])

  return (
    <Paper sx={{ width: '77%', overflow: 'hidden', margin: 'auto' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          {users ? (
            <TableBody>
              {(rowsPerPage > 0
                ? users.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : users
              ).map((row) => {
                return (
                  <StyledTableRow
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                  >
                    <StyledTableCell>
                      {row.first_name} {row.last_name}
                    </StyledTableCell>
                    <StyledTableCell>{row.email}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Grid container alignItems="center" spacing={0}>
                        <Grid item xs={4}>
                          <ListItemButton
                            sx={listItemBtn}
                            onClick={() => {
                              setUserId(row.id)
                              console.log('edittttttttt')
                              console.log(userId)
                              handleOpenEdit()
                            }}
                          >
                            <ListItemIcon sx={listItemIco}>
                              <Icon
                                color={'6A707F'}
                                icon="ri:edit-fill"
                                width="28"
                                height="28"
                              />
                            </ListItemIcon>
                          </ListItemButton>
                        </Grid>
                        <Grid item xs={4}>
                          <ListItemButton
                            sx={listItemBtn}
                            onClick={() => {
                              setUserId(row.id)
                              handleOpenDelete()
                            }}
                          >
                            <ListItemIcon sx={listItemIco}>
                              <Icon
                                color={'6A707F'}
                                icon="ic:baseline-delete"
                                width="28"
                                height="28"
                              />
                            </ListItemIcon>
                          </ListItemButton>
                        </Grid>
                        <Grid item xs={4}>
                          <ListItemButton
                            sx={listItemBtn}
                            onClick={() => {
                              setUserId(row.id)
                              handleOpenView()
                            }}
                          >
                            <ListItemIcon sx={listItemIco}>
                              <Icon
                                color={'6A707F'}
                                icon="carbon:view-filled"
                                width="28"
                                height="28"
                              />
                            </ListItemIcon>
                          </ListItemButton>
                        </Grid>
                      </Grid>
                    </StyledTableCell>
                  </StyledTableRow>
                )
              })}
            </TableBody>
          ) : (
            'Loading...'
          )}
        </Table>
      </TableContainer>
      {users ? (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : (
        ''
      )}

      {/* Edit User Modal */}
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditUser
            userId={userId}
            handleCloseEdit={handleCloseEdit}
            state={state}
            setState={setState}
          />
        </Box>
      </Modal>

      {/* Delete User Modal */}
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DeleteUser
            userId={userId}
            handleCloseDelete={handleCloseDelete}
            state={state}
            setState={setState}
          />
        </Box>
      </Modal>

      {/* View User Modal */}
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
    </Paper>
  )
}
