const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'GET_NOTIFICATIONS':
      return [...new Set(payload)];
    case 'ADD_NOTIFICATION':
      const noDuplicates = new Set([...state, payload])
      return [...noDuplicates];
    case 'REMOVE_NOTIFICATION':
      return state.filter((id) => id !== payload);
    default:
      return state;
  }
}
