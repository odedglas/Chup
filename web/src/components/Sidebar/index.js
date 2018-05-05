import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    background: 'rgb(38,28,37)',
  },

  link: {
    position: 'relative',
    display: 'flex',
    width: '65px',
    color: 'rgba(255,255,255,.6)',
    ':hover': {
      textDecoration: 'none',
    },
    ':focus': {
      textDecoration: 'none',
    },
  },

  activeLink: {
    color: '#fff'
  },

  badge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45px',
    height: '45px',
    margin: '12px auto',
    fontSize: '20px',
    background: 'rgba(255,255,255,.2)',
    borderRadius: '5px',
  },

  logoutButton: {
    padding: '0',
    background: 'transparent',
    border: '0',
    cursor: 'pointer',
  },
});

const RoomLink = ({ room }) =>
  <Link to={`/r/${room.id}`} className={css(styles.link)} activeClassName={css(styles.activeLink)}>
    <div className={css(styles.badge)}>
      <span>{room.name.charAt(0)}</span>
    </div>
  </Link>;


const Room = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
});

RoomLink.propTypes = {
  room: Room
};

const Sidebar = ({ rooms, router, onLogoutClick }) =>
  <div className={css(styles.sidebar)}>
    {rooms.map(room => <RoomLink key={room.id} room={room} />)}
    <Link
      to="/"
      activeOnlyWhenExact
      className={css(styles.link)}
      activeClassName={css(styles.activeLink)}
    >
      <div className={css(styles.badge)}>
        <span> <img alt="home" src={require('../../assets/styles/images/house-outline.svg')} height="24"/></span>
      </div>
    </Link>
    <div style={{ flex: '1' }} />
    <button
      onClick={() => onLogoutClick(router)}
      className={css(styles.link, styles.logoutButton)}
    >
      <div className={css(styles.badge)}>
        <span className="fa fa-sign-out" />
      </div>
    </button>
  </div>;

Sidebar.propTypes = {
  router: PropTypes.object.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
  rooms: PropTypes.arrayOf(Room)
};

export default Sidebar;