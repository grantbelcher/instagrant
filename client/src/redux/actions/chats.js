/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

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

export const updateConnectedUsers = (list) => (dispatch) => {
  dispatch({
    type: 'UPDATE_CONNECTED_USERS',
    payload: list,
  });
};
