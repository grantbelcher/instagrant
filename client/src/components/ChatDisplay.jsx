import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextInput from './TextInput';
import MessageList from './MessageList';
import placeholder from '../../../utils/placeholder';

const ChatDisplay = ({ activeChat }) => {
  const [messages, setMessages] = useState(placeholder);
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
      <MessageList messages={messages} />
      <TextInput />
    </div>
  );
};

// const mapStateToProps = ({ chats }) => {
//   const { activeChat } = chats;
//   return {
//     activeChat,
//   };
// };

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

export default connect(null, null)(ChatDisplay);
