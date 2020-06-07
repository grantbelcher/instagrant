/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import SocketContext from '../context/index';
import { updateConnectedUsers, loadCommunityChat } from '../redux/actions/chats';
import store from '../redux/index';


const socketUrl = 'http://localhost:1000/';

const socket = io(socketUrl);

const Main = ({ user, isLoggedIn, updateConnections, loadCommunity }) => {

  const initSocket = () => {
    socket.emit('USER_CONNECTED', user);
    socket.on('NEW_USER_CONNECTED', (connectedUsers) => {
      updateConnections(connectedUsers);
    });
    socket.on('USER_DISCONNECTED', (connectedUsers) => {
      console.log(connectedUsers, 'CONNECTED USERS');
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
      loadCommunity();
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
  loadCommunity: loadCommunityChat,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
