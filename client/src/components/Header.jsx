import React, { useState } from 'react';
import { connect } from 'react-redux';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import UserIcon from './UserIcon';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
};

const Header = ({ activeChat, user }) => {
// const Header = ({ user }) => {
  let userNames;
  let allNames;
  if (!activeChat.users) return null;
  if (activeChat.name === 'Community') return <h1>{activeChat.name}</h1>;
  let { users } = activeChat;
  users = users.filter((obj) => obj._id !== user._id);
  userNames = users.reduce((acc, obj) => `${acc + obj.name}, `, '');
  allNames = userNames.substr(0, userNames.length - 2);
  userNames = userNames.substr(0, userNames.length - 2);
  if (userNames.length > 47) {
    userNames = `${userNames.substr(0, 47)}...`;
    if (userNames[46] === ' ') {
      userNames = `${userNames.slice(0, 46)}...`;
      console.log(userNames, 'after');
    }
  }


  return (
    <>
      <AvatarGroup
        max={3}
      >
        {users.map((obj) => (
          <UserIcon
            name={obj.name}
            imgUrl={obj.avatar}
          />
        ))}
      </AvatarGroup>
      <Tooltip title={allNames}>
        <span style={{ fontSize: 'larger' }}>
          {userNames}
        </span>
      </Tooltip>
    </>
  );
};

const mapStateToProps = ({ auth, chat }) => {
  const { activeChat } = chat;
  const { user } = auth;
  return {
    activeChat,
    user,
  };
};

export default connect(mapStateToProps, null)(Header);
