import React, { useEffect } from 'react';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Message from './Message';

const styles = {
  test: {
    backgroundColor: 'red',
    borderColor: 'black',
    borderWidth: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  testtwo: {
    maxHeight: 200,
    overflow: 'auto',
  },
};

const MessageList = ({ messages }) => {
  return (
    <Paper style={styles.testtwo}>
      <List>
        {messages.map((message) => <Message message={message} />)}
      </List>
    </Paper>

  );
};

export default MessageList;
