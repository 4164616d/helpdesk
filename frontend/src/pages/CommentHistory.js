import TicketPreview from "../components/TicketPreview"
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from 'react';
import { commentsRequest } from "../requests"
import Comment from "../components/Comment"
import useNotification from '../utils/notification';

const CommentHistory = ({user}) => {
  const [comments, setComments] = useState([]);
  const [msg, sendNotification] = useNotification();

  useEffect(() => {    
    const getComments = () => {
      commentsRequest(user.token, sendNotification)
        .then(res => {
          setComments(res);
        }).catch((error)=>{
          console.log(error);
        })
    }
    getComments();
  },[user.token]);

  if(comments.length===0){
    return (
      <div className="App-Main" >
        <p>Unable to load comments</p>
      </div>
    );
  }

  return (
    <div className="App-Main">
      <Typography
        variant="h4"
        id="tableTitle"
        style={{ marginTop: "2%" }}
      >
        Comment History
      </Typography>
      <Grid style={{ padding: "2% 10% 2% 10%" }} container spacing={2}>
        {comments.map(data =>
          <Grid item xs={6}>
            <Comment data={data} dividerEnabled={false}/>
          </Grid>
        )}
      </Grid>
    </div>
  );
};
export default CommentHistory;