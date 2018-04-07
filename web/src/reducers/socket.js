const initialState = {
  currentSocket: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SOCKET_CONNECTED':
      return {
        ...state,
        currentSocket: action.socket,
      };
    case 'LOGOUT':
      return {
        ...state,
        currentSocket: null,
      };
    default:
      return state;
  }
}