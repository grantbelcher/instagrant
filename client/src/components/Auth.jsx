import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { signIn } from '../redux/actions/auth';

const Auth = ({ handleClose, open, form, setForm, submitForm}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const submit = async () => {
    const path = form.split(' ').join('');
    submitForm(name, password, path);
  };

  const closeModal = () => {
    setName('');
    setPassword('');
    handleClose();
  };
  const type = (form === 'Sign In' ? 'Sign Up' : 'Sign In');
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

const mapDispatchToProps = {
  submitForm: signIn,
};

export default connect(null, mapDispatchToProps)(Auth);
