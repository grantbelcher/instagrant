import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Inbox from '../views/Inbox';
import Messager from '../views/Messager';
import { rickAstley } from '../redux/actions/timer';
import { signOut } from '../redux/actions/auth';


const styles = {
  desktop: {
    border: 'solid',
    borderColor: '#CCCCCC',
    borderWidth: 'thin',
    borderRadius: '1%',
    position: 'fixed',
    top: '5%',
    bottom: '5%',
    left: '10%',
    right: '10%',
    display: 'flex',
  },
  mobile: {
    border: 'solid',
    borderColor: '#CCCCCC',
    borderWidth: 'thin',
    borderRadius: '1%',
    position: 'fixed',
    top: '0%',
    bottom: '0%',
    left: '0%',
    right: '0%',
    display: 'flex',
  },
  // col1: {
  //   width: '30%',
  //   border: 'solid',
  //   borderColor: '#CCCCCC',
  //   borderWidth: 'thin',

  // },
  headerLeft: {
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
  direct: {
    fontWeight: 'bold',
  },
};

// const Dashboard = ({ user, chatSelector, loadChats, activeChat }) => {
const Dashboard = ({ user, notifications, goToRick, logOut, deviceType }) => {
  const [modalOpen, setModalOpen] = useState(false);
  let inbox = null;
  if (user && notifications) {
    inbox = notifications.length
  }

  return (
    <div style={styles[`${deviceType}`]}>
      <Inbox user={user} goToRick={goToRick} inbox={inbox} modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <Messager logOut={logOut} />
    </div>
  );
};


const mapStateToProps = ({ auth, notifications, dimensions }) => {
  const { user } = auth;
  return ({
    user,
    notifications,
    deviceType: dimensions,
  });
};

const mapDispatchToProps = {
  goToRick: rickAstley,
  logOut: signOut,
};


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
