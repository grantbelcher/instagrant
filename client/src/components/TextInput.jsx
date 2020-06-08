/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */

import React, { useState, useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import SocketContext from '../context/index';
import { selectChat } from '../redux/actions/chats';

const styles = {
  container: {
    position: 'absolute',
    width: '69%',
    bottom: '0%',
    backgroundColor: 'rgba(355, 355, 355, 0.8)',
  },
  g: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderRadius: 5,
    alignSelf: 'flex-start',
    resize: 'none',
    flex: 49,
  },
  iconBorder: {
    position: 'relative',
    borderRadius: '20%',
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'flex-end',
    flex: 1,
    padding: '2.3%',
    marginLeft: 5,
  },
};

const TextInput = ({ user, activeChat, typingUsers }) => {
  const [text, setText] = useState('');
  const [typing, setTyping] = useState('false');
  const connection = useContext(SocketContext);
  const sendMessage = () => {
    if (text.length > 0) {
      connection.emit('SENDING_MESSAGE', { user, text, chatId: activeChat._id });
    } else {
      console.log('error');
    }
    setText('');
  };

  const typeHandle = () => {
    console.log('called');
    const userData = {
      ...user,
      chatId: activeChat._id,
    };
    if (typing) {
      console.log('typing is true');
      connection.emit('TYPING', userData);
      setTimeout(() => {
        connection.emit('STOP_TYPING', userData);
      }, 4000);
    } else {
      console.log('typing is false');
    }
  };
  const typingUsersList = Object.values(typingUsers);
  const usersTypingInChat = typingUsersList.filter((item) => ((item.chatId === activeChat._id) && (item._id !== user._id)));
  let typingString = null;
  if (usersTypingInChat.length === 1) {
    typingString = `${usersTypingInChat[0].name} is typing...`;
  }
  if (usersTypingInChat.length > 1) {
    typingString = 'users typing...';
  }
  return (
    <>
      <div style={{fontWeight: 'bold'}}>{typingString}</div>
      <div style={styles.container}>
        <div style={styles.g}>
          <textarea
            rows="2"
            placeholder="whats up?"
            value={text}
            style={styles.input}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={typeHandle}
          />
          <i className="fas fa-paper-plane fa-sm" style={styles.iconBorder} onClick={sendMessage} />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ auth, chat }) => {
  const { user } = auth;
  const { activeChat, typingUsers } = chat;
  return {
    user,
    activeChat,
    typingUsers,
  };
};


export default connect(mapStateToProps, null)(TextInput);
