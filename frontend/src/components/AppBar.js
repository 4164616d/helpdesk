import * as React from 'react'
import logout from '../utils/logout'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import stc from 'string-to-color'
import { useNavigate } from 'react-router-dom'

const pages = [{ name: 'Dashboard', action: '/', adminOnly: false }, { name: 'Users', action: '/users', adminOnly: true }, { name: 'Create Ticket', action: '/create', adminOnly: false }, { name: 'Comment History', action: '/comments', adminOnly: true }]
const settings = [{ name: 'Account', action: '/account', adminOnly: false }, { name: 'Logout', action: () => logout(), adminOnly: false }]

const ResponsiveAppBar = ({ email, type }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const navigate = useNavigate()

  const adminFilter = (items) => {
    const userItems = items.filter(item => !item.adminOnly)
    return type === 'Admin' ? items : userItems
  }

  const executeAction = (item) => {
    if (item.action instanceof Function) {
      item.action()
    } else {
      const path = item.action
      navigate(path)
    }
  }

  return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        Help Desk
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {adminFilter(pages).map((page) => (
                            <Button
                                key={page.name}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                onClick={() => executeAction(page)}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    <Typography
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        {type}
                    </Typography>
                    <Box sx={{ flexGrow: 0 }}>

                        <Tooltip title="Open settings">
                            <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)} sx={{ p: 0 }}>
                                <Avatar sx={{ bgcolor: stc(email) }}>{`${email[0].toUpperCase()}`}</Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={Boolean(anchorElUser)}
                            onClose={() => setAnchorElUser(null)}
                        >
                            {adminFilter(settings).map((setting) => (
                                <MenuItem key={setting.name} onClick={() => setAnchorElUser(null)}>
                                    <Typography textAlign="center" onClick={() => executeAction(setting)}>{setting.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
  )
}
export default ResponsiveAppBar
