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
  mobile: {
    height: '14vh',
    width: '81vw',
    paddingTop: '5vh',
    paddingLeft: '3vw',
  }
};

const Header = ({ activeChat, user, device }) => {
// const Header = ({ user }) => {ss
  let userNames;
  let allNames;
  let textLength = 47;
  if (device === 'mobile') {
    textLength = 27;
  }
  if (!activeChat.users) return null;
  if (activeChat.name === 'Community') return <h1>{activeChat.name}</h1>;
  let { users } = activeChat;
  users = users.filter((obj) => obj._id !== user._id);
  userNames = users.reduce((acc, obj) => `${acc + obj.name}, `, '');
  allNames = userNames.substr(0, userNames.length - 2);
  userNames = userNames.substr(0, userNames.length - 2);
  if (userNames.length > textLength) {
    userNames = `${userNames.substr(0, textLength)}...`;
    if (userNames[textLength - 1] === ' ') {
      userNames = `${userNames.slice(0, textLength - 1)}...`;
    }
  }
  return (
    <div style={device === 'mobile' ? styles.mobile : null}>
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
    </div>
  );
};

const mapStateToProps = ({ auth, chat, views }) => {
  const { activeChat } = chat;
  const { user } = auth;
  const { device } = views;
  return {
    activeChat,
    user,
    device
  };
};

export default connect(mapStateToProps, null)(Header);
