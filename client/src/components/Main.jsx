/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import SocketContext from '../context/index';
import { selectChat, updateChat, newLogin, updateTypingUsers } from '../redux/actions/chats';
import store from '../redux/index';


const socketUrl = 'http://localhost:1000/';

const socket = io(socketUrl);

const Main = ({ user, isLoggedIn }) => {

  const initSocket = () => {
    socket.emit('USER_CONNECTED', user);
    socket.on('NEW_USER_CONNECTED', (connectedUsers) => {
      console.log(connectedUsers);
    });
  };

  const disconnect = () => {
    socket.emit('USER_DISCONNECTED', user);
  };

  useEffect(() => {
    console.log(user);
    if (user) {
      initSocket();
    }
    window.addEventListener('beforeunload', disconnect);
  }, []);


  return (
    <SocketContext.Provider value={socket}>
      {/* <Dashboard activeChat={activeChat} /> */}
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

// const mapDispatchToProps = {
//   updateChatList: updateChat,
//   newConnection: newLogin,
// };

export default connect(mapStateToProps, null)(Main);
