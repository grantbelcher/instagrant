import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextInput from './TextInput';
import MessageList from './MessageList';

const ChatDisplay = ({ activeChat }) => {
  const [messages, setMessages] = useState([]);
  // useEffect(() => {
  //   if (activeChat !== null) {
  //     const newMessages = activeChat.messages.map((message) => {
  //       return <div>{message.text}</div>;
  //     });
  //     setMessages(newMessages);
  //   }
  // }, [activeChat]);
  return (
    <div>
      <MessageList messages={activeChat.messages} />
      <TextInput activeChat={activeChat} />
    </div>
  );
};

const mapStateToProps = ({ chats }) => {
  const { activeChat } = chats;
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
