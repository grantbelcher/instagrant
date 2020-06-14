import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import store from '../redux/index';
import { signIn } from '../redux/actions/auth';

const styles = {
  error: {
    color: 'red',
    marginLeft: 20,
  },
  mobile: {

  },
  container: {
    maxWidth: '34vw',
    marginLeft: '34vw',
  },
  mobileContainer: {
    marginLeft: '15vw',
    maxWidth: '70vw',
  },
};

// mobile,
  // marginLeft: 15vw,
  // maxWidth: 70vw


const Auth = ({ handleClose, open, form, setForm, submitForm, error, isLoggedIn, setToken }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const submit = async () => {
    if (name.length > 5 && password.length > 5) {
      const path = form.split(' ').join('');
      submitForm(name, password, path);
    } else {
      store.dispatch({
        type: 'AUTH_ERROR',
        payload: 'name & password must be at least 6 characters*',
      });
      setTimeout(() => {
        store.dispatch({
          type: 'REMOVE_ERROR',
        });
      }, 4000);
    }
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
      style={styles.mobileContainer}
    >
      <DialogTitle>{form}</DialogTitle>
      <div style={styles.error}>
      {` `}{error}
      </div>
      <DialogContent>
        <TextField
          autoFocus={true}
          margin="dense"
          id="name"
          label="username"
          fullWidth
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
          style={{ maxWidth: '100%' }}
        />
        <TextField
          margin="dense"
          id="name"
          label="password"
          type="password"
          fullWidth
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          style={{ maxWidth: '100%' }}
        />
        <Button
          style={{ float: 'right' }}
          onClick={() => {
            setName('');
            setPassword('');
            setForm(type);
          }}
        >
          {form === 'Sign In' ? 'Dont have an account?' : 'Already have an account?'}
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={submit}>submit</Button>
        <Button onClick={closeModal}>close</Button>
      </DialogActions>

    </Dialog>

  );
};

const mapStateToProps = ({ auth }) => {
  const { error, isLoggedIn } = auth;
  return {
    error,
    isLoggedIn,
  };
};

const mapDispatchToProps = {
  submitForm: signIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
