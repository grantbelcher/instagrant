/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import SocketContext from '../context/index';
import { selectChat, updateChat, newLogin } from '../redux/actions/chats';
const socketUrl = 'http://bd24cc33fc23.ngrok.io';

const socket = io(socketUrl);

const Main = ({ user, isLoggedIn, activeChat, updateChatList, newConnection }) => {
  // const { chats } = user;
  const initSocket = (currentChat) => {
    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on('MESSAGE_RECIEVED', (updatedChat) => {
      const inChats = user.chats.some((chat) => {
        return chat === updatedChat._id;
      });
      if (inChats) {
        updateChatList(updatedChat);
      }
    });
    socket.emit('USER_CONNECTED', user);
    socket.on('NEW_USER_CONNECTED', (connectedUsers) => {
      console.log('emitting', connectedUsers)
      newConnection(connectedUsers);
    });
  };


  useEffect(() => {
    const options = activeChat;
    if (user) {
      initSocket(options);
    }
    // awui
  }, [user, activeChat]);


  return (
    <SocketContext.Provider value={socket}>
      <Dashboard />
    </SocketContext.Provider>
  );
};

const mapStateToProps = ({ auth, chats }) => {
  const { user, isLoggedIn } = auth;
  const { activeChat } = chats;
  return ({
    isLoggedIn,
    user,
    activeChat,
  });
};

const mapDispatchToProps = {
  updateChatList: updateChat,
  newConnection: newLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
