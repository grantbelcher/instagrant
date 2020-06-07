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
    case 'UPDATE_CONNECTED_USERS':
      return {
        ...state,
        connectedUsers: payload,
      };
    default:
      return state;
  }
}
