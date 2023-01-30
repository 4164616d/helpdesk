import './styles/App.css'
import AppBar from './components/AppBar'
import {
  Route,
  Routes
  , useNavigate
} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/login'
import Register from './pages/register'
import React, { useState, useEffect } from 'react'
import Users from './pages/Users'
import CreateTicket from './pages/CreateTicket'
import CommentHistory from './pages/CommentHistory'
import useNotification from './utils/notification'

function App () {
  const [, sendNotification] = useNotification()
  const [user, setUser] = useState()
  const navigate = useNavigate()

  const registerCallback = () => {
    navigate('/')
    sendNotification({ msg: 'Registration successful', variant: 'success' })
  }

  const loginCallback = (response) => {
    navigate('/')
    setUser({
      token: response.token,
      email: response.email,
      type: response.type
    })
    sendNotification({ msg: 'Login successful', variant: 'success' })
  }

  useEffect(() => {
    try {
      setUser(JSON.parse(window.localStorage.getItem('user')))
    } catch {
      setUser()
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  if (user == null) {
    return (
        <Routes>
          <Route path="*" element={<Login loginCallback={loginCallback}/>}/>
          <Route exact path="/register" element={<Register registerCallback={registerCallback}/>}/>
        </Routes>
    )
  }
  return (
    <div >
      <AppBar email={user.email} type={user.type}/>
        <Routes>
          <Route exact path="/" element={<Dashboard user={user}/>}/>
          <Route exact path="/users" element={<Users user={user}/>}/>
          <Route exact path="/create" element={<CreateTicket user={user}/>}/>
          <Route exact path="/comments" element={<CommentHistory user={user}/>}/>
          <Route path="*" element={<p className="App-Main">404 Not Found</p>}/>
        </Routes>
    </div>
  )
}

export default App
