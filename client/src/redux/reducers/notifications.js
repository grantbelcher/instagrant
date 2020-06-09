const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'GET_NOTIFICATIONS':
      return payload;
    case 'ADD_NOTIFICATION':
      console.log(payload, 'reducer');
      return [...state, payload];
    case 'REMOVE_NOTIFICATION':
      return state.filter((id) => id !== payload);
    default:
      return state;
  }
}
