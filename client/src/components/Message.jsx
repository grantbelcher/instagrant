import React from 'react';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

const styles = {
  message: {
    backgroundColor: '#DFF9F6',
  },
  myMessage: {
    backgroundColor: '#F9DFF2',
  }
}

const Message = ({ message, name }) => {
  return (
    <>
      <ListItem style={(name === message.username) ? styles.myMessage : styles.message} >
        <ListItemAvatar>
          <Avatar alt={message.username} src={message.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={message.username}
          secondary={message.text}
        />
      </ListItem>
      <Divider />
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return {
    name: user.name,
  };
};

export default connect(mapStateToProps, null)(Message);
