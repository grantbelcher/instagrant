import React from 'react';
import { connect } from 'react-redux';
import TextInput from './TextInput';

const ChatDisplay = ({ activeChat }) => {
  return (
    <div>
      <div>Active Chat</div>
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
