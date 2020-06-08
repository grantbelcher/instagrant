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
      const { chats, activeChat } = state;
      
      const indexInChats = chats.findIndex((chat) => chat._id === chatId);
      console.log(indexInChats, chatId);
      if (indexInChats > -1) {
        const { messages } = chats[indexInChats];
        const firstChats = chats.slice(0, indexInChats);
        const lastChats = chats.slice(indexInChats + 1, chats.length);

        if (chatId === activeChat._id) {
          return {
            ...state,
            activeChat: {
              ...activeChat,
              messages: [
                ...activeChat.messages,
                payload,
              ],
            },
            chats: [
              ...firstChats,
              {
                ...chats[indexInChats],
                messages: [
                  ...chats[indexInChats].messages,
                  payload,
                ],
              },
              ...lastChats,
            ],
          };
        }
        console.log(state.chats, state.activeChat, 'ORIGINL STATE');
        return {
          ...state,
          chats: [
            ...firstChats,
            {
              ...chats[indexInChats],
              messages: [
                ...chats[indexInChats].messages,
                payload,
              ],
            },
            ...lastChats,
          ],
        };
      }
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
