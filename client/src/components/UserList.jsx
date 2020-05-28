import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const UserList = ({ users }) => {
  const listItems = users.map((user) => (
      <ListItem button divider>
        <ListItemAvatar>
          <Avatar>
            ????
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={user.name} secondary="placeholder" />
      </ListItem>
  ));
  return (
    <List>
      Suggestions:
      {listItems}
    </List>
  );
};


export default UserList;
