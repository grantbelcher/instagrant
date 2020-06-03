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
          console.log(chat.name, 'chat name');
          if (chat.users.length > 0) {
            return <ChatListItem chatName={chat.name} avatar={chat.users[0].avatar} />;
          }
          return <ChatListItem chatName={chat.name} avatar={""} />;
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
