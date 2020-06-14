const initialState = 'desktop';

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'SET_DEVICE_WIDTH':
      return payload;
    default:
      return state;
  }
}
