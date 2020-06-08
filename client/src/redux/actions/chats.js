/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import store from '../index';
import { addNotification } from './auth';

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

export const updateChatsRecipient = (updatedChat) => (dispatch) => {
  dispatch({
    type: 'UPDATE_CHATS',
    payload: updatedChat,
  });
  console.log('dispatching next action from recipient');
  dispatch(addNotification(updatedChat._id));
};
export const updateChats = (updatedChat) => (dispatch) => {
  dispatch({
    type: 'UPDATE_CHATS',
    payload: updatedChat,
  });
};

export const selectChat = (chat) => (dispatch) => {
  dispatch({
    type: 'SELECT_CHAT',
    payload: chat,
  });
};

export const createNewChat = (chat) => (dispatch) => {
  const { users } = chat;
  const { user } = store.getState().auth;
  console.log(users, user, 'testing user destructuring');
  const userIsRecipient = users.find(({ _id }) => _id === user._id);
  console.log(userIsRecipient, 'user is a recipient test');
  if (userIsRecipient) {
    if (users[0]._id === user._id) {
      dispatch({
        type: 'CREATE_NEW_CHAT',
        payload: chat,
      });
    } else {
      console.log('BEING ADDED TO CHAT');
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
  console.log(list, 'action')
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
