import React from 'react';
import PropTypes from 'prop-types';

const RoomListItem = ({ room, currentUserRoomIds, onRoomJoin }) => {
  const isJoined = currentUserRoomIds.includes(room.id);

  return (
    <div key={room.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
      <span style={{ marginRight: '8px' }}>{room.name}</span>
      <button
        onClick={() => onRoomJoin(room.id)}
        className="btn btn-sm"
        disabled={isJoined}
      >
        {isJoined ? 'Joined' : 'Join'}
      </button>
    </div>
  );
};

const Room = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
});

RoomListItem.propTypes = {
  room: Room,
  currentUserRoomIds: PropTypes.array.isRequired,
  onRoomJoin: PropTypes.func.isRequired,
};

export default RoomListItem;