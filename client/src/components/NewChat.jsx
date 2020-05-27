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

const NewChat = ({ open, setModalOpen }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleClose = () => {
    setQuery('');
    setModalOpen(false);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <IconButton onClick={handleClose}>
          <i className="far fa-edit fa-sm" />
        </IconButton>
        New Message
        <Button>Next</Button>
      </DialogTitle>

    </Dialog>
  );
};


export default NewChat;
