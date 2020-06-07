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
    case "LOAD_CHATS":
      return {
        ...state,
        chats: payload,
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
