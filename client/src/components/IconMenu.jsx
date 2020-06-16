import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import { displayInbox } from '../redux/actions/views';
import { leaveChat } from '../redux/actions/chats';

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


const IconMenu = ({ logOut, device, notifications, showInbox, leaveActiveChat }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // let inbox;
  // console.log(notifications, 'yooooooo');
  // useContext(() => {
  //   console.log(notifications, 'useContext');
  //   if (notifications) {
  //     console.log(notifications, 'useContext IF BLOCK');
  //     inbox = notifications.length;
  //     console.log(inbox);
  //   }
  // }, []);
  let inbox;
  if (notifications) {
    inbox = notifications.length
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeViews = () => {
    leaveActiveChat();
    showInbox();
  };

  const inboxButton = (
    <StyledMenuItem onClick={changeViews}>
      <ListItemIcon>
        <Badge
          color="primary"
          badgeContent={inbox ? inbox : null}
        >
          <i className="fas fa-envelope-open-text" />
        </Badge>
      </ListItemIcon>
      <ListItemText primary="Inbox" />
    </StyledMenuItem>
  );

  return (
    // you my bitch
    <div style={{ paddingRight: '4vw' }}>
      <Badge
        color="primary"
        badgeContent={device === 'mobile' ? inbox : 0}
      >
        <IconButton
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          onClick={handleClick}
          style={{ backgroundColor: 'rgba(245, 208, 235, 0.9)' }}
        >
          <i className="fas fa-bars fa-sm" style={{ color: 'black' }} />
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
          {device === 'mobile' ? inboxButton : null}
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
const mapStateToProps = ({ notifications }) => ({
  notifications,
});

const mapDispatchToProps = {
  showInbox: displayInbox,
  leaveActiveChat: leaveChat,
};

export default connect(mapStateToProps, mapDispatchToProps)(IconMenu);
