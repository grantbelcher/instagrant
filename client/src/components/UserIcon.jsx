import React from 'react';
import Badge from '@material-ui/core/Badge';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const UserIcon = ({ name, imgUrl, connectedUsers }) => {
// const UserIcon = ({ name, imgUrl }) => {
  // if (!connectedUsers) return null;
  const connected = (connectedUsers[name] !== undefined);
  return (
    <ListItemAvatar>
      <Badge
        color="secondary"
        badgeContent="10"
        variant="dot"
        invisible={!connected}
        overlap="circle"
      >
        <Avatar alt={name} src={imgUrl} />
      </Badge>
    </ListItemAvatar>
  );
};

const mapStateToProps = ({ chat }) => {
  const { connectedUsers } = chat;
  return {
    connectedUsers,
  };
};

export default connect(mapStateToProps, null)(UserIcon);
