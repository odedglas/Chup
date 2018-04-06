import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../actions/session';
import Navbar from './common/Navbar';

class Home extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  handleLogout = () => this.props.logout(this.context.router);

  render() {
    const { currentUser, isAuthenticated } = this.props;

    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ul>
        {isAuthenticated &&
        <div>
          <span>{currentUser.username}</span>
          <button type="button" onClick={this.handleLogout}>Logout</button>
        </div>
        }
      </div>
    );
  }
}

Home.propTypes = {
  logout: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.currentUser,
  }),
  { logout }
)(Home);