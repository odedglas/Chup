import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { connectToRoomChannel, leaveRoomChannel } from '../../actions/socket';

class ChatRoom extends Component {
  componentDidMount() {
    this.props.connectToRoomChannel(this.props.socket, this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.leaveRoomChannel(this.props.channel);
      this.props.connectToRoomChannel(nextProps.socket, nextProps.params.id);
    }
    if (!this.props.socket && nextProps.socket) {
      this.props.connectToRoomChannel(nextProps.socket, nextProps.params.id);
    }
  }

  componentWillUnmount() {
    this.props.leaveRoomChannel(this.props.channel);
  }

  render() {
    return (
      <div>{this.props.room.name} -> {this.props.room.id} , Param id is : - {this.props.params.id} </div>
    );
  }
}
const RoomType = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string
});

ChatRoom.propTypes = {
  socket: PropTypes.any,
  channel: PropTypes.any,
  room: RoomType,
  params: PropTypes.shape({id: PropTypes.string}),
  connectToRoomChannel: PropTypes.func.isRequired,
  leaveRoomChannel: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    room: state.socket.currentRoom,
    socket: state.socket.currentSocket,
    channel: state.socket.channel,
  }),
  { connectToRoomChannel, leaveRoomChannel }
)(ChatRoom);