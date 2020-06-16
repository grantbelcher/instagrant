import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextInput from './TextInput';
import MessageList from './MessageList';
// import placeholder from '../../../utils/placeholder';

const ChatDisplay = ({ activeChat }) => {
  console.log('RERENDERED')
  return (
    <>
      <MessageList />
      <TextInput chat={activeChat} />
    </>
  );
};

const mapStateToProps = ({ chat }) => {
  const { activeChat } = chat;
  return {
    activeChat,
  };
};

ChatDisplay.propTypes = {
  activeChat: PropTypes.shape({
    messages: PropTypes.array.isRequired,
  }),
};

ChatDisplay.defaultProps = {
  activeChat: {
    messages: [],
  },
};

export default connect(mapStateToProps, null)(ChatDisplay);
