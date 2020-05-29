/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import store from '../redux/index';
import { addSocket } from '../redux/actions/socket';

const socketUrl = 'http://705372ac8c30.ngrok.io/';

const Main = ({ user, isLoggedIn }) => {
  const initSocket = () => {
    const socket = io(socketUrl);
    socket.on('connect', () => {
      store.dispatch(addSocket(socket));
    });
    socket.emit('USER_CONNECTED', user);
  };
  // useEffect(() => {
  //   initSocket();
  // }, []);
  useEffect(() => {

    if (user) {
      console.log(user, 'initializing');
      initSocket();
    }
    console.log('init');
  }, [user]);


  return (
    <>
      <Dashboard />
    </>
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
