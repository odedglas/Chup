import React from 'react';
import { Link } from 'react-router';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  navbar: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 1rem',
    height: '70px',
    background: '#fff',
    boxShadow: '0 1px 1px rgba(0,0,0,.1)',
  },

  icon: {
    margin:'0 10px',
    height:'36px'
  },

  link: {
    color: '#456e8c',
    fontSize: '22px',
    fontWeight: 'bold',
    ':hover': {
      textDecoration: 'none',
    },
    ':focus': {
      textDecoration: 'none',
    },
  },
});

const Navbar = () =>
  <nav className={css(styles.navbar)}>
    <img className={css(styles.icon)} src={require('../../assets/styles/images/gorilla.svg')} alt="sucks" />
    <Link to="/" className={css(styles.link)}>Chup</Link>
  </nav>;

export default Navbar;