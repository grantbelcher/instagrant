/* eslint-disable no-case-declarations */
const initialState = {
  isLoggedIn: false,
  token: null,
  loading: false,
  user: null,
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
    case 'ADD_NOTIFICATION':
      const { notifications } = state.user
      console.log(payload, 'EYYYYYYYYY');
      const alreadyPresent = notifications.find((id) => id === payload)
      if (alreadyPresent) {
        console.log(alreadyPresent, 'alreadyPresent???')
        return {
          ...state,
        };
      }
      console.log('updating');
      return {
        ...state,
        user: {
          ...state.user,
          notifications: [...state.user.notifications, payload],
        },
      };
    case 'AUTH_ERROR':
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
