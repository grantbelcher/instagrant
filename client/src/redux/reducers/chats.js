/* eslint-disable no-fallthrough */
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
    case 'SELECT_CHAT':
      return {
        ...state,
        activeChat: payload,
      };
    case 'CREATE_NEW_CHAT':

      return {
        ...state,
        activeChat: payload,
        chats: [payload, ...state.chats],
      };
    case 'ADDED_TO_CHAT':
      return {
        ...state,
        chats: [payload, ...state.chats],
      };
    case 'UPDATE_CHATS':
      const { _id } = payload;
      const { chats, activeChat } = state;
      const indexInChats = chats.findIndex((chat) => {
        return chat._id === _id;
      });
      if (indexInChats > -1) {
        const firstChats = chats.slice(0, indexInChats);
        const lastChats = chats.slice(indexInChats + 1, chats.length);

        if (_id === activeChat._id) {
          return {
            ...state,
            activeChat: payload,
            chats: [
              ...firstChats,
              payload,
              ...lastChats,
            ],
          };
        }
        console.log(state.chats, state.activeChat, 'ORIGINL STATE');
        return {
          ...state,
          chats: [
            ...firstChats,
            payload,
            ...lastChats,
          ],
        };
      }
      break;
    case 'UPDATE_CONNECTED_USERS':
      return {
        ...state,
        connectedUsers: payload,
      };
    case 'UPDATE_TYPING_USERS':
      console.log(payload, 'updating in reducer');
      return {
        ...state,
        typingUsers: payload,
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
