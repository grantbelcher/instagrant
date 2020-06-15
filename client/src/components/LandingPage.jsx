import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Auth from './Auth';

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10vh',
  },
  header: {
    color: 'white',
    textShadow: '2px 2px purple',
    fontSize: '10vh',
  },
  header2: {
    color: 'white',
    textShadow: '2px 2px purple',
    fontSize: '4vh',
    textAlign: 'center',
  },
  header3: {
    color: 'white',
    textShadow: '2px 2px purple',
    fontSize: '1.3vh',
  },
  button1: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 2,
    color: 'white',
    height: 48,
    padding: '0 20px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    marginLeft: '3vw',
    marginTop: '10vh',
  },
  button2: {
    background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 70% )',
    borderRadius: 3,
    border: 2,
    color: 'white',
    height: 48,
    padding: '0 20px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    marginRight: '3vw',
    marginTop: '10vh',
  },
  buttonMobile: {
    background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 70% )',
    borderRadius: 3,
    border: 2,
    color: 'white',
    height: 48,
    padding: '0 20px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    minWidth: '75vw',
    marginTop: '3vh',
  },
};

const LandingPage = ({ setToken, deviceType }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  const handleOpen = (e) => {
    setForm(e.target.textContent);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const buttons = deviceType === 'mobile' ? (
    <>
      <Button
        variant="contained"
        color="primary"
        style={styles.buttonMobile}
        onClick={(e) => handleOpen(e)}
      >
        Sign In
      </Button>
      <Button
        variant="outlined"
        color="primary"
        style={styles.buttonMobile}
        onClick={handleOpen}
      >
        Sign Up
      </Button>
    </>
  ) : (
    <div>
      <Button
        variant="contained"
        color="primary"
        style={styles.button2}
        onClick={(e) => handleOpen(e)}
      >
        Sign In
      </Button>
      <Button
        variant="outlined"
        color="primary"
        style={styles.button2}
        onClick={handleOpen}
      >
        Sign Up
      </Button>
    </div>
  );

  return loading ? (
    <div>
      <LinearProgress />
      <LinearProgress color="secondary" />
    </div>
  ) : (
    <div
      style={styles.container}
    >
      <div style={styles.box}>
        <h1 style={styles.header}>Instagrant</h1>
        <h2 style={styles.header2}>everything on the internet is permanent</h2>
        <h2 style={styles.header3}>please do not look at the developer tools or try to break my website</h2>
        {buttons}
        <Auth handleClose={handleClose} open={open} form={form} setForm={setForm} setToken={setToken} />
      </div>
    </div>
  );
};

const mapStateToProps = ({ views }) => {
  const { device } = views;
  return {
    deviceType: device,
  };
};

export default connect(mapStateToProps, null)(LandingPage);
