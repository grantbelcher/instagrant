import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Message from './Message';
import Loading from './Loading';

const styles = {
  desktop: {
    maxHeight: '69.7vh',
    minHeight: '69.7vh',
    overflow: 'auto',
    backgroundColor: 'rgba(245, 245, 245, 0.6)',
  },
  mobile: {
    maxHeight: '78vh',
    minHeight: '78vh',
    overflow: 'auto',
    backgroundColor: 'rgba(245, 245, 245, 0.6)',
  },
};

const MessageList = ({ activeChat, loading, loadingChats, device }) => {
  if (loading || loadingChats) {
    return <Loading dimensions={styles.container} />;
  }
  const { messages } = activeChat;
  const listEndRef = useRef(null);
  const scrollToBottom = () => {
    listEndRef.current.scrollIntoView({ behavior: "auto" });
  };

  useEffect(scrollToBottom, [messages]);
  let y;
  const trackScroll = () => {
    let element = document.getElementById('testing');
    y = element.scrollTop;
  };


  return (
    <Paper style={styles[`${device}`]}>
      <List id="testing">
        {messages.map((message, i) => {
          if (i === messages.length - 1) {
            return <Message id="last" ref={listEndRef} message={message} index={i} last={(i === messages.length - 1)} />;
          }
          return <Message message={message} index={i} last={(i === messages.length - 1)} />;
        })}
        <div ref={listEndRef} id="last"/>
      </List>
    </Paper>

  );
};

const mapStateToProps = ({ chat, auth, views }) => {
  const { activeChat, loading: loadingChats } = chat;
  const { loading } = auth;
  const { device } = views
  return {
    activeChat,
    loading,
    loadingChats,
    device,
  };
};

export default connect(mapStateToProps, null)(MessageList);
