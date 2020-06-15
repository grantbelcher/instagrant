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
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'LOAD_COMMUNITY_CHAT':
      return {
        ...state,
        activeChat: payload,
        loading: false,
      };
    case 'LOAD_CHATS':
      return {
        ...state,
        chats: payload,
        loading: false,
      };
    case 'SELECT_CHAT':
      return {
        ...state,
        activeChat: payload,
      };
    case 'CREATE_NEW_CHAT':
      if (payload._id === state.chats[0]._id) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        activeChat: payload,
        chats: [payload, ...state.chats],
      };
    case 'ADDED_TO_CHAT':
      if (payload._id === state.chats[0]._id) {
        return {
          ...state,
        };
      }
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
      return {
        ...state,
        typingUsers: payload,
      };
    case 'LOADING_CHATS':
      console.log('loading chats');
      return {
        ...state,
        loading: true,
      };
    case 'LEAVE_CHAT':
      return {
        ...state,
        activeChat: null,
      };
    default:
      return state;
  }
}
