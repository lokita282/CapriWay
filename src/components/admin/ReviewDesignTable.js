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
} from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router'
// import { getNormalUsers } from '../../services/adminServices'

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
    id: 'population',
    label: 'Paid/Unpaid',
    minWidth: 100,
  },
  {
    id: 'size',
    label: '',
    minWidth: 170,
  },
]

export default function StickyHeadTable() {
  const [users, setUsers] = useState()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const navigate = useNavigate()

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  // useEffect(() => {
  //   const func = async () => {
  //     try {
  //       await getNormalUsers().then((res) => {
  //         console.log(res.data.tags)
  //         setUsers(res.data)
  //         //  setFilteredData(res.data)
  //         console.log(users)
  //       })
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   func()
  // }, [])

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
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                  >
                    <StyledTableCell>
                      {row.first_name} {row.last_name}
                    </StyledTableCell>
                    <StyledTableCell>{row.email}</StyledTableCell>
                    {row.paid === false ? (
                      <StyledTableCell>Unpaid</StyledTableCell>
                    ) : (
                      <StyledTableCell>Paid</StyledTableCell>
                    )}
                    <StyledTableCell align="center">
                      <Grid container alignItems="center" spacing={0}>
                        <Grid item xs={4}>
                          <ListItemButton sx={listItemBtn}>
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
                          <ListItemButton sx={listItemBtn}>
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
                          <ListItemButton sx={listItemBtn}>
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
    </Paper>
  )
}
