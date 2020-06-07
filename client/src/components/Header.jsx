import React, { useState } from 'react';
import { connect } from 'react-redux';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
// import UserIcon from './UserIcon';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
};

// const Header = ({ activeChat, user }) => {
const Header = ({ user }) => {
  // let userNames;
  // let allNames;
  // if (!activeChat.users) return null;
  // if (activeChat.name === 'Community') return <h1>{activeChat.name}</h1>;
  // let { users } = activeChat;
  // users = users.filter((obj) => obj._id !== user._id);
  // userNames = users.reduce((acc, obj) => `${acc + obj.name}, `, '');
  // allNames = userNames.substr(0, userNames.length - 2);
  // userNames = userNames.substr(0, userNames.length - 2);
  // if (userNames.length > 60) {
  //   userNames = `${userNames.substr(0, 60)}...`;
  // }
  const users = [
    {
      name: 'test1',
      avatar: 't',
    },
    {
      name: 'test2',
      avatar: 't',
    },
    {
      name: 'test3',
      avatar: 't',
    },
    {
      name: 'test4',
      avatar: 't',
    },
  ];
  const userNames = 'Name, name, name...';
  const allNames = 'name, name, name, name';


  return (
    <>
      <AvatarGroup
        max={3}
      >
        {users.map((obj) => (
          <Avatar
            alt={obj.name}
            src={obj.avatar}
          />
        ))}
      </AvatarGroup>
      <Tooltip title={allNames}>
        <span>
          {userNames}
        </span>
      </Tooltip>
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  // const { activeChat } = chats;
  const { user } = auth;
  return {
    // activeChat,
    user,
  };
};

export default connect(mapStateToProps, null)(Header);
