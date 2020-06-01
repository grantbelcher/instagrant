import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

// const styles = {
// };

const Message = ({ message }) => {
  console.log(message);
  return (
    <>
      <ListItem>
        <ListItemText
          primary={message.username}
          secondary={message.text}
        />
      </ListItem>
      <Divider />
    </>
  );
};

export default Message;
