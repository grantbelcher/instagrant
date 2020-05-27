import React from 'react';
import Button from '@material-ui/core/Button';


const backgroundImg = 'https://preview.redd.it/4ipebfl1zrp01.jpg?width=960&crop=smart&auto=webp&s=e6f611ee3ff2b74f3edc3239a30006fa298cf733';
const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    backgroundImage: `url(${backgroundImg})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
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
    fontSize: '5vh',
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
};

const LandingPage = () => {
  console.log('landingpage');
  return (
    <div
      style={styles.container}
    >
      <div style={styles.box}>
        <h1 style={styles.header}>VICARIOUS.LY</h1>
        <h2 style={styles.header2}>Your time is limited...waste it living someone else&#39;s life</h2>
        <div>
          <Button variant="contained" color="primary" style={styles.button2}>
            Sign In
          </Button>
          <Button variant="outlined" color="primary" style={styles.button1}>
            Sign Up
          </Button>
          {/* <button>yo</button>
          <button>yo</button> */}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
