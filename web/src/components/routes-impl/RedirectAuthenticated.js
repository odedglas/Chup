import React from 'react';
import PropTypes from 'prop-types';
import { Match, Redirect } from 'react-router';

const RedirectAuthenticated = ({
                                 pattern,
                                 exactly,
                                 isAuthenticated,
                                 willAuthenticate,
                                 component: Component,
                               }) =>
  <Match
    exactly={exactly}
    pattern={pattern}
    render={(props) => {
      if (isAuthenticated) { return <Redirect to={{ pathname: '/' }} />; }
      if (willAuthenticate) { return null; }
      if (!willAuthenticate && !isAuthenticated) { return <Component {...props} />; }
      return null;
    }}
  />;

RedirectAuthenticated.propTypes = {
  component: PropTypes.any.isRequired,
  pattern: PropTypes.string.isRequired,
  exactly: PropTypes.bool,
  isAuthenticated: PropTypes.bool.isRequired,
  willAuthenticate: PropTypes.bool.isRequired
};

export default RedirectAuthenticated;