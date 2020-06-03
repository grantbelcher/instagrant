import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ChatListItem from './ChatListItem';


const styles = {
  container: {
    height: '82.3vh',
    overflow: 'auto',
  },
};

const ChatList = ({ activeChat, allChats, token }) => {
  console.log(allChats);
  return (
    <Paper style={styles.container}>
      <List>
        {allChats.map((chat) => {
          if (chat.users.length > 0) {
            return <ChatListItem chat={chat} avatar={chat.users[0].avatar} />;
          }
          return <ChatListItem chat={chat} avatar={""} />;
        })}
      </List>
    </Paper>
  );
};

const mapStateToProps = ({ chats, auth }) => {
  const { activeChat, chats: allChats } = chats;
  return {
    activeChat,
    allChats,
  };
};

export default connect(mapStateToProps, null)(ChatList);
