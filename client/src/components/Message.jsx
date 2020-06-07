import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
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
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  messageDate: {
    fontSize: 'smaller',
    marginLeft: '5px',
  },
};

const Message = ({ message, last }) => {
  console.log(message, 'message');
// const Message = ({ message, name, last }) => {
  const { date } = message;
  let formattedDate = moment(date).fromNow();
  const [relativeTime, setRelativeTime] = useState(formattedDate);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     formattedDate = moment(date).fromNow();
  //     console.log('intervall');
  //     setRelativeTime(formattedDate);
  //   }, 30000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);
  const primaryText = (
    <div style={styles.header}>
      <div>{`${message.username}`}</div>
      <div style={styles.messageDate}>
        {' '}
        ·
        {relativeTime}
      </div>
    </div>
  );

  return (
    <>
      <ListItem
        autoFocus={last}
        style={styles.message}
        // style={(name === message.username) ? styles.myMessage : styles.message}
      >
        {/* <ListItemAvatar>
          <Avatar alt={message.username} src={message.avatar} />
        </ListItemAvatar> */}
        <UserIcon name={message.username} imgUrl={message.avatar} />
        <ListItemText
          primary={primaryText}
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

// const mapStateToProps = ({ auth }) => {
//   const { user } = auth;
//   if (user.name !== undefined) {
//     return {
//       name: user.name,
//     };
//   }
// };

export default connect(null, null)(Message);
