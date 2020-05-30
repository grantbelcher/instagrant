/* eslint-disable import/prefer-default-export */
export const selectChat = (chat) => (dispatch) => {
  dispatch({
    type: 'SELECT_CHAT',
    payload: chat,
  });
};
