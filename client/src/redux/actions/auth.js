/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const signIn = (name, password, path) => async (dispatch) => {
  console.log(name, password, path, 'action');
  try {
    dispatch({
      type: 'LOADING',
    });
    const response = await axios.post(`http://localhost:1000/auth/${path}`, { name, password });
    localStorage.setItem('token', response.data.token);
    dispatch({
      type: 'AUTH_SUCCESS',
      payload: response.data.token,
    });
  } catch (err) {
    dispatch({
      type: 'AUTH_ERROR',
    });
  }
};

export const signOut = () => async (dispatch) => {
  try {
    await localStorage.removeItem('token');
    dispatch({
      type: 'LOG_OUT',
    });
  } catch (err) {
    console.error(err.message);
  }
};
