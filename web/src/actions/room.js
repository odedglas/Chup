import { reset } from 'redux-form';
import {connectToChannel, leaveChannel} from './socket';
import { Presence } from 'phoenix';
import api from '../api'

const syncPresentUsers = (dispatch, presences) => {
  const presentUsers = [];
  Presence.list(presences, (id, { metas: [first] }) => first.user)
  .map(user => presentUsers.push(user));
  dispatch({ type: 'ROOM_PRESENCE_UPDATE', presentUsers });
};

export function connectToRoomChannel(socket, roomId) {
  return (dispatch) => {
    if (!socket) {
      return false;
    }

    let channelMeta = {
      name: `rooms:${roomId}`,
      onConnectDispatch:'ROOM_CONNECTED_TO_CHANNEL',
      onMessageDispatch:'MESSAGE_CREATED'
    };

    dispatch(connectToChannel(
        socket,
        channelMeta,
        syncPresentUsers
      ));
  };
}

export function leaveRoomChannel(channel) {
  return (dispatch) => {

    dispatch(leaveChannel(channel, "USER_LEFT_ROOM"));
  };
}

export function createMessage(channel, data) {
  return dispatch => new Promise((resolve, reject) => {
    channel.push('new_message', data)
    .receive('ok', () => resolve(
      dispatch(reset('newMessage'))
    ))
    .receive('error', () => reject());
  });
}

export function loadOlderMessages(roomId, params) {
  return (dispatch) => {
    dispatch({type: 'FETCH_MESSAGES_REQUEST'});
    return api.fetch(`/rooms/${roomId}/messages`, params)
    .then((response) => {
      dispatch({type: 'FETCH_MESSAGES_SUCCESS', response});
    })
    .catch(() => {
      dispatch({type: 'FETCH_MESSAGES_FAILURE'});
    });
  };
}