/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import store from '../index';
import { addNotification, removeNotification } from './notifications';

export const loadCommunityChat = () => (dispatch) => {
  axios.get('/chats/community')
    .then((res) => {
      const { data } = res;
      return data;
    })
    .then((data) => {
      dispatch({
        type: 'LOAD_COMMUNITY_CHAT',
        payload: data,
      });
    })
    .catch((err) => console.error(err.message));
};

export const loadChats = (user) => (dispatch) => {
  const { chats: ids } = user;

  axios.post('/chats/user', { ids })
    .then((res) => {
      const { data } = res;
      return data;
    })
    .then((data) => {
      dispatch({
        type: 'LOAD_CHATS',
        payload: data,
      });
    })
    .catch((err) => console.error(err.message));
};

export const updateChatsRecipient = (updatedChat, favorite = false) => (dispatch) => {
  dispatch({
    type: 'UPDATE_CHATS',
    payload: updatedChat,
  });
  if (!favorite) {
    dispatch(addNotification(updatedChat._id));
  }
};
export const updateChats = (updatedChat) => (dispatch) => {
  dispatch({
    type: 'UPDATE_CHATS',
    payload: updatedChat,
  });
};

export const selectChat = (chat) => (dispatch) => {
  dispatch(removeNotification(chat._id));
  dispatch({
    type: 'SELECT_CHAT',
    payload: chat,
  });
};

export const createNewChat = (chat) => (dispatch) => {
  const { users } = chat;
  console.log(chat, 'chat in action')
  const { user } = store.getState().auth;
  const userIsRecipient = users.find(({ _id }) => _id === user._id);
  if (userIsRecipient) {
    console.log(userIsRecipient, 'if block of new chat action')
    if (users[0]._id === user._id) {
      dispatch({
        type: 'CREATE_NEW_CHAT',
        payload: chat,
      });
    } else {
      dispatch(addNotification(chat._id));
      dispatch({
        type: 'ADDED_TO_CHAT',
        payload: chat,
      });
    }
  } else {
    dispatch({
      type: 'NULL',
    });
  }
};

export const updateConnectedUsers = (list) => (dispatch) => {
  dispatch({
    type: 'UPDATE_CONNECTED_USERS',
    payload: list,
  });
};

export const updateTypingUsers = (list) => (dispatch) => {
  dispatch({
    type: 'UPDATE_TYPING_USERS',
    payload: list,
  });
};
