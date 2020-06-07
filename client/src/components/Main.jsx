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

const Main = ({ user, isLoggedIn, activeChat, updateChatList, newConnection, usersChats }) => {
  // const { chats } = user;
  const initSocket = (currentChat) => {
    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on('MESSAGE_RECIEVED', (updatedChat) => {
      console.log(usersChats, 'LOOOOK HERE');
      const inChats = usersChats.some((chat) => {
        console.log(chat._id === updatedChat._id, 'looking in chat');
        return chat._id === updatedChat._id;
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
      console.log(chat, inNewChat, 'IN NEW CHAT, MAIN.JSX')
      if (inNewChat) updateChatList(chat);
    });
    socket.emit('USER_CONNECTED', user);
    socket.on('NEW_USER_CONNECTED', (connectedUsers) => {
      newConnection(connectedUsers);
    });
    socket.on('USER_TYPING', (typingUsers) => {
      console.log(typingUsers);
      updateTypingUsers(typingUsers);
    });
    socket.on('STOP_TYPING', (typingUsers) => {
      console.log(typingUsers);
      store.dispatch({
        type: 'STOP_TYPING',
        payload: typingUsers,
      });
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
      <Dashboard activeChat={activeChat} />
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
    usersChats: chats['chats'],
  });
};

const mapDispatchToProps = {
  updateChatList: updateChat,
  newConnection: newLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
