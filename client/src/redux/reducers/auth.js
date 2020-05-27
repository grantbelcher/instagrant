const initialState = {
  isLoggedIn: false,
  token: null,
  loading: false,
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
        loading: false,
      };
    case 'AUTH_ERROR':
    case 'LOG_OUT':
      return {
        isLoggedIn: false,
        token: null,
        loading: false,
      };
    default:
      return state;
  }
}
