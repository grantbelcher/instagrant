import store from '../index';

export const getNotifications = (notifications) => (dispatch) => {
  console.log('getting notifications!')
  dispatch({
    type: 'GET_NOTIFICATIONS',
    payload: notifications,
  });
};

export const addNotification = (id) => (dispatch) => {
  const { activeChat } = store.getState().chat;
  if (activeChat._id !== id) {
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: id,
    });
  }
};

export const removeNotification = (id) => (dispatch) => {
  console.log('before dispatch');
  dispatch({
    type: 'REMOVE_NOTIFICATION',
    payload: id,
  });
};