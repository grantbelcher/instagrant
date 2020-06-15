import React from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import ChatList from '../components/ChatList';
import NewChat from '../components/NewChat';
import { signOut } from '../redux/actions/auth';

const styles = {
  container: {
    width: '30%',
    border: 'solid',
    borderColor: '#CCCCCC',
    borderWidth: 'thin',
  },
  mobile: {
    width: '100%',
    border: 'solid',
    borderColor: '#CCCCCC',
    borderWidth: 'thin',
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
  icon: {
    marginRight: '1vw',
    marginLeft: '1vw',
  },
};


const Inbox = ({
  inbox, goToRick, modalOpen, setModalOpen, user, device, logOut
}) => {
  const logOutIcon = (
    <IconButton onClick={logOut}>
      <i className="fas fa-door-open" />
    </IconButton>
  );
  return (
    <div style={device === 'mobile' ? styles.mobile : styles.container}>
      <Paper style={styles.headerLeft}>
        {device === 'mobile' ? logOutIcon : null}
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
        <IconButton onClick={() => setModalOpen(true)}>
          <i className="far fa-edit fa-sm" style={styles.icon} />
        </IconButton>
      </Paper>
      <ChatList />
      <NewChat open={modalOpen} setModalOpen={setModalOpen} style={{ minHeight: 1000 }} user={user} />
    </div>
  );
};

const mapStateToProps = ({ views }) => {
  const { device } = views;
  return {
    device,
  };
};

const mapDispatchToProps = {
  logOut: signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
