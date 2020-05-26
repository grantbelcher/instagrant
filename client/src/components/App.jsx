import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import MessageList from './MessageList';
import TextInput from './TextInput';

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
    // backgroundColor: 'red',
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
  header: {
    borderBottom: 'solid',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 'thin',
    height: '7vh',
    width: '100%',
  },
};

const App = () => {
  const [messages, setMessages] = useState([]);
  const endpoint = 'http://localhost:1000';
  const socket = socketIOClient(endpoint);

  const sendMessage = (text) => {
    socket.emit('send', text);
  };

  socket.on('recieve message', (data) => {
    console.log(messages, 'l');
    setMessages([...messages, data]);
  });
  console.log(messages, 'jjjjjpussy');

  return (
    <div style={styles.container}>
      <div style={styles.col1}>
        <div style={styles.header}>Direct</div>
        <div>Chat List</div>
      </div>
      <div style={styles.col2}>
        <div style={styles.header}>
          header2
        </div>
      </div>
    </div>
  );
};

export default App;

{/* <div>
<div style={styles.container}>
  <div style={styles.header}>InstaGrant</div>
  <MessageList />
</div>
<TextInput send={sendMessage} />
</div> */}