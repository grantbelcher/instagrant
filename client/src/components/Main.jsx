/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import SocketContext from '../context/index';
import { selectChat, updateChat, newLogin } from '../redux/actions/chats';

const socketUrl = 'http://c9442567e8ca.ngrok.io';
// const socketUrl = 'http://localhost:1000/';

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
    socket.on('NEW_CHAT', (chat) => {
      let inNewChat;
      chat.users.forEach((recipient) => {
        if (recipient._id === user._id) {
          inNewChat = true;
        }
      });
      if (inNewChat) updateChatList(chat);
    });
    socket.emit('USER_CONNECTED', user);
    socket.on('NEW_USER_CONNECTED', (connectedUsers) => {
      newConnection(connectedUsers);
    });
  };

  const disconnect = () => {
    socket.emit('USER_DISCONNECTED', user);
  };

  useEffect(() => {
    const options = activeChat;
    if (user) {
      initSocket(options);
    }
    window.addEventListener('beforeunload', disconnect);
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
