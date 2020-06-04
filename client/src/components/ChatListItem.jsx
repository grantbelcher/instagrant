/* eslint-disable no-underscore-dangle */
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import UserIcon from './UserIcon';
import { selectChat } from '../redux/actions/chats';

const styles = {
  activeStyle: {
    backgroundColor: '#f5f5f5',
  },
  boldFont: {
    fontWeight: 'bold'
  }
};

const ChatListItem = ({
  chat, currentUser, handleClick, activeChat,
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

  if (users !== undefined && users.length > 0) {
    recipients = users.filter((user) => user._id !== currentUser._id);
    if (recipients.length > 1) {
      usernames = `${recipients[0].name}, ${recipients[1].name.substr(0, 4)}...`;
    } else {
      usernames = recipients[0].name;
    }
    recipient = recipients[0].name;
    recipientAvatar = recipients[0].avatar;
  }
  if (chat.name === 'Community') {
    chatName = 'Community Chat';
  }
  if (messages && messages.length > 0) {
    lastMessage = messages[messages.length - 1];
    lastActivity = moment(lastMessage.date).fromNow();
    primaryText = (
      <div style={activeChat._id === chat._id ? styles.boldFont : null}>{usernames || chatName}</div>
    );
    secondaryText = (
      <>
        <div style={activeChat._id === chat._id ? styles.boldFont : null}>{`${lastMessage.username}: ${lastMessage.text.substr(0, 15)}...`}</div>
        <div style={activeChat._id === chat._id ? styles.boldFont : null}>{lastActivity}</div>
      </>
    );
  }
  return (
    <>
      <ListItem
        style={activeChat._id === chat._id ? styles.activeStyle : null}
        button
        onClick={() => handleClick(chat)}
      >
        <UserIcon name={recipient} imgUrl={recipientAvatar} />
        <ListItemText
          primary={primaryText}
          secondary={secondaryText}
          // secondary={lastMessage.username ? `${lastMessage.username}: ${lastMessage.text.substr(0, 13)}...\n${lastActivity}` : 'loading'}
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

const mapStateToProps = ({ auth, chats }) => {
  const { user: currentUser } = auth;
  const { activeChat } = chats;
  return {
    currentUser,
    activeChat,
  };
};

const mapDispatchToProps = {
  handleClick: selectChat,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatListItem);
