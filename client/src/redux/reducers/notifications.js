const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'GET_NOTIFICATIONS':
      return payload;
    case 'ADD_NOTIFICATION':
      console.log(payload, 'adding notifications in reducer');
      const noDuplicates = new Set([...state, payload])
      console.log(noDuplicates, 'duplicates removed prior to updating state');
      return [...noDuplicates];
    case 'REMOVE_NOTIFICATION':
      console.log(payload, 'removing notifications in reducer');
      return state.filter((id) => id !== payload);
    default:
      return state;
  }
}
