import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import NewChat from './NewChat';
import ChatDisplay from './ChatDisplay';
import SocketContext from '../context/index';
import { selectChat } from '../redux/actions/chats';

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

const Dashboard = ({ socket, user, chatSelector }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const context = useContext(SocketContext);

  const logOutClick = () => {
    context.emit('MESSAGE_SENT', 'testing');
  };

  // setActiveChat = (chat) => {
  //   chatSelector()
  // }

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
        <div>Chat List</div>
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
          <NewChat open={modalOpen} setModalOpen={setModalOpen} style={{ minHeight: 1000 }} />
        </div>
        <ChatDisplay />
      </div>
    </div>
  );
};

const mapStateToProps = ({ socket, auth }) => {
  const { user } = auth;
  return ({
    user,
    socket,
  });
};

const mapDispatchToProps = {
  chatSelector: selectChat,
};

export default connect(mapStateToProps, null)(Dashboard);
