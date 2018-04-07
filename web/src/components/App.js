import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Miss } from 'react-router';
import { connect } from 'react-redux';
import { authenticate, unauthenticate } from '../actions/authentication';
import Home from './Home';
import NotFound from './NotFound'
import Login from './Login';
import Signup from './Signup';

import MatchAuthenticated from './routes-impl/MatchAuthenticated'
import RedirectAuthenticated from './routes-impl/RedirectAuthenticated'

class App extends Component {

  componentDidMount() {
    const token = localStorage.getItem('token');

    //Auth / Un-Auth according to token presence
    token ? this.props.authenticate() : this.props.unauthenticate();
  }

  render() {

    const { isAuthenticated, willAuthenticate } = this.props;
    const authProps = { isAuthenticated, willAuthenticate };

    return (
      <BrowserRouter>
        <div  style={{ width: '100%' }}>
          <MatchAuthenticated exactly pattern="/" component={Home} {...authProps} />
          <RedirectAuthenticated pattern="/login" component={Login} {...authProps} />
          <RedirectAuthenticated pattern="/signup" component={Signup} {...authProps} />
          <Miss component={NotFound} />
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  authenticate: PropTypes.func.isRequired,
  unauthenticate: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  willAuthenticate: PropTypes.bool.isRequired
};

export default connect(
  state => ({
    isAuthenticated: state.authentication.isAuthenticated,
    willAuthenticate: state.authentication.willAuthenticate,
  }),
  { authenticate, unauthenticate }
)(App);
