import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import ChatDisplay from '../components/ChatDisplay';
import Header from '../components/Header';


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
  col2: {
    width: '70%',
    border: 'solid',
    borderColor: '#CCCCCC',
    borderWidth: 'thin',
  },
  icon: {
    marginRight: '1vw',
    marginLeft: '1vw',
  },
  userInfoHeader: {
    marginLeft: '1vw',
  },
}

const Messager = ({ logOut }) => {
  return (
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
      </Paper>
      <ChatDisplay />
    </div>
  );
};

export default Messager;
