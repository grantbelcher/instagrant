/* eslint-disable import/prefer-default-export */
export const setDeviceWidth = (width) => (dispatch) => {
  if (width < 700) {
    dispatch({
      type: 'SET_DEVICE_WIDTH',
      payload: 'mobile',
    });
  }
};
