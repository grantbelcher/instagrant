/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
import React, { useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import Home from './Home';
import SocketContext from '../context/index';
import { startTimer } from '../redux/actions/timer';
import {
  updateConnectedUsers, loadCommunityChat, loadChats, updateChats, updateChatsRecipient, createNewChat, updateTypingUsers,
} from '../redux/actions/chats';
import store from '../redux/index';


const socketUrl = '/';

const socket = io(socketUrl);

const Main = ({
  user, token, isLoggedIn, updateConnections, loadCommunity, loadUsersChats, chats, updateChatList, createChat, updateTyping, updateRecipientChats, notifications, startTime, rickAstley, deviceType,
}) => {
  const initSocket = () => {
    socket.emit('USER_CONNECTED', user);
    socket.on('NEW_USER_CONNECTED', (connectedUsers) => {
      updateConnections(connectedUsers);
    });
    socket.on('USER_DISCONNECTED', (connectedUsers) => {
      updateConnections(connectedUsers);
    });
    socket.on('MESSAGE_SENT', (updatedChat) => {
      updateChatList(updatedChat);
    });
    socket.on('MESSAGE_RECIEVED', (updatedChat) => {
      updateRecipientChats(updatedChat);
    });
    socket.on('MESSAGE_LIKED', (updatedChat) => {
      updateChatList(updatedChat);
    });
    socket.on('LIKE_RECIEVED', (updatedChat) => {
      updateRecipientChats(updatedChat, true);
    });
    socket.on('NEW_CHAT_CREATED', (newChat) => {
      createChat(newChat);
    });
    socket.on('USER_TYPING', (typingUsers) => {
      updateTyping(typingUsers);
    });
  };
  const disconnect = () => {
    if (user) {
      axios.patch('/users/notifications', { userId: user._id, notifications: store.getState().notifications });
      socket.emit('DISCONNECTING', user);
    }
  };

  useEffect(() => {
    if (user) {
      startTime();
      initSocket();
      loadCommunity();
      loadUsersChats(user);
    }
    window.addEventListener('beforeunload', disconnect);
  }, [user]);

  if (rickAstley) {
    return <Home />;
  }

  return (
    <SocketContext.Provider value={socket}>
      <Dashboard />
    </SocketContext.Provider>
  );
};

// const mapStateToProps = ({ auth, chats }) => {
const mapStateToProps = ({
  auth, chat, notifications, timer, dimensions,
}) => {
  const { user, isLoggedIn, token } = auth;
  const { activeChat, chats } = chat;
  const { rickAstley } = timer;
  // const { activeChat } = chats;
  return ({
    isLoggedIn,
    user,
    activeChat,
    chats,
    token,
    notifications,
    rickAstley,
    deviceType: dimensions,
    // activeChat,
    // usersChats: chats['chats'],
  });
};

const mapDispatchToProps = {
  updateConnections: updateConnectedUsers,
  loadCommunity: loadCommunityChat,
  loadUsersChats: loadChats,
  updateChatList: updateChats,
  createChat: createNewChat,
  updateTyping: updateTypingUsers,
  updateRecipientChats: updateChatsRecipient,
  startTime: startTimer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
