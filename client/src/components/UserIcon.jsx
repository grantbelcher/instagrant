import React from 'react';
import Badge from '@material-ui/core/Badge';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const connectedUsers = {};
// const UserIcon = ({ name, imgUrl, connectedUsers }) => {
const UserIcon = ({ name, imgUrl }) => {
  const connected = (connectedUsers[name] !== undefined);
  return (
  <ListItemAvatar>
    <Badge
      color="secondary"
      badgeContent="10"
      variant="dot"
      overlap="circle"
      invisible={!connected}
    >
      <Avatar alt={name} src={imgUrl} />
    </Badge>
  </ListItemAvatar>
  );
};

// const mapStateToProps = ({ chats }) => {
//   const { connectedUsers } = chats;
//   return {
//     connectedUsers,
//   };
// };

export default connect(null, null)(UserIcon);
