/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';



const initialState = {
  activeChat: {
    messages: [],
  },
  chats: [],
  connectedUsers: {},
  typingUsers: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'LOAD_COMMUNITY_CHAT':
      return {
        ...state,
        activeChat: payload,
      };
    case 'LOAD_CHATS':
      return {
        ...state,
        chats: payload,
      };
    case 'UPDATE_CHATS':
      const { chatId } = payload;
      const { chats: chatsCopy } = state;
      const indexInChats = chatsCopy.findIndex((chat) => chat._id === chatId);
      if (indexInChats > -1) {
        const { messages } = chatsCopy[indexInChats];
        chatsCopy[indexInChats].messages = [...messages, payload];
        console.log(chatsCopy[indexInChats].messages, 'eyyy');
      }
      return {
        ...state,
        chats: chatsCopy,
      };
    case 'UPDATE_CONNECTED_USERS':
      return {
        ...state,
        connectedUsers: payload,
      };
    default:
      return state;
  }
}

// const indexInChats = chats.findIndex((chat) => chat._id === message.chatId);
// if (indexInChats) {
//   // if message.chatId === activeChat._id => different action
//   // else
//   const allChatsCopy = chats;
//   const chatCopy = chats[indexInChats];
//   console.log(chats, 'look here');
 // chatCopy.messages = [...chatCopy.messages, message];
        // allChatsCopy.splice(indexInChats, 1, chatCopy);

// look in active chat
// compare ids
  // if mathc