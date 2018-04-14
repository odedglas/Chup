import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import mapKeys from 'lodash/mapKeys';
import debounce from 'lodash/debounce';
import { css, StyleSheet } from 'aphrodite';
import Message from './Message';

const styles = StyleSheet.create({
  container: {
    flex: '1',
    padding: '10px 10px 0 10px',
    background: '#fff',
    overflowY: 'auto',
  },

  dayDivider: {
    position: 'relative',
    margin: '1rem 0',
    textAlign: 'center',
    '::after': {
      position: 'absolute',
      top: '50%',
      right: '0',
      left: '0',
      height: '1px',
      background: 'rgb(240,240,240)',
      content: '""',
    },
  },

  dayText: {
    zIndex: '1',
    position: 'relative',
    background: '#fff',
    padding: '0 12px',
  },
});

class MessageList extends Component {



  renderMessages = messages =>
    messages.map(message => <Message key={message.id} message={message} />);

  constructor(props) {
    super(props);
    this.handleScroll = debounce(this.handleScroll, 200);
  }

  componentDidMount() {
    this.container.addEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.messages.length !== this.props.messages.length) {
      this.maybeScrollToBottom();
    }
  }

  componentWillUnmount() {
    this.container.removeEventListener('scroll', this.handleScroll);
  }

  maybeScrollToBottom = () => {
    if (this.container.scrollHeight - this.container.scrollTop <
      this.container.clientHeight + 50) {
      this.scrollToBottom();
    }
  };

  scrollToBottom = () => {
    setTimeout(() => { this.container.scrollTop = this.container.scrollHeight; });
  };

  handleScroll = () => {
    if (this.props.hasMoreMessages && this.container.scrollTop < 20) {
      this.props.onLoadMore();
    }
  };

  renderDays() {

    const { messages } = this.props;
    messages.map(message => message.day = moment(message.inserted_at).format('MMMM Do'));
    const dayGroups = groupBy(messages, 'day');

    const days = [];
    mapKeys(dayGroups, (value, key) => {
      days.push({ date: key, messages: value });
    });

    const today = moment().format('MMMM Do');
    const yesterday = moment().subtract(1, 'days').format('MMMM Do');

    return days.map(day =>
      <div key={day.date}>
        <div className={css(styles.dayDivider)}>
          <span className={css(styles.dayText)}>
            {day.date === today && 'Today'}
            {day.date === yesterday && 'Yesterday'}
            {![today, yesterday].includes(day.date) && day.date}
          </span>
        </div>
        {this.renderMessages(day.messages)}
      </div>
    );
  }

  render() {
    return (
      <div className={css(styles.container)} ref={(c) => { this.container = c; }}>
        {this.props.hasMoreMessages &&
        <div style={{ textAlign: 'center' }}>
          <button
            className="btn btn-link btn-sm"
            onClick={this.props.onLoadMore}
            disabled={this.props.isLoading}
          >
            {this.props.isLoading ? 'Loading' : 'Load more'}
          </button>
        </div>
        }
        {this.renderDays()}
      </div>
    );
  }
}

const MessageType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  inserted_at: PropTypes.string.isRequired
});

MessageList.propTypes = {
  messages: PropTypes.arrayOf(MessageType),
  onLoadMore: PropTypes.func.isRequired,
  hasMoreMessages: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default MessageList;