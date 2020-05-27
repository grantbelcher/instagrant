import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Auth = ({ handleClose, open, form }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  console.log(name, password);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <DialogTitle>{form}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="username"
          fullWidth
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <TextField
          margin="dense"
          id="name"
          label="password"
          fullWidth
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>close</Button>
      </DialogActions>

    </Dialog>

  );
};

export default Auth;
