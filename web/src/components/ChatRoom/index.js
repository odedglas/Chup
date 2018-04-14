import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { connectToRoomChannel, leaveRoomChannel, createMessage, loadOlderMessages} from '../../actions/room';

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

  handleLoadMore = () =>
    this.props.loadOlderMessages(
      this.props.params.id,
      { last_seen_id: this.props.messages[0].id }
    );

  handleMessageCreate = (data) => {
    this.props.createMessage(this.props.channel, data);
    this.messageList.scrollToBottom();
  };

  render() {

    const hasMoreMessages = this.props.pagination.total_pages > this.props.pagination.page_number;

    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <RoomSidebar room={this.props.room}
                     currentUser={this.props.currentUser}
                     presentUsers={this.props.presentUsers}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <RoomNavbar room={this.props.room} />
          <MessageList
            hasMoreMessages={hasMoreMessages}
            messages={this.props.messages}
            onLoadMore={this.handleLoadMore}
            ref={(c) => { this.messageList = c; }}
            isLoading={this.props.isLoading}
          />
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
  messages: PropTypes.arrayOf(MessageType),
  presentUsers: PropTypes.array,
  currentUser: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadOlderMessages: PropTypes.func.isRequired,
  pagination: PropTypes.shape({
    total_pages: PropTypes.number,
    total_entries: PropTypes.number,
    page_size: PropTypes.number,
    page_number: PropTypes.number
  })
};

export default connect(
  state => ({
    room: state.room.currentRoom,
    socket: state.socket.currentSocket,
    channel: state.room.channel,
    messages: state.room.messages,
    presentUsers: state.room.presentUsers,
    currentUser: state.authentication.currentUser,
    pagination: state.room.pagination,
    isLoading: state.room.loadingOlderMessages,
  }),
  { connectToRoomChannel, leaveRoomChannel, createMessage, loadOlderMessages}
)(ChatRoom);