/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const updateConnectedUsers = (list) => (dispatch) => {
  dispatch({
    type: 'UPDATE_CONNECTED_USERS',
    payload: list,
  });
};
