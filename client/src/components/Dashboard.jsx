import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import Inbox from '../views/Inbox';
import Messenger from '../views/Messenger';
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
const Dashboard = ({ user, notifications, goToRick, logOut, deviceType, view }) => {
  const [modalOpen, setModalOpen] = useState(false);
  let inbox = null;
  if (user && notifications) {
    inbox = notifications.length
  }
  if (deviceType === 'mobile') {
    return (
      <div style={styles[`${deviceType}`]}>
        {view === 'messenger' ? <Messenger logOut={logOut} /> : <Inbox user={user} goToRick={goToRick} inbox={inbox} modalOpen={modalOpen} setModalOpen={setModalOpen} />}
      </div>
    );
  }
  return (
    <div style={styles[`${deviceType}`]}>
      <Inbox user={user} goToRick={goToRick} inbox={inbox} modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <Messenger inbox={inbox} logOut={logOut} />
    </div>
  );
};


const mapStateToProps = ({ auth, notifications, views }) => {
  const { user } = auth;
  const { device, view } = views;
  return ({
    user,
    notifications,
    deviceType: device,
    view,
  });
};

const mapDispatchToProps = {
  goToRick: rickAstley,
  logOut: signOut,
};


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
