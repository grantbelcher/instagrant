import React, { useEffect, useRef } from 'react';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Message from './Message';

const styles = {
  container: {
    maxHeight: '70vh',
    minHeight: '70vh',
    overflow: 'auto',
  },
};

const MessageList = ({ messages }) => {
  const listEndRef = useRef(null);
  const scrollToBottom = () => {
    listEndRef.current.scrollIntoView({ behavior: "auto" });
  };

  useEffect(scrollToBottom, [messages]);
  console.log(messages, 'look heresadsadwqawdasd');
  return (
    <Paper style={styles.container}>
      <List>
        {messages.map((message, i) => {
          
          if (i === messages.length - 1) {
            return <Message ref={listEndRef} message={message} last={(i === messages.length - 1)} />;
          }
          return <Message message={message} last={(i === messages.length - 1)} />;
        })}
        <div ref={listEndRef} />
      </List>
    </Paper>

  );
};

export default MessageList;
