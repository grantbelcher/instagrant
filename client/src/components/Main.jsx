/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import SocketContext from '../context/index';
import { selectChat } from '../redux/actions/chats';
const socketUrl = 'http://81df685322e8.ngrok.io';

const socket = io(socketUrl);

const Main = ({ user, isLoggedIn }) => {
  // const { chats } = user;
  const initSocket = () => {
    socket.on('connect', () => {
      console.log('connected');
    });
    // socket.on('MESSAGE_RECIEVED', (updatedChat) => {
    //   const inChats = chats.some((chat) => {
    //     console.log(chat._id, updatedChat._id, 'MESSAGE RECIEVED');
    //     return chat._id === updatedChat._id;
    //   });
    //   if (inChats) {
        
    //   }
    // });
    socket.emit('USER_CONNECTED', user);
  };

  useEffect(() => {
    if (user) {
      initSocket();
    }
    // awui
  }, [user]);


  return (
    <SocketContext.Provider value={socket}>
      <Dashboard />
    </SocketContext.Provider>
  );
};

const mapStateToProps = ({ auth }) => {
  const { user, isLoggedIn } = auth;
  return ({
    isLoggedIn,
    user,
  });
};

const mapDispatchToProps = {
  updateChat: selectChat,
};

export default connect(mapStateToProps, null)(Main);
