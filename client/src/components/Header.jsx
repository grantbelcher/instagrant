import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Avatar from '@material-ui/core/Avatar';
// import UserIcon from './UserIcon';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
};

const Header = ({ activeChat, user }) => {
  let userNames;
  if (!activeChat.users) return null;
  if (activeChat.name === 'Community') return <h1>{activeChat.name}</h1>;
  let { users } = activeChat;
  users = users.filter((obj) => obj._id !== user._id);
  userNames = users.reduce((acc, obj) => `${acc + obj.name}, `, '');
  if (userNames.length > 20) {
    userNames = `${userNames.substr(0, 30)}...`;
  }
  return (
    <>
      <AvatarGroup max={3}>
        {users.map((obj) => (
          <Avatar alt={obj.name} src={obj.avatar} />
        ))}
      </AvatarGroup>
      <span>
        {userNames}
      </span>
    </>
  );
};

const mapStateToProps = ({ chats, auth }) => {
  const { activeChat } = chats;
  const { user } = auth;
  return {
    activeChat,
    user,
  };
};

export default connect(mapStateToProps, null)(Header);