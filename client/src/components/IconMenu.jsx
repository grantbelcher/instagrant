import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    backgroundColor: 'rgba(223, 249, 246, 0.9)',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: '#a1c9c5',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: 'black',
      },
    },
  },
}))(MenuItem);


// const styles = {
//   icon: {
//     marginRight: '1vw',
//     marginLeft: '1vw',
//   },
// };

const IconMenu = ({ logOut, device, inbox }) => {
  // return (
  // <IconButton onClick={logOut}>
  //   <i className="fas fa-bars fa-lg" />
  // </IconButton>
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(inbox)
  return (
    <div style={{ paddingRight: '4vw' }}>
        <Badge
          color="primary"
          badgeContent={4}
        >
          <IconButton
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            onClick={handleClick}
            style={{ backgroundColor: 'rgba(245, 208, 235, 0.9)' }}
          >
            <i className="fas fa-bars fa-lg" style={{ color: 'black' }} />
          </IconButton>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem>
              <ListItemIcon>
                <i className="fas fa-home" />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </StyledMenuItem>
            <StyledMenuItem>
              <ListItemIcon>
                <i className="fas fa-envelope-open-text" />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </StyledMenuItem>
            <StyledMenuItem>
              <ListItemIcon onClick={logOut}>
                <i className="fas fa-door-open" />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </StyledMenuItem>
          </StyledMenu>
        </Badge>
    </div>
  );
};

export default IconMenu;

  // <Tooltip
  //   title={inbox === 1 ? `${inbox} unread chat` : `${inbox} unread chats`}
  // >
  //   <Badge
  //     color="primary"
  //     badgeContent={inbox}
  //   />
  // </Tooltip>;
