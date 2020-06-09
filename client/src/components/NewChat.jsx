/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import UserList from './UserList';
import Recipients from './Recipients';
import SocketContext from '../context/index';
import store from '../redux/index';
import { selectChat } from '../redux/actions/chats';

const NewChat = ({ open, setModalOpen, user }) => {
  const connection = useContext(SocketContext);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recipients, setRecipients] = useState([]);

  console.log(user, 'dasadsasadadadsaadsas')

  const searchUsers = async () => {
    const results = await axios.get(`http://localhost:1000/users?q=${query}`);
    const { data } = results;
    console.log(data)
    const users = data.filter((account) => account._id !== user._id);
    console.log(users, 'too')
    setSuggestions(users);
  };
  useEffect(() => {
    searchUsers();
  }, [query, user]);


  const handleClose = () => {
    setQuery('');
    setRecipients([]);
    setModalOpen(false);
  };

  const newChat = async () => {
    const name = 'test';
    const data = { name, recipients: [user, ...recipients] };
    let results;
    axios.post('http://localhost:1000/chats', data)
      .then((res) => res.data)
      .then((chat) => {
        connection.emit('NEW_CHAT_CREATED', chat);
        return chat;
      })
      .then((newActiveChat) => store.dispatch({
        type: 'SELECT_CHAT',
        payload: newActiveChat,
      }))
      .then(() => {
        handleClose();
      })
      .catch((err) => console.error(err.message, ' errrrrr'));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      style={{ maxHeight: '80vh', minHeight: '70vh' }}
    >
      <DialogTitle>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        >
          <IconButton onClick={handleClose}>
            <i className="fas fa-times fa-sm" />
          </IconButton>
          New Message
          <Button onClick={newChat}>
            Next
          </Button>

        </div>
        <DialogContent dividers>
          To:
          {' '}
          <Recipients recipients={recipients} setRecipients={setRecipients} user={user} />
        </DialogContent>
        <TextField
          autoFocus
          label="Search Users"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ marginTop: '2vh', width: '70%' }}
        />
        <UserList users={suggestions} recipients={recipients} setRecipients={setRecipients} />
      </DialogTitle>

    </Dialog>
  );
};

export default NewChat;
