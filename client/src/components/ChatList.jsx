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
  const [chatList, setChatList] = useState([]);
  useEffect(() => {
    const chats = allChats.map((chat) => <ChatListItem button chat={chat} />);
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
