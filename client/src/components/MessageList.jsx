import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Message from './Message';
import Loading from './Loading';

const styles = {
  container: {
    maxHeight: '69.7vh',
    minHeight: '69.7vh',
    overflow: 'auto',
    backgroundColor: 'rgba(245, 245, 245, 0.6)',
  },
};

const MessageList = ({ activeChat, loading, loadingChats }) => {
  if (loading || loadingChats) {
    return <Loading dimensions={styles.container} />;
  }
  // return <Loading dimensions={styles.container} />;
  // if (!activeChat) return null;
  const { messages } = activeChat;
  const listEndRef = useRef(null);
  const scrollToBottom = () => {
    listEndRef.current.scrollIntoView({ behavior: "auto" });
  };

  useEffect(scrollToBottom, [messages]);
  return (
    <Paper style={styles.container}>
      <List>
        {messages.map((message, i) => {
          if (i === messages.length - 1) {
            return <Message ref={listEndRef} message={message} index={i} last={(i === messages.length - 1)} />;
          }
          return <Message message={message} index={i} last={(i === messages.length - 1)} />;
        })}
        <div ref={listEndRef} />
      </List>
    </Paper>

  );
};

const mapStateToProps = ({ chat, auth }) => {
  const { activeChat, loading: loadingChats } = chat;
  const { loading } = auth;
  return {
    activeChat,
    loading,
    loadingChats,
  };
};

export default connect(mapStateToProps, null)(MessageList);
