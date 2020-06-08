import React from 'react';
import Badge from '@material-ui/core/Badge';
import { connect } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);


const UserIcon = ({ name, imgUrl, connectedUsers }) => {
// const UserIcon = ({ name, imgUrl }) => {
  // if (!connectedUsers) return null;
  const connected = (connectedUsers[name] !== undefined);
  return (
    <ListItemAvatar>
      <StyledBadge
        color="secondary"
        badgeContent="10"
        variant="dot"
        invisible={!connected}
        overlap="circle"
      >
        <Avatar alt={name} src={imgUrl} />
      </StyledBadge>
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
