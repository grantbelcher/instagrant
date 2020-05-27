import React, { useState } from 'react';
import socketIOClient from 'socket.io-client';
// import MessageList from './MessageList';
// import TextInput from './TextInput';

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
  },
  userInfoHeader: {
    marginLeft: '1vw',
  },
};

const App = () => {
  const [messages, setMessages] = useState([]);
  const endpoint = 'http://localhost:1000';
  const socket = socketIOClient(endpoint);

  // const sendMessage = (text) => {
  //   socket.emit('send', text);
  // };

  socket.on('recieve message', (data) => {
    console.log(messages, 'l');
    setMessages([...messages, data]);
  });
  console.log(messages, 'jjjjjpussy');

  return (
    <div style={styles.container}>
      <div style={styles.col1}>
        <div style={styles.headerLeft}>
          <div />
          <div style={styles.direct}>Direct</div>
          <i className="far fa-edit fa-lg" style={styles.icon} />
        </div>
        <div>Chat List</div>
      </div>
      <div style={styles.col2}>
        <div style={styles.headerRight}>
          <div style={styles.userInfoHeader}>User info</div>
          <i className="fas fa-info-circle fa-lg" style={styles.icon} />
        </div>
      </div>
    </div>
  );
};

export default App;
