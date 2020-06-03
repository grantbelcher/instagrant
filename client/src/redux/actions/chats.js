/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const getChats = (chats) => async (dispatch) => {
  // console.log(chats, 'chats action');
  try {
    const res = await axios.post('/chats/user', { ids: chats });
    // console.log(res.data, 'response');
    dispatch({
      type: 'UPDATE_CHAT_LIST',
      payload: res.data,
    });
  } catch (error) {
    console.log('error updating chats');
  }
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
