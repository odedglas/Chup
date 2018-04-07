import { Socket } from 'phoenix';
const API_URL = process.env.REACT_APP_API_URL;
const WEBSOCKET_URL = API_URL.replace(/(https|http)/, 'ws').replace('/api', '');

export function openSocket() {
  return dispatch => {
    const token = JSON.parse(localStorage.getItem('token'));
    const socket = new Socket(`${WEBSOCKET_URL}/socket`, {
      params: { token },
      logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data); }
    });
    socket.connect();
    dispatch({ type: 'SOCKET_CONNECTED', socket });
  }
}

export function connectToRoomChannel(socket, roomId) {
  return (dispatch) => {
    if (!socket) { return false; }
    const channel = socket.channel(`rooms:${roomId}`);

    channel.join().receive('ok', (response) => {
      dispatch({ type: 'ROOM_CONNECTED_TO_CHANNEL', response, channel });
    });

    return false;
  };
}

export function leaveRoomChannel(channel) {
  return (dispatch) => {
    if (channel) {
      channel.leave();
    }
    dispatch({ type: 'USER_LEFT_ROOM' });
  };
}