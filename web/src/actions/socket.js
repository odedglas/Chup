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

export function connectToChannel(socket, channel, type) {
  return (dispatch) => {
    const socketChannel = socket.channel(channel);

    socketChannel.join().receive('ok', (response) => {
      dispatch({ type: type, response, socketChannel });
    });

    return false;
  };
}

export function leaveChannel(channel, type) {
  return (dispatch) => {
    if (channel) {
      channel.leave();
      dispatch({ type: type });
    }
  };
}