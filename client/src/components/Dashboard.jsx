import React, { useState, useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import NewChat from './NewChat';
import ChatList from './ChatList';
import ChatDisplay from './ChatDisplay';
import SocketContext from '../context/index';
import { selectChat, getChats } from '../redux/actions/chats';

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
    height: '7vh',
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
    height: '7vh',
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

const Dashboard = ({ user, chatSelector, loadChats }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const context = useContext(SocketContext);

  const logOutClick = () => {
    context.emit('MESSAGE_SENT', 'testing');
  };

  useEffect(() => {
    context.emit('COMMUNITY_CHAT', (chat) => {
      chatSelector(chat);
    });
  }, []);

  useEffect(() => {
    loadChats(user.chats);
  }, [user]);

  return (
    <div style={styles.container}>
      <div style={styles.col1}>
        <div style={styles.headerLeft}>
          <div />
          <div style={styles.direct}>Direct</div>
          <IconButton onClick={() => setModalOpen(true)}>
            <i className="far fa-edit fa-sm" style={styles.icon} />
          </IconButton>
        </div>
        <ChatList />
      </div>
      <div style={styles.col2}>
        <div style={styles.headerRight}>
          <div style={styles.userInfoHeader}>User info</div>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/" onClick={logOutClick}>
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

Dashboard.propTypes = {
  user: PropTypes.shape({
    chats: PropTypes.array.isRequired,
  }),
};

Dashboard.defaultProps = {
  user: {
    chats: [],
  },
};

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return ({
    user,
  });
};

const mapDispatchToProps = {
  chatSelector: selectChat,
  loadChats: getChats,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
