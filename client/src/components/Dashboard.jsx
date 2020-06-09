import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import NewChat from './NewChat';
import ChatList from './ChatList';
import ChatDisplay from './ChatDisplay';
import Header from './Header';
import SocketContext from '../context/index';


const styles = {
  container: {
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
const Dashboard = ({ user, notifications }) => {
  const [modalOpen, setModalOpen] = useState(false);
  let inbox = null;
  if (user && notifications) {
    inbox = notifications.length
  }
  // const context = useContext(SocketContext);

  return (
    <div style={styles.container}>
      <div style={styles.col1}>
        <div style={styles.headerLeft}>
          <Tooltip
            title={inbox === 1 ? `${inbox} unread chat` : `${inbox} unread chats`}
          >
            <Badge
              color="primary"
              badgeContent={inbox}
            >
              <i className="fas fa-bell fa-lg" style={styles.icon} />
            </Badge>

          </Tooltip>
          {/* <div /> */}
          <div style={styles.direct}>
            <h2>DMs</h2>
          </div>
          <IconButton onClick={() => setModalOpen(true)}>
            <i className="far fa-edit fa-sm" style={styles.icon} />
          </IconButton>
        </div>
        <ChatList />
      </div>
      <div style={styles.col2}>
        <div style={styles.headerRight}>
          <div style={styles.userInfoHeader}>
            <Header />
          </div>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              log out
              <i className="fas fa-cog fa-lg" style={styles.icon} />
            </Link>
          </Breadcrumbs>
          <NewChat open={modalOpen} setModalOpen={setModalOpen} style={{ minHeight: 1000 }} user={user} />
        </div>
        <ChatDisplay />
      </div>
    </div>
  );
};

// Dashboard.propTypes = {
//   user: PropTypes.shape({
//     chats: PropTypes.array.isRequired,
//   }),
// };

// Dashboard.defaultProps = {
//   user: {
//     chats: [],
//   },
// };

const mapStateToProps = ({ auth, notifications }) => {
  const { user } = auth;
  return ({
    user,
    notifications,
  });
};


export default connect(mapStateToProps, null)(Dashboard);
