/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import UserIcon from './UserIcon';
import { selectChat } from '../redux/actions/chats';

const styles = {
  activeStyle: {
    backgroundColor: 'rgba(223, 249, 246, 0.7)',
  },
  boldFont: {
    fontWeight: 'bold',
  },
  chatItem: {
    backgroundColor: 'rgba(245, 208, 235, 0.2)',
  },
};

const ChatListItem = ({
  chat, currentUser, activeChat, handleClick, notifications, timer,
}) => {
  const { users, messages, name } = chat;
  let recipients;
  let usernames;
  let recipient;
  let recipientAvatar;
  let lastMessage;
  let chatName;
  let lastActivity;
  let secondaryText;
  let primaryText;
  let date = '';

  if (messages & messages.length > 0) {
    date = moment(message[messages.length - 1].date).fromNow();
  }

  let formattedDate = moment(date).fromNow();
  const [relativeTime, setRelativeTime] = useState(date);
  useEffect(() => {
    const interval = setInterval(() => {
      formattedDate = moment(date).fromNow();
      setRelativeTime(formattedDate);
    }, 30000);
    return () => {
      clearInterval(interval);
    };
  }, []);


  if (users !== undefined && users.length > 0) {
    recipients = users.filter((user) => user._id !== currentUser._id);
    if (recipients.length > 2) {
      usernames = `${recipients[0].name}, ${recipients[1].name}...`;
    } else if (recipients.length === 2) {
      usernames = `${recipients[0].name} & ${recipients[1].name}`;
    } else {
      usernames = recipients[0].name;
    }
    recipient = recipients[0].name;
    recipientAvatar = recipients[0].avatar;
    chatName = recipients.reduce((acc, user) => `${acc} ${user.name}, `, '');
    chatName = chatName.substr(0, chatName.length - 2);
  }
  if (chat.name === 'Community') {
    chatName = 'Community Chat';
  }
  const unread = notifications.indexOf(chat._id);
  if (messages && messages.length > 0) {
    lastMessage = messages[messages.length - 1];
    lastActivity = moment(lastMessage.date).fromNow();
    primaryText = (
      <Tooltip title={chatName}>
        <div style={activeChat._id === chat._id ? styles.boldFont : (unread > -1 ? styles.boldFont : null)}>{usernames || chatName}</div>
      </Tooltip>
    );
    secondaryText = (
      <>
        <div style={activeChat._id === chat._id ? styles.boldFont : (unread > -1 ? styles.boldFont : null)}>{`${lastMessage.username}: ${lastMessage.text.substr(0, 15)}...`}</div> 
        <div style={activeChat._id === chat._id ? styles.boldFont : (unread > -1 ? styles.boldFont : null)}>{lastActivity}</div>
      </>
    );
  }

  return (
    <>
      <ListItem
        style={activeChat._id === chat._id ? styles.activeStyle : styles.chatItem}
        button
        onClick={() => handleClick(chat)}
      >
        <UserIcon name={recipient} imgUrl={recipientAvatar} />
        <ListItemText
          primary={primaryText}
          secondary={secondaryText}
        />
        {unread > -1 ? <i className="fa fa-envelope" /> : null}
      </ListItem>
      <Divider />
    </>
  );
};


const mapStateToProps = ({
  auth, chat, notifications, timer,
}) => {
  const { user: currentUser } = auth;
  const { activeChat } = chat;
  return {
    currentUser,
    activeChat,
    notifications,
    timer,
  };
};

const mapDispatchToProps = {
  handleClick: selectChat,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatListItem);
