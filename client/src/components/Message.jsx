import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
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
    connection.emit('ADD_FAVORITE', { username: currentUsername, chatId: activeChat._id, messageId: message._id });
  };
  const removeFavorite = () => {
    connection.emit('REMOVE_FAVORITE', { username: currentUsername, chatId: activeChat._id, messageId: message._id });
  };


  const alreadyFavorited = favorites.find((username) => username === currentUsername);
  const indexOfYou = favorites.findIndex((username) => username === currentUsername);
  let favoritesCopy = [...favorites];
  if (indexOfYou > -1) {
    favoritesCopy.splice(indexOfYou, 1);
    favoritesCopy = ['you', ...favoritesCopy];
  }
  let favoriteNames = favoritesCopy.reduce((acc, name) => {
    return acc + `${name}, `
  }, '');
  favoriteNames = favoriteNames.substr(0, favoriteNames.length - 2);

  let heartIcon = (!(favorites.length > 0)
    ? <i className="far fa-heart" />
    : (
      <Tooltip title={favoriteNames}>
        <i className="fas fa-heart" style={{ color: 'violet' }} />
      </Tooltip>
    )
  );

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
