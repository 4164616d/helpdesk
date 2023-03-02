
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { registerRequest } from '../requests'
import React, { useState } from 'react'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import useNotification from '../utils/notification'

const CustomPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  lineHeight: '60px'
}))

const Login = ({ registerCallback }) => {
  const [user, setUser] = useState({ email: '', password: '', type: 'User' })
  const [errors, setErrors] = useState({ email: false, password: false })
  const [, sendNotification] = useNotification()

  const isValid = () => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    const emailValid = user.email.match(emailRegex)
    const passwordValid = user.password.match(passwordRegex)

    setErrors({ ...errors, email: !emailValid, password: !passwordValid })

    return emailValid && passwordValid
  }

  const registerUser = () => {
    if (isValid()) {
      registerRequest(user, sendNotification)
        .then(res => {
          registerCallback(res)
        }).catch((error) => {
          console.log(error)
        })
    }
  }
  return (
        <div className="App-Main">
            <CustomPaper elevation={12}>
                <form className="form">
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h4"
                    id="tableTitle"
                >
                    Register
                </Typography>
                    <TextField
                        style={{ marginTop: 20 }}
                        error={errors.email}
                        id="Email"
                        label="Email"
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                    <TextField
                        style={{ marginTop: 20 }}
                        error={errors.password}
                        id="Password"
                        label="Password"
                        type="password"
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        helperText="Min 8 characters including capitals, numbers and special characters"
                    />
                    <FormControlLabel control={<Switch />} label="Admin" onChange={(e) => setUser({ ...user, type: e.target.checked ? 'Admin' : 'User' })}/>
                    <Button style={{ marginTop: 20 }}
                        type="button" variant="contained" color="primary"
                        onClick={() => registerUser()}
                    >
                        {`Register as ${user.type}`}
                    </Button>
                </form>
            </CustomPaper>
        </div>
  )
}
export default Login
