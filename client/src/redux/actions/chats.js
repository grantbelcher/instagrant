/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
export const getChats = (chats) => (dispatch) => {

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

export const newLogin = activeUsers => (dispatch) => {
  dispatch({
    type: 'NEW_LOGIN',
    payload: activeUsers,
  });
};
