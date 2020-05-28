const initialState = {
  socket: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'ADD_SOCKET':
      return {
        ...state,
        socket: payload,
      };
    default:
      return state;
  }
};
