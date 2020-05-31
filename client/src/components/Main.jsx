/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import SocketContext from '../context/index';

const socketUrl = 'http://04abbf994ef1.ngrok.io';

const socket = io(socketUrl);

const Main = ({ user, isLoggedIn }) => {
  const initSocket = () => {
    socket.on('connect', () => {
      console.log('connected');
    });
    socket.emit('USER_CONNECTED', user);
  };

  useEffect(() => {
    if (user) {
      initSocket();
    }
    console.log('init');
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

export default connect(mapStateToProps, null)(Main);
