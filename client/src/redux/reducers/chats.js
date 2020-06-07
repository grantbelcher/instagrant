/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
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
      console.log([...chatsCopy, payload], 'REDUCER!!!!!');
      // if (payload._id === state.activeChat._id) {
        return {
          ...state,
          activeChat: payload,
          chats: [...chatsCopy, payload],
        };
      // }
      // return {
      //   ...state,
      //   chats: [...chatsCopy, payload],
      // };
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
    case 'USER_TYPING':
      console.log(payload, 'payload')
      return {
        ...state,
        typingUsers: payload,
      };
    case 'STOP_TYPING':
      return {
        ...state,
        typingUsers: payload,
      };
    default:
      return state;
  }
}
