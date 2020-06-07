/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import SocketContext from '../context/index';
import { updateConnectedUsers } from '../redux/actions/chats';
import store from '../redux/index';


const socketUrl = 'http://localhost:1000/';

const socket = io(socketUrl);

const Main = ({ user, isLoggedIn, updateConnections }) => {

  const initSocket = () => {
    socket.emit('USER_CONNECTED', user);
    socket.on('NEW_USER_CONNECTED', (connectedUsers) => {
      updateConnections(connectedUsers);
    });
    socket.on('USER_DISCONNECTED', (connectedUsers) => {
      updateConnections(connectedUsers);
    });
  };

  const disconnect = () => {
    if (user) {
      socket.emit('DISCONNECTING', user);
    }
  };

  useEffect(() => {
    console.log('fuck youuuuu');
    if (user) {
      initSocket();
    }
    window.addEventListener('beforeunload', disconnect);
  }, [user]);


  return (
    <SocketContext.Provider value={socket}>
      <Dashboard />
    </SocketContext.Provider>
  );
};

// const mapStateToProps = ({ auth, chats }) => {
const mapStateToProps = ({ auth }) => {
  const { user, isLoggedIn } = auth;
  // const { activeChat } = chats;
  return ({
    isLoggedIn,
    user,
    // activeChat,
    // usersChats: chats['chats'],
  });
};

const mapDispatchToProps = {
  updateConnections: updateConnectedUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
