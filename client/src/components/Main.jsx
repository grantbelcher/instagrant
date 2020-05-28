/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import io from 'socket.io-client';
import Dashboard from './Dashboard';

const socketUrl = 'http://5546de74ed9d.ngrok.io/';

const Main = () => {
  const initSocket = () => {
    const connection = io(socketUrl);
    connection.on('connect', () => {
      console.log('connected');
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
