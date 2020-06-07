/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ChatListItem from './ChatListItem';


const styles = {
  container: {
    height: '70vh',
    overflow: 'auto',
  },
};

const ChatList = ({ activeChat, allChats, token }) => {
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
        {console.log(chatList, 'list   dsdsdd')}
        {chatList}
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
