import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import NewChat from './NewChat';
import ChatList from './ChatList';
import ChatDisplay from './ChatDisplay';
import Header from './Header';
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
  col1: {
    width: '30%',
    border: 'solid',
    borderColor: '#CCCCCC',
    borderWidth: 'thin',

  },
  col2: {
    width: '70%',
    border: 'solid',
    borderColor: '#CCCCCC',
    borderWidth: 'thin',
  },
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
  icon: {
    marginRight: '1vw',
    marginLeft: '1vw',
  },
  userInfoHeader: {
    marginLeft: '1vw',
  },
};

// const Dashboard = ({ user, chatSelector, loadChats, activeChat }) => {
const Dashboard = ({ user, notifications, goToRick, logOut, deviceType }) => {
  const [modalOpen, setModalOpen] = useState(false);
  let inbox = null;
  if (user && notifications) {
    inbox = notifications.length
  }
  // const context = useContext(SocketContext);

  return (
    <div style={styles[`${deviceType}`]}>
      <div style={styles.col1}>
        <Paper style={styles.headerLeft}>
          <IconButton>
            <Tooltip
              title={inbox === 1 ? `${inbox} unread chat` : `${inbox} unread chats`}
            >
              <Badge
                color="primary"
                badgeContent={inbox}
              >
                <i className="far fa-bell fa-sm" style={styles.icon} />
              </Badge>
            </Tooltip>
          </IconButton>
          <IconButton onClick={() => goToRick()}>
            <i className="fas fa-home" />
          </IconButton>

          <IconButton onClick={() => setModalOpen(true)}>
            <i className="far fa-edit fa-sm" style={styles.icon} />
          </IconButton>
        </Paper>
        <ChatList />
      </div>
      <div style={styles.col2}>
        <Paper style={styles.headerRight}>
          <div style={styles.userInfoHeader}>
            <Header />
          </div>
          <Breadcrumbs aria-label="breadcrumb">
            <IconButton color="white" onClick={logOut}>
              log out
              <i className="fas fa-cog fa-lg" style={styles.icon} />
            </IconButton>
          </Breadcrumbs>
          <NewChat open={modalOpen} setModalOpen={setModalOpen} style={{ minHeight: 1000 }} user={user} />
        </Paper>
        <ChatDisplay />
      </div>
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
