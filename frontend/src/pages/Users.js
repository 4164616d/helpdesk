import Table from "../components/Table"
import { usersRequest } from "../requests";
import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import useNotification from '../utils/notification';

const headCells = [
  {
    id: 'email',
    numeric: false,
    label: 'Email',
  },
  {
    id: 'id',
    numeric: true,
    label: 'Id',
  },
  {
    id: 'signup',
    numeric: true,
    label: 'Sign Up date',
  }
];

const Users = ({user}) => {
  const [rows, setRows] = useState([]);
  const [msg, sendNotification] = useNotification();


  const handleClick = (row) => {
    navigator.clipboard.writeText(row.email);
    sendNotification({ msg: "Copied to clipboard", variant: 'success' })
  };

  useEffect(() => {    
    const getUsers = () => {
      usersRequest(user.token, sendNotification)
        .then(res => {
          setRows(res);
        }).catch((error)=>{
          console.log(error);
        })
    }
    getUsers();
  },[user.token]);

  if(rows.length===0){
    return (
      <div className="App-Main" >
        <p>Unable to load users</p>
      </div>
    );
  }
  return (
    <div className="App-Main" >
      <Table headCells={headCells} rows={rows} title="Users" handleClick={handleClick}/>
    </div>
  );
};
export default Users;