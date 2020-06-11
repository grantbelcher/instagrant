/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { getNotifications } from './notifications';
import setAuthToken from '../../../../utils/setAuthToken';
import store from '../index';


export const loadUser = (token) => async (dispatch) => {
  if (token) {
    setAuthToken(token);
  }
  try {
    const res = await axios.get('/auth/profile', { token });
    dispatch({
      type: 'USER_LOADED',
      payload: res.data.user,
    });
    dispatch(getNotifications(res.data.user.notifications));
  } catch (error) {
    console.log(error.message);
  }
};

export const signIn = (name, password, path) => async (dispatch) => {
  try {
    // dispatch({
    //   type: 'LOADING',
    // });
    console.log(name, password, path);
    const response = await axios.post(`/auth/${path}`, { name, password });
    // localStorage.setItem('token', response.data.token);
    console.log(response.data, 'RESPONSE!!!!!!');
    dispatch(loadUser(response.data.token));
    dispatch({
      type: 'AUTH_SUCCESS',
      payload: response.data.token,
    });
  } catch (err) {
    console.log(err, 'aquii');
    dispatch({
      type: 'AUTH_ERROR',
      payload: 'invalid credentials*',
    });
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_ERROR',
      });
    }, 4000);
  }
};


export const signOut = () => async (dispatch) => {
  try {
    // await localStorage.removeItem('token');
    dispatch({
      type: 'LOG_OUT',
    });
  } catch (err) {
    console.error(err.message);
  }
};
