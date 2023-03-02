import * as React from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

const MuiTable = ({ rows, headCells, title, handleClick }) => {
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState(headCells[0].id)
  const [page, setPage] = React.useState(0)

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const emptyRows = Math.max(0, (1 + page) * 10 - rows.length)

  return (
        <Box sx={{ width: '90%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <Toolbar>
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                    >
                        {title}
                    </Typography>
                </Toolbar>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="Table"
                        size={'medium'}
                    >
                        <TableHead>
                            <TableRow>
                                {headCells.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        align={headCell.numeric ? 'right' : 'left'}
                                        padding={'normal'}
                                        sortDirection={orderBy === headCell.id ? order : false}
                                    >
                                        <TableSortLabel
                                            active={orderBy === headCell.id}
                                            direction={orderBy === headCell.id ? order : 'asc'}
                                            onClick={() => handleRequestSort(headCell.id)}
                                        >
                                            {headCell.label}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice().sort(getComparator(order, orderBy))
                              .slice(page * 10, page * 10 + 10)
                              .map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`
                                return (
                                        <TableRow
                                            hover
                                            onClick={() => handleClick(row)}
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row[0]}
                                        >
                                            {Object.keys(row).map((key, index) => {
                                              return index === 0
                                                ? <TableCell id={labelId} scope="row">{row[key]}</TableCell>
                                                : <TableCell align="right">{row[key]}</TableCell>
                                            }
                                            )}
                                        </TableRow>
                                )
                              })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={rows.length}
                    rowsPerPage={10}
                    page={page}
                    onPageChange={(e, newPage) => setPage(newPage)}
                />
            </Paper>
        </Box>
  )
}
export default MuiTable
