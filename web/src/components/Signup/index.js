import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signup } from '../../actions/authentication';
import SignupForm from './SignupForm';
import Navbar from '../common/Navbar';

class Signup extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  handleSignup = data => this.props.signup(data, this.context.router);

  render() {
    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <SignupForm onSubmit={this.handleSignup} />
      </div>
    );
  }
}

Signup.propTypes = {
  signup: PropTypes.func.isRequired
};

export default connect(null, { signup })(Signup);