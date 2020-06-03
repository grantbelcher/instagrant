/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
const initialState = {
  activeChat: {
    messages: [],
  },
  chats: [],
  connectedUsers: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'GET_CHATS':
      return {
        ...state,
        chats: payload,
      };
    case 'SELECT_CHAT':
      return {
        ...state,
        activeChat: payload,
      };
    case 'UPDATE_CHAT':
      const chatsCopy = state.chats.filter((chat) => chat._id !== payload._id);
      if (payload._id === state.activeChat._id) {
        return {
          ...state,
          activeChat: payload,
          chats: [...chatsCopy, payload],
        };
      }
      return {
        ...state,
        chats: [...chatsCopy, payload],
      };
    case 'UPDATE_CHAT_LIST':
      return {
        ...state,
        chats: payload,
      };
    case 'NEW_LOGIN':
      return {
        ...state,
        connectedUsers: payload,
      };
    default:
      return state;
  }
}
