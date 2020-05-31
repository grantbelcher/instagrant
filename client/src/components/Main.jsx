/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import SocketContext from '../context/index';
import { selectChat, updateChat } from '../redux/actions/chats';
const socketUrl = 'http://81df685322e8.ngrok.io';

const socket = io(socketUrl);

const Main = ({ user, isLoggedIn, activeChat, updateChatList }) => {
  const { chats } = user;
  const initSocket = (currentChat) => {
    console.log(currentChat, 'activeChat');
    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on('MESSAGE_RECIEVED', (updatedChat) => {
      const inChats = chats.some((chat) => {
        return chat === updatedChat._id;
      });
      if (inChats) {
        updateChatList(updatedChat);
      }
    });
    socket.emit('USER_CONNECTED', user);
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
