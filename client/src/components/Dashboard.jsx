import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import store from '../redux/index';
import { signOut } from '../redux/actions/auth';
import { removeSocket } from '../redux/actions/socket';
import NewChat from './NewChat';
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

const Dashboard = ({ socket, user }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const context = useContext(SocketContext);
  console.log(context, 'context');
  console.log(socket, 'yooo');
  const logOutClick = () => {
    context.emit('MESSAGE_SENT', 'testing');
  };

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
            <button onClick={logOutClick} >click</button>
            {/* <Link color="inherit" href="/" onClick={logOutClick}>
              log out
              <i className="fas fa-cog fa-lg" style={styles.icon} />
            </Link> */}
          </Breadcrumbs>
          <NewChat open={modalOpen} setModalOpen={setModalOpen} style={{ minHeight: 1000 }} />
        </div>
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

export default connect(mapStateToProps, null)(Dashboard);
