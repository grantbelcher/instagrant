/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */

import React, { useState, useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import SocketContext from '../context/index';
import { selectChat } from '../redux/actions/chats';

const styles = {
  container: {
    position: 'absolute',
    width: '69.4%',
    bottom: '0%',
    backgroundColor: 'rgba(245, 208, 235, 0.4)',
  },
  mobile: {
    position: 'absolute',
    width: '90vw',
    paddingRight: '4vw',
    paddingLeft: '4vw',
    paddingBottom: '4vw',
    bottom: '0%',
    backgroundColor: 'rgba(245, 208, 235, 0.4)',
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
    backgroundColor: 'rgb(198, 245, 239)',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'flex-end',
    flex: 1,
    padding: 11,
    marginLeft: 1,
  },
  typing: {
    paddingBottom: 3,
    marginBottom: '1vh',
    marginLeft: '1vw',
  },
  error: {
    paddingBottom: 3,
    marginBottom: '1vh',
    marginLeft: '1vw',
    color: 'red',
  },
};

const TextInput = ({
  user, activeChat, typingUsers, device,
}) => {
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);
  const [spam, setSpam] = useState(false);
  const [error, setError] = useState(null);

  const connection = useContext(SocketContext);
  const sendMessage = () => {
    if (text.length > 0) {
      if (!spam) {
        connection.emit('SENDING_MESSAGE', { user, text, chatId: activeChat._id });
        setSpam(true);
        setTimeout(() => {
          setSpam(false);
        }, 5000);
      } else {
        setError('stop spamming!!!!');
        setTimeout(() => {
          setError(null);
        }, 5000);
      }
    } else {
      setError('please type something*');
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
    setText('');
  };

  const typeHandle = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
    const userData = {
      ...user,
      chatId: activeChat._id,
    };
    connection.emit('TYPING', userData);
    setTimeout(() => {
      connection.emit('STOP_TYPING', userData);
    }, 5000);
  };
  const typingUsersList = Object.values(typingUsers);
  const usersTypingInChat = typingUsersList.filter((item) => ((item.chatId === activeChat._id) && (item._id !== user._id)));
  let typingString = null;
  if (usersTypingInChat.length === 1) {
    typingString = `${usersTypingInChat[0].name} is typing...`;
  }
  if (usersTypingInChat.length > 1) {
    typingString = 'Users are typing...';
  }
  const button = <i className="fa fa-paper-plane fa-sm" style={styles.iconBorder} onClick={sendMessage} />
  return (
    <>
      <Paper style={device === 'mobile' ? styles.mobile : styles.container}>
        <div style={styles.error}>
          {error}
        </div>
        <div style={styles.typing}>
          {typingString}
        </div>
        <div style={styles.g}>
          <textarea
            rows="2"
            placeholder="whats up?"
            value={text}
            style={styles.input}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => typeHandle(e)}
          />
          {device === 'desktop' ? button : null}
        </div>
      </Paper>
    </>
  );
};

const mapStateToProps = ({ auth, chat, views }) => {
  const { user } = auth;
  const { activeChat, typingUsers } = chat;
  const { device } = views;
  return {
    user,
    activeChat,
    typingUsers,
    device,
  };
};


export default connect(mapStateToProps, null)(TextInput);
