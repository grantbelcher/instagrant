import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Auth = ({ handleClose, open, form }) => (
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
      />
      <TextField
        margin="dense"
        id="name"
        label="password"
        fullWidth
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>close</Button>
    </DialogActions>

  </Dialog>
);

export default Auth;
