import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/authentication';
import LoginForm from './LoginForm';
import Navbar from '../common/Navbar';

class Login extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  handleLogin = data => this.props.login(data, this.context.router);

  render() {
    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <LoginForm onSubmit={this.handleLogin} />
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired
};

export default connect(null, { login })(Login);