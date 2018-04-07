import { connectToChannel, leaveChannel } from './socket';

export function connectToRoomChannel(socket, roomId) {
  return (dispatch) => {
    if (!socket) { return false; }

    dispatch(connectToChannel(socket, `rooms:${roomId}`, "ROOM_CONNECTED_TO_CHANNEL"))
  };
}

export function leaveRoomChannel(channel) {
  return (dispatch) => {

    dispatch(leaveChannel(channel, "USER_LEFT_ROOM"));
  };
}