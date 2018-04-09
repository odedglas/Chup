import { Socket, Presence } from 'phoenix';
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

export function connectToChannel(socket, channelMeta, presenceSync) {
  return (dispatch) => {
    const channel = socket.channel(channelMeta.name);

    //Checking if should set presence tracking
    if(presenceSync) {
      let presences = {};

      channel.on('presence_state', (state) => {
        presences = Presence.syncState(presences, state);
        presenceSync(dispatch, presences);
      });

      channel.on('presence_diff', (diff) => {
        presences = Presence.syncDiff(presences, diff);
        presenceSync(dispatch, presences);
      });
    }

    //On message created listener
    if(channelMeta.onMessageDispatch){

      channel.on("message_created", (message) => {
        dispatch({ type: channelMeta.onMessageDispatch, message });
      });
    }

    channel.join().receive('ok', (response) => {
      if(channelMeta.onConnectDispatch) {

        dispatch({ type: channelMeta.onConnectDispatch, response, channel });
      }

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