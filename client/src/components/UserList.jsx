/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import UserIcon from './UserIcon';

const UserList = ({ users, recipients, setRecipients }) => {
  const listItems = users.map((user) => {
    const isRecipient = recipients.find((obj) => obj._id === user._id);
    if (!isRecipient) {
      return (
        <div key={user._id}>
          <ListItem
            button
            divider
            onClick={() => setRecipients([...recipients, user])}
          >
            {/* <ListItemAvatar>
              <Avatar
                alt={user.name}
                src={`${user.avatar}`}
              />
            </ListItemAvatar> */}
            <UserIcon name={user.name} imgUrl={user.avatar} />
            <ListItemText primary={user.name} />
          </ListItem>
        </div>
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
