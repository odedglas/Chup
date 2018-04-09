import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { connectToRoomChannel, leaveRoomChannel, createMessage } from '../../actions/room';

import MessageList from './MessageList';
import MessageForm from './MessageForm';
import RoomNavbar from './RoomNavbar';
import RoomSidebar from './RoomSidebar';

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

  handleMessageCreate = (data) => {
    this.props.createMessage(this.props.channel, data);
  }

  render() {
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <RoomSidebar room={this.props.room}
                     currentUser={this.props.currentUser}
                     presentUsers={this.props.presentUsers}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <RoomNavbar room={this.props.room} />
          <MessageList messages={this.props.messages} />
          <MessageForm onSubmit={this.handleMessageCreate} />
        </div>
      </div>
    );
  }
}
const RoomType = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string
});

const MessageType = PropTypes.shape({
  id: PropTypes.number
});

ChatRoom.propTypes = {
  socket: PropTypes.any,
  channel: PropTypes.any,
  room: RoomType,
  params: PropTypes.shape({id: PropTypes.string}),
  connectToRoomChannel: PropTypes.func.isRequired,
  leaveRoomChannel: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(MessageType)
};

export default connect(
  state => ({
    room: state.room.currentRoom,
    socket: state.socket.currentSocket,
    channel: state.room.channel,
    messages: state.room.messages,
    presentUsers: state.room.presentUsers,
    currentUser: state.authentication.currentUser,
  }),
  { connectToRoomChannel, leaveRoomChannel, createMessage }
)(ChatRoom);