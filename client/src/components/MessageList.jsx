import React from 'react';
import Message from './Message';

const styles = {
  test: {
    borderColor: 'black',
    borderWidth: 1,
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

const MessageList = () => {
  console.log('uo');
  const array = [<Message />, <Message />, <Message />, <Message />, <Message />, <Message />, <Message />, <Message />, <Message />, <Message />, <Message />, <Message />];
  return (
    <div style={styles.test}>
      {array}
    </div>
  );
};

export default MessageList;
