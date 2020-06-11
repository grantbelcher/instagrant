import { defineLocale } from "moment";

const initialState = {
  timer: 0,
  rickAstley: false,
};

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case 'UPDATE_TIMER':
      return {
        ...state,
        timer: state.timer + 1,
      };
    case 'RICK_ASTLEY':
      return {
        ...state,
        rickAstley: true,
      };
    default:
      return state;
  }
}
