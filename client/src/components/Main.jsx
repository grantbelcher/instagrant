/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
import React, { useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import SocketContext from '../context/index';
import {
  updateConnectedUsers, loadCommunityChat, loadChats, updateChats, updateChatsRecipient, createNewChat, updateTypingUsers,
} from '../redux/actions/chats';
import store from '../redux/index';


const socketUrl = 'http://localhost:1000/';

const socket = io(socketUrl);

const Main = ({
 user, token, isLoggedIn, updateConnections, loadCommunity, loadUsersChats, chats, updateChatList, createChat, updateTyping, updateRecipientChats, notifications
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
const mapStateToProps = ({ auth, chat, notifications }) => {
  const { user, isLoggedIn, token } = auth;
  const { activeChat, chats } = chat;
  // const { activeChat } = chats;
  return ({
    isLoggedIn,
    user,
    activeChat,
    chats,
    token,
    notifications,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
