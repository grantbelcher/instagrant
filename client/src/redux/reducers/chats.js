const initialState = {
  activeChat: null,
  chats: [],
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
    default:
      return state;
  }
}
