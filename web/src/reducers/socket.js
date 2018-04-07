const initialState = {
  currentSocket: null,
  channel: null,
  currentRoom: {},
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
    case 'ROOM_CONNECTED_TO_CHANNEL':
      return {
        ...state,
        channel: action.channel,
        currentRoom: action.response.room,
      };
    case 'USER_LEFT_ROOM':
      return initialState;
    default:
      return state;
  }
}