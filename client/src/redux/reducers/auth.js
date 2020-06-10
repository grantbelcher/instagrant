/* eslint-disable no-case-declarations */
const initialState = {
  isLoggedIn: false,
  token: null,
  loading: false,
  user: null,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'AUTH_SUCCESS':
      return {
        isLoggedIn: true,
        token: payload,
      };
    case 'USER_LOADED':
      return {
        ...state,
        isLoggedIn: true,
        loading: false,
        user: payload,
      };
    case 'AUTH_ERROR':
      return {
        isLoggedIn: false,
        token: null,
        loading: false,
        user: null,
        error: payload,
      };
    case 'REMOVE_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'LOG_OUT':
      return {
        isLoggedIn: false,
        token: null,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}
