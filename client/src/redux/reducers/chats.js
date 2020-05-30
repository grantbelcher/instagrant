const initialState = {
  activeChat: null,
  chats: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'SELECT_CHAT':
      return {
        ...state,
        current: payload,
      };
    default:
      return state;
  }
}
