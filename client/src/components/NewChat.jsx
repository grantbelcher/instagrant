/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';

// const styles = {

// };

const NewChat = ({ open, setModalOpen }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleClose = () => {
    setQuery('');
    setModalOpen(false);
  };
  console.log(query);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>
        <IconButton onClick={handleClose}>
          <i className="fas fa-times fa-sm" />
        </IconButton>
        New Message
        <Button>Next</Button>

        <DialogContent dividers>
          <TextField
            autoFocus
            label="Search Users"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            maxWidth
          />
        </DialogContent>
        <DialogContent dividers>
          yoooo
        </DialogContent>
      </DialogTitle>

    </Dialog>
  );
};


export default NewChat;
