import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import SocketContext from '../context/index';

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

const TextInput = ({ user, activeChat }) => {
  const [text, setText] = useState('');
  const connection = useContext(SocketContext);

  const sendMessage = () => {
    // add chat.Id
    if (text.length > 0) {
      connection.emit('MESSAGE_SENT', { user, text });
    }
    console.log('error');
  };

  const sendTyping = (isTyping) => {
    // add chatId
  }

  return (
    <div style={styles.container}>
      <div style={styles.g}>
        <textarea
          rows="2"
          placeholder="fucdddk"
          value={text}
          style={styles.input}
          onChange={(e) => setText(e.target.value)}
        />
        <i className="fas fa-paper-plane fa-sm" style={styles.iconBorder} onClick={sendMessage}/>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return {
    user,
  };
};

export default connect(mapStateToProps, null)(TextInput);
