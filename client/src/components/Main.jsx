/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import io from 'socket.io-client';
import Dashboard from './Dashboard';

const socketUrl = 'http://5546de74ed9d.ngrok.io/';

const Main = () => {
  const initSocket = () => {
    io(socketUrl, () => {
      console.log('connection made?');
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
