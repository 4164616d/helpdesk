import TicketPreview from '../components/TicketPreview'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import React, { useState, useEffect } from 'react'
import { ticketsRequest } from '../requests'
import useNotification from '../utils/notification'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

const Dashboard = ({ user }) => {
  const [status, setStatus] = useState('Loading')
  const [tickets, setTickets] = useState([])
  const [currentFilter, setCurrentFilter] = useState(0)
  const [, sendNotification] = useNotification()

  const filters = [
    { name: 'All', items: tickets },
    { name: 'Open Only', items: tickets.filter((item) => item.status === 'Open') },
    { name: 'My Tickets', items: tickets.filter((item) => item.email === user.email) }
  ]

  useEffect(() => {
    const getTickets = () => {
      ticketsRequest(user.token, sendNotification)
        .then(res => {
          setTickets(res)
          setStatus()
        }).catch(() => {
          setStatus('Error unable to connect to server')
        })
    }
    getTickets()
  }, [user.token])

  if (status) {
    return (
      <div className="App-Main" >
        <p>{status}</p>
      </div>
    )
  }

  return (
    <div className="App-Main">
      <Typography
        variant="h4"
        id="tableTitle"
        sx={{ mt: 2, mb: 2 }}
      >
        Tickets
      </Typography>
      <Stack direction="row" spacing={2}>
        {filters.map((filter, index) =>
          <Button key={`filter-${index}`} variant={currentFilter === index ? 'outlined' : 'contained'} onClick={() => setCurrentFilter(index)}>{filter.name}</Button>
        )}
      </Stack>
      {filters[currentFilter].items.length > 0
        ? <Grid style={{ padding: '2% 10% 2% 10%' }} container spacing={2}>
        {filters[currentFilter].items.map((ticket, index) =>
          <Grid key={`ticket-${index}`} item xs={6}>
            <TicketPreview ticket={ticket} user={user} />
          </Grid>
        )}
      </Grid>
        : <p>No tickets for selected filter</p>
      }
    </div>
  )
}
export default Dashboard
