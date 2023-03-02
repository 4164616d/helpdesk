
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { loginRequest } from '../requests'
import React, { useState } from 'react'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import useNotification from '../utils/notification'

const CustomPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  lineHeight: '60px'
}))

const Login = ({ loginCallback }) => {
  const [user, setUser] = useState({ email: '', password: '' })
  const [, sendNotification] = useNotification()

  const attemptLogin = () => {
    loginRequest(user, sendNotification)
      .then(res => {
        loginCallback(res)
      }).catch((error) => {
        console.log(error)
      })
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
                    Login
                </Typography>
                    <TextField
                        style={{ marginTop: 20 }}
                        error={false}
                        id="Email"
                        label="Email"
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                    <TextField
                        style={{ marginTop: 20 }}
                        error={false}
                        id="Password"
                        label="Password"
                        type="password"
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                    <Button style={{ marginTop: 20 }}
                        type="button" variant="contained" color="primary"
                        onClick={() => attemptLogin()}
                        disabled={!(user.email.length > 5 & user.password.length > 5)}
                        >
                        Log in
                    </Button>
                    <Link href="/register">or register</Link>
                </form>
            </CustomPaper>
        </div>
  )
}
export default Login
