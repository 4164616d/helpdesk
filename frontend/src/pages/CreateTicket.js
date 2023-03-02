
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import { createTicketRequest } from '../requests'
import useNotification from '../utils/notification'

const CustomPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  lineHeight: '60px'
}))

const CreateTicket = ({ user }) => {
  const [ticket, setTicket] = useState({ title: '', description: '' })
  const [errors, setErrors] = useState({ title: false, description: false })
  const [, sendNotification] = useNotification()

  const isValid = () => {
    const titleValid = ticket.title.length > 5
    const descriptionValid = ticket.description.length > 30

    setErrors({ ...errors, title: !titleValid, description: !descriptionValid })

    return titleValid && descriptionValid
  }

  const submitTicket = () => {
    if (isValid()) {
      createTicketRequest(ticket, user.token, sendNotification)
        .then(res => {
          sendNotification({ msg: 'Created Ticket', variant: 'success' })
        }).catch((error) => {
          console.log(error)
        })
    }
  }
  return (
        <div className="App-Main">
            <CustomPaper elevation={12} style={{ minWidth: '30%' }}>
                <form className="form">
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h4"
                    id="tableTitle"
                >
                    Create Ticket
                </Typography>
                    <TextField
                        style={{ marginTop: 20 }}
                        error={errors.title}
                        id="Title"
                        label="Title"
                        onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
                        helperText="Min 5 characters"
                    />
                    <TextField
                        style={{ marginTop: 20 }}
                        error={errors.description}
                        multiline
                        rows={5}
                        id="Description"
                        label="Description"
                        onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
                        helperText="Min 30 characters"
                    />
                    <Button style={{ marginTop: 20 }}
                        type="button" variant="contained" color="primary"
                        onClick={() => submitTicket()}
                    >
                        {'Create Ticket'}
                    </Button>
                </form>
            </CustomPaper>
        </div>
  )
}
export default CreateTicket
