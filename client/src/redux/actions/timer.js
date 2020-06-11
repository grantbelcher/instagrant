// eslint-disable-next-line import/prefer-default-export
export const startTimer = () => (dispatch) => {
  setInterval(() => {
    dispatch({
      type: 'UPDATE_TIMER',
    });
  }, 5000);
};

export const rickAstley = () => (dispatch) => {
  dispatch({
    type: 'RICK_ASTLEY',
  });
};
