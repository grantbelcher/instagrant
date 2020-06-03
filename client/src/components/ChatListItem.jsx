import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import UserIcon from './UserIcon';
import Divider from '@material-ui/core/Divider';

const ChatListItem = ({ avatar, chatName }) => {
  const test = 'test'
  return (
  <>
    <ListItem>
      <UserIcon name="test" imgUrl={avatar} />
      <ListItemText
        primary={chatName}
      />
    </ListItem>
    <Divider />
  </>
  );
}

export default ChatListItem;
