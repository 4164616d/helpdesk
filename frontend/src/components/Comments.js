import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Comment from './Comment'

const Comments = ({ commentsArray, commentSubmitHandler, addCommentOpen, setAddCommentOpen }) => {
  const [commentText, setCommentText] = useState("")
  return (
    <div >
      {addCommentOpen && <Paper elevation={1} sx={{ margin: 2, padding: 2 }}>
        <Typography sx={{ fontSize: 18 }} gutterBottom>
          Add comment
        </Typography>
        <TextField
          id="coment-textfield"
          label="Message"
          multiline
          rows={6}
          sx={{ width: "100%" }}
          onChange={(e) => setCommentText(e.target.value)}
          helperText="Min length 5 characters"
        />
        <Button size="small" sx={{ marginTop: 1 }} onClick={() => setAddCommentOpen(false)}>Close</Button>
        <Button size="small" sx={{ marginTop: 1 }} onClick={() => commentSubmitHandler(commentText)} disabled={commentText.length<5}>Submit</Button>
      </Paper>}
      {commentsArray.length>0&&<Typography sx={{ fontSize: 22 }} gutterBottom>
        {`Comments (${commentsArray.length})`}
      </Typography>}
      <div style={{ maxHeight: 600, overflow: 'auto' }}>
        {commentsArray.map(data =>
          <Comment data={data} />)}
      </div>
    </div>
  );
}

export default Comments;
