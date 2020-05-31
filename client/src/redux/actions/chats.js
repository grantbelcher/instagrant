/* eslint-disable import/prefer-default-export */
export const getChats = (chats) => (dispatch) => {
  console.log(chats, 'actions');
  dispatch({
    type: 'GET_CHATS',
    payload: chats,
  });
};

export const selectChat = (chat) => (dispatch) => {
  dispatch({
    type: 'SELECT_CHAT',
    payload: chat,
  });
};

export const updateChat = (chat) => (dispatch) => {
  dispatch({
    type: 'UPDATE_CHAT',
    payload: chat,
  });
};
