import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Miss } from 'react-router';
import { connect } from 'react-redux';
import { authenticate, unauthenticate, logout} from '../actions/authentication';
import Home from './Home';
import NotFound from './NotFound'
import Login from './Login';
import Signup from './Signup';
import Sidebar from './Sidebar';
import ChatRoom from './ChatRoom';

import MatchAuthenticated from './routes-impl/MatchAuthenticated'
import RedirectAuthenticated from './routes-impl/RedirectAuthenticated'

class App extends Component {

  componentDidMount() {
    const token = localStorage.getItem('token');

    //Auth / Un-Auth according to token presence
    token ? this.props.authenticate() : this.props.unauthenticate();
  }

  handleLogout = router => this.props.logout(router);

  render() {

    const { isAuthenticated, willAuthenticate, currentUserRooms } = this.props;
    const authProps = { isAuthenticated, willAuthenticate };

    return (
      <BrowserRouter>
        {({ router }) => (
          <div style={{ display: 'flex', flex: '1' }}>
            {isAuthenticated &&
            <Sidebar
              router={router}
              rooms={currentUserRooms}
              onLogoutClick={this.handleLogout}
            />
            }
            <MatchAuthenticated exactly pattern="/" component={Home} {...authProps} />
            <RedirectAuthenticated pattern="/login" component={Login} {...authProps} />
            <RedirectAuthenticated pattern="/signup" component={Signup} {...authProps} />
            <MatchAuthenticated pattern="/r/:id" component={ChatRoom} {...authProps} />
            <Miss component={NotFound} />
          </div>
        )}
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  authenticate: PropTypes.func.isRequired,
  unauthenticate: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  willAuthenticate: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  currentUserRooms: PropTypes.array.isRequired,
};

export default connect(
  state => ({
    isAuthenticated: state.authentication.isAuthenticated,
    willAuthenticate: state.authentication.willAuthenticate,
    currentUserRooms: state.rooms.currentUserRooms,
  }),
  { authenticate, unauthenticate, logout }
)(App);
