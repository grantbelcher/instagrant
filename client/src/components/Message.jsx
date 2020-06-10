import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import SocketContext from '../context/index';
import UserIcon from './UserIcon';

const styles = {
  message: {
    backgroundColor: 'rgba(223, 249, 246, 1.0)',
  },
  myMessage: {
    backgroundColor: '#f5d0eb',
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


const Message = ({
  message, currentUsername, last, activeChat
}) => {
  const connection = useContext(SocketContext);
  const { favorites } = message;
  const { date } = message;
  let formattedDate = moment(date).fromNow();
  const [relativeTime, setRelativeTime] = useState(formattedDate);

  useEffect(() => {
    const interval = setInterval(() => {
      formattedDate = moment(date).fromNow();
      setRelativeTime(formattedDate);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const addFavorite = () => {
    console.log('adding favorite');
    connection.emit('ADD_FAVORITE', { username: currentUsername, chatId: activeChat._id, messageId: message._id });
  };
  const removeFavorite = () => {
    console.log('removing');
    // connection.emit('REMOVE_FAVORITE', { username: currentUsername, chatId: activeChat._id, messageId: message._id });
  };

  let heartIcon = (favorites.length > 0) ? <i className="fas fa-heart" /> : <i className="far fa-heart" />;
  console.log(favorites, favorites.length);
  const alreadyFavorited = favorites.find((username) => username === currentUsername);
  console.log(alreadyFavorited);
  const primaryText = (
    <div style={styles.header}>
      <div>{`${message.username}`}</div>
      <div style={styles.messageDate}>
        {`· ${relativeTime}`}
      </div>
    </div>
  );



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
          primary={primaryText}
          secondary={message.text}
        />
        <IconButton onClick={alreadyFavorited ? removeFavorite : addFavorite}>
          {heartIcon}
        </IconButton>
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

const mapStateToProps = ({ auth, chat }) => {
  const { user } = auth;
  const { activeChat } = chat;
  if (user.name !== undefined) {
    return {
      currentUsername: user.name,
      activeChat,

    };
  }
};

export default connect(mapStateToProps, null)(Message);
