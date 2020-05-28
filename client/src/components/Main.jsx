/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import io from 'socket.io-client';
import Dashboard from './Dashboard';
import store from '../redux/index';
import { addSocket } from '../redux/actions/socket';

const socketUrl = 'http://5546de74ed9d.ngrok.io/';

const Main = () => {
  const initSocket = () => {
    const socket = io(socketUrl);
    socket.on('connect', () => {
      store.dispatch(addSocket(socket));
    });
  };
  useEffect(() => {
    initSocket();
  }, []);

  return (
    <>
      <Dashboard />
    </>
  );
};

export default Main;
