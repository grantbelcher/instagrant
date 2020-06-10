/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ChatListItem from './ChatListItem';


const styles = {
  container: {
    maxHeight: '78.2vh',
    minHeight: '78.2vh',
    overflow: 'auto',
    // backgroundColor: 'rgb(249, 223, 242)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
};

// const ChatList = ({ activeChat, allChats, token }) => {
const ChatList = ({ allChats }) => {
  if (!allChats) return null;
  const [chatList, setChatList] = useState([]);
  useEffect(() => {
    let chats = allChats.sort((a, b) => {
      return moment(b.messages[b.messages.length - 1].date) - moment(a.messages[a.messages.length - 1].date);
    });
    chats = allChats.map((chat) => <ChatListItem button chat={chat} />);
    setChatList(chats);
  }, [allChats]);

  return (
    <Paper style={styles.container}>
      <List>
        {chatList}
      </List>
    </Paper>
  );
};

const mapStateToProps = ({ chat }) => {
  const { activeChat, chats: allChats } = chat;
  return {
    activeChat,
    allChats,
  };
};

export default connect(mapStateToProps, null)(ChatList);
