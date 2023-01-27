import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TicketModal from './TicketModal';
import Chip from '@mui/material/Chip';

const TicketPreview = ({ ticket, user }) => {
  const [open, setOpen] = React.useState(false);

  const timeDifference = (timestamp) => {
    const elapsed = new Date() - new Date(timestamp);
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    }
    else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    }
    else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    }
    else {
      return Math.round(elapsed / msPerDay) + ' days ago';
    }
  }


  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {ticket.email}
        </Typography>
        <Typography variant="h5" component="div">
          {ticket.title}
        </Typography>
        <Chip label={ticket.status} size="small" color={ticket.status === "Open" ? "success" : "error"} />
        <Typography sx={{ mt: 1 }} color="text.secondary">
          {`Last update: ${ticket.comments.length > 0 ? timeDifference(ticket.comments.at(-1).timestamp) : "Never"}`}
        </Typography>
        <Typography sx={{ mt: 2 }} noWrap variant="body2">
          {ticket.description}
        </Typography>

      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => setOpen(true)}>View Ticket</Button>
        <Typography sx={{ ml: 5 }} noWrap variant="body2">
          {`${ticket.comments.length} Comments`}
        </Typography>
      </CardActions>
      <TicketModal open={open} setOpen={setOpen} ticket={ticket} user={user} timeDifference={timeDifference} />
    </Card>
  );
}

export default TicketPreview;
