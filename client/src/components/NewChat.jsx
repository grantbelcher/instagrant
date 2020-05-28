/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import UserList from './UserList';
import Recipients from './Recipients';

const NewChat = ({ open, setModalOpen }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recipients, setRecipients] = useState([]);

  const searchUsers = async () => {
    const results = await axios.get(`http://localhost:1000/users?q=${query}`);
    setSuggestions(results.data);
  };

  useEffect(() => {
    searchUsers();
  }, [query]);

  const handleClose = () => {
    setQuery('');
    setModalOpen(false);
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
          <Button>Next</Button>

        </div>
        <DialogContent dividers>
          To:
          {' '}
          <Recipients recipients={recipients} setRecipients={setRecipients} />
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
