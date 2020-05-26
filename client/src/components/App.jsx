import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import MessageList from './MessageList';
import TextInput from './TextInput';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1,
    width: '100vw',
    top: '0%',
  },
  header: {
    backgroundColor: 'steelBlue',
    width: '100vw',
    textAlign: 'center',
    fontSize: '6vh',
    padding: '2vh',
  },
};

const App = () => {
  useEffect(() => {
    const endpoint = 'http://ec9112ac.ngrok.io';
    const socket = socketIOClient(endpoint);
    socket.on('FROMAPI', (data) => console.log(data));
  }, []);
  return (
    <div>
      <div style={styles.container}>
        <div style={styles.header}>InstaGrant</div>
        <MessageList />
      </div>
      <TextInput />
    </div>
  );
};

export default App;
