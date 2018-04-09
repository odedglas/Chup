import React from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  navbar: {
    padding: '15px',
    background: '#fff',
    borderBottom: '1px solid rgb(240,240,240)',
  },
});

const RoomNavbar = ({ room }) =>
  <nav className={css(styles.navbar)}>
    <div># {room.name}</div>
  </nav>;


RoomNavbar.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string
  })
};

export default RoomNavbar;