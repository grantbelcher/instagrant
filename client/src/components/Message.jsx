import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import UserIcon from './UserIcon';

const styles = {
  message: {
    backgroundColor: '#DFF9F6',
  },
  myMessage: {
    backgroundColor: '#F9DFF2',
  },
};

const Message = ({ message, name, last }) => {
  return (
    <>
      <ListItem
        autoFocus={last}
        style={(name === message.username) ? styles.myMessage : styles.message}
      >
        {/* <ListItemAvatar>
          <Avatar alt={message.username} src={message.avatar} />
        </ListItemAvatar> */}
        <UserIcon name={message.username} imgUrl={message.avatar} />
        <ListItemText
          primary={message.username}
          secondary={message.text}
        />
      </ListItem>
      <Divider />
    </>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string,
    username: PropTypes.string,
    avatar: PropTypes.string,
  }),
};

Message.defaultProps = {
  message: {
    text: '',
    username: '',
    avatar: '',
  },
};

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  if (user.name !== undefined) {
    return {
      name: user.name,
    };
  }
};

export default connect(mapStateToProps, null)(Message);
