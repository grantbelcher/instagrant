import React from 'react';

const styles = {
  outline: {
    // borderWidth: '1em',
    borderTopColor: 'blue',
    width: '100vw',
    borderTop: 'solid',
    height: '13vh',
  },
};

const Message = (props) => {
  console.log(props);
  return (
    <div style={styles.outline}>
      <div>fuck</div>
    </div>
  );
};

export default Message;
