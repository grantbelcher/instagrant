import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

const Message = ({ message }) => {
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar alt={message.username} src={message.avatar} />
        </ListItemAvatar>
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
