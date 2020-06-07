/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import SocketContext from '../context/index';
import { updateConnectedUsers, loadCommunityChat, loadChats } from '../redux/actions/chats';
import store from '../redux/index';


const socketUrl = 'http://localhost:1000/';

const socket = io(socketUrl);

const Main = ({ user, isLoggedIn, updateConnections, loadCommunity, loadUsersChats }) => {

  const initSocket = () => {
    socket.emit('USER_CONNECTED', user);
    socket.on('NEW_USER_CONNECTED', (connectedUsers) => {
      updateConnections(connectedUsers);
    });
    socket.on('USER_DISCONNECTED', (connectedUsers) => {
      console.log(connectedUsers, 'CONNECTED USERS');
      updateConnections(connectedUsers);
    });
    socket.on('MESSAGE_SENT', (message) => {
      console.log(message, 'RECIEVED');
    });
  };

  const disconnect = () => {
    if (user) {
      socket.emit('DISCONNECTING', user);
    }
  };

  useEffect(() => {
    if (user) {
      initSocket();
      loadCommunity();
      loadUsersChats(user);
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
const mapStateToProps = ({ auth, chat }) => {
  const { user, isLoggedIn } = auth;
  const { activeChat } = chat;
  // const { activeChat } = chats;
  return ({
    isLoggedIn,
    user,
    activeChat,
    // activeChat,
    // usersChats: chats['chats'],
  });
};

const mapDispatchToProps = {
  updateConnections: updateConnectedUsers,
  loadCommunity: loadCommunityChat,
  loadUsersChats: loadChats,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
