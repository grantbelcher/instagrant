import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import TextInput from './TextInput';


const ChatDisplay = ({ activeChat }) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (activeChat !== null) {
      const newMessages = activeChat.messages.map((message) => {
        return <div>{message.text}</div>;
      });
      setMessages(newMessages);
    }
  }, [activeChat]);
  return (
    <div>
      {messages}
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

export default connect(mapStateToProps, null)(ChatDisplay);
