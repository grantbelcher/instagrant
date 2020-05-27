import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const Auth = ({ handleClose, open, form, setForm }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const submit = async () => {
    const path = form.split(' ').join('');
    const response = await axios.post(`http://localhost:1000/auth/${path}`, { name, password });
    console.log(response.data, 'res');
  };

  const closeModal = () => {
    setName('');
    setPassword('');
    handleClose();
  };
  const type = (form === 'Sign In' ? 'Sign Up' : 'Sign In');
  console.log(type);
  return (
    <Dialog
      open={open}
      onClose={closeModal}
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
        <Button
          style={{ float: 'right' }}
          onClick={() => setForm(type)}
        >
          {form === 'Sign In' ? 'Dont have an account? Sign Up' : 'Already have an account? Sign In'}
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={submit}>submit</Button>
        <Button onClick={closeModal}>close</Button>
      </DialogActions>

    </Dialog>

  );
};

export default Auth;
