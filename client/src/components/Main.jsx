/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import store from '../redux/index';
import { addSocket } from '../redux/actions/socket';
import SocketContext from '../context/index';

const socketUrl = 'http://705372ac8c30.ngrok.io/';

const socket = io(socketUrl);

const Main = ({ user, isLoggedIn }) => {
  // const initSocket = () => {
  //   const socket = io(socketUrl);
  //   socket.on('connect', (data) => {
  //     store.dispatch(addSocket(socket));
  //   });
  //   console.log(socket.emit);
  //   socket.emit('USER_CONNECTED', user);
  // };
  const initSocket = () => {
    socket.on('connect', () => {
      console.log('connected');
    });
    socket.emit('USER_CONNECTED', user);
  };

  useEffect(() => {
    if (user) {
      console.log(user, 'initializing');
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
