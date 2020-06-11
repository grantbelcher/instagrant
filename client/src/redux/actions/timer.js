// eslint-disable-next-line import/prefer-default-export
export const startTimer = () => (dispatch) => {
  setInterval(() => {
    dispatch({
      type: 'NULL',
    });
  }, 5000);
};

export const rickAstley = () => (dispatch) => {
  dispatch({
    type: 'RICK_ASTLEY',
  });
};
