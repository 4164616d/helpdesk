import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Comments from "./Comments"
import { addCommentRequest, closeTicketRequest } from '../requests';
import Chip from '@mui/material/Chip';
import useNotification from '../utils/notification';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    wordWrap: "break-word"
};

const TicketModal = ({ open, setOpen, ticket, user, timeDifference }) => {
    const [addCommentOpen, setAddCommentOpen] = useState(false)
    const [msg, sendNotification] = useNotification();

    const submitComment = (text) => {
        const comment = {text, ticket_id: ticket.id}
        addCommentRequest(comment,user.token, sendNotification)
            .then(res => {
                setAddCommentOpen(false);
                sendNotification({ msg: "Comment Added", variant: 'success' })
            }).catch((error)=>{
                console.log(error);
              })
        
    }
    const isOwner = () => user.email===ticket.email||user.type==="Admin"
    const closeTicket = () => {
        if(isOwner()){
        closeTicketRequest(ticket.id,user.token, sendNotification)
            .then(res => {
                sendNotification({ msg: "Ticket closed", variant: 'success' })
                setOpen(false);
            }).catch((error)=>{
                console.log(error);
            })   
        } else {
            sendNotification({ msg: "Only the owner or admin can close this ticket", variant: 'error' })
        }
    }

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Card sx={style} style={{maxHeight: "95%", overflow: 'auto'}}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {ticket.email}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {ticket.title}
                    </Typography>
                    <Chip label={ticket.status} size="small" color={ticket.status==="Open"?"success":"error"} />
                    <Typography sx={{mt:1}} color="text.secondary">
                        {`Last update: ${ticket.comments.length>0?timeDifference(ticket.comments.at(-1).timestamp):"Never"}`}
                    </Typography>
                    <Typography sx={{mt:2}} variant="body2" >
                        {ticket.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={()=>closeTicket()} disabled={ticket.status==="Closed"}>Close Ticket</Button>
                    <Button size="small" disabled={addCommentOpen} onClick={()=>setAddCommentOpen(true)}>Add comment</Button>
                </CardActions>
                <Comments commentsArray={ticket.comments} commentSubmitHandler={submitComment} setAddCommentOpen={setAddCommentOpen} addCommentOpen={addCommentOpen}/>
            </Card>
        </Modal>
    );
}
export default TicketModal;