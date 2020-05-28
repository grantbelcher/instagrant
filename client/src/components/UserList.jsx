/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';

const UserList = ({ users, recipients, setRecipients }) => {
  const listItems = users.map((user) => {
    const isRecipient = recipients.find((obj) => obj._id === user._id);
    if (!isRecipient) {
      return (
        <ListItem
          button
          divider
          key={user.id}
          onClick={() => setRecipients([...recipients, user])}
        >
          <ListItemAvatar>
            <Avatar>
              ????
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary="placeholder" />
        </ListItem>
      );
    }
  });
  return (
    <List>
      Suggestions:
      {listItems}
    </List>
  );
};


export default UserList;
