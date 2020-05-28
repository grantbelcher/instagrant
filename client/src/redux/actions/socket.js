/* eslint-disable import/prefer-default-export */
export const addSocket = (socket) => (dispatch) => {
  dispatch({
    type: 'ADD_SOCKET',
    payload: socket,
  });
};
