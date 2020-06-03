import React, { } from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import UserIcon from './UserIcon';

const ChatListItem = ({ chat }) => {
  const { users, messages, name } = chat;
  let usernames;
  if (users !== undefined && users.length > 0) {
    usernames = users.reduce((acc, user) => acc + user.name, '');
  }
  console.log(users, messages);
  return (
    <>
      <ListItem>
        <UserIcon name="test" imgUrl="" />
        <UserIcon name="test" imgUrl="" />
        <ListItemText
          primary={usernames ? usernames : 'yo'}
          secondary="yo"
        />
      </ListItem>
      <Divider />
    </>
  );
};

// ChatListItem.propTypes = {
//   users: PropTypes.array.isRequired,
//   messages: PropTypes.array.isRequired,
//   name: PropTypes.string,
// };

// ChatListItem.defaultProps = {
//   users: [{
//     name: 'loading',
//     avatar: 'https://static1.squarespace.com/static/54b7b93ce4b0a3e130d5d232/54e20ebce4b014cdbc3fd71b/5a992947e2c48320418ae5e0/1519987239570/icon.png',
//   },
//   {
//     name: 'loading',
//     avatar: 'https://static1.squarespace.com/static/54b7b93ce4b0a3e130d5d232/54e20ebce4b014cdbc3fd71b/5a992947e2c48320418ae5e0/1519987239570/icon.png',
//   }],
//   messages: [{

//   }],
// };


export default ChatListItem;
