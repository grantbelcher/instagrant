const initialState = {
  device: 'desktop',
  view: 'messenger',
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'SET_DEVICE_WIDTH':
      return {
        ...state,
        device: payload,
      };
    case 'DISPLAY_INBOX':
      return {
        ...state,
        view: 'inbox',
      };
    case 'DISPLAY_MESSENGER':
      return {
        ...state,
        view: 'messenger',
      };
    default:
      return state;
  }
}
