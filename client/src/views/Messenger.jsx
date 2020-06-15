import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import ChatDisplay from '../components/ChatDisplay';
import Header from '../components/Header';
import IconMenu from '../components/IconMenu';


const styles = {
  headerRight: {
    borderBottom: 'solid',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 'thin',
    height: '11vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(223, 249, 246, 1.0)',
  },
  container: {
    width: '70%',
    border: 'solid',
    borderColor: '#CCCCCC',
    borderWidth: 'thin',
  },
  mobileContainer: {
    width: '100%',
    border: 'solid',
    borderColor: '#CCCCCC',
    borderWidth: 'thin',
  },
  userInfoHeader: {
    marginLeft: '1vw',
  },
};

const Messenger = ({ logOut, device, inbox }) => (
  <div style={device === 'mobile' ? styles.mobile : styles.col2}>
    <Paper style={styles.headerRight}>
      <div style={styles.userInfoHeader}>
        <Header />
      </div>
      <IconMenu logOut={logOut} device={device} inbox={inbox} />
    </Paper>
    <ChatDisplay />
  </div>
);

const mapStateToProps = ({ views }) => {
  const { device, view } = views;
  return {
    device,
    view,
  };
};

export default connect(mapStateToProps, null)(Messenger);
