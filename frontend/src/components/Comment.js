import * as React from 'react'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'

const Comment = ({ data, dividerEnabled = true }) => {
  return (
      <Paper elevation={0} sx={{ p: 1 }}>
        <Typography color="text.secondary" gutterBottom>
          {data.email}
        </Typography>
        <Typography color="text.secondary">
          {data.timestamp}
        </Typography>
        <Typography variant="body2">
          {data.text}
        </Typography>
        {dividerEnabled && <Divider variant="middle" sx={{ m: 2 }} />}
      </Paper>
  )
}
export default Comment
