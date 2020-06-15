import { leaveChat } from './chats';

export const setDeviceWidth = (width) => (dispatch) => {
  if (width < 700) {
    dispatch({
      type: 'SET_DEVICE_WIDTH',
      payload: 'mobile',
    });
  }
};

export const displayInbox = () => (dispatch) => {
  dispatch({
    type: 'DISPLAY_INBOX',
  });
};
export const displayMessenger = () => (dispatch) => {
  dispatch({
    type: 'DISPLAY_MESSENGER',
  });
  dispatch(leaveChat());
};
