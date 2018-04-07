import React from 'react';
import PropTypes from 'prop-types';
import { Match, Redirect } from 'react-router';

const MatchAuthenticated = ({
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
      if (isAuthenticated) { return <Component {...props} />; }
      if (willAuthenticate) { return null; }
      if (!willAuthenticate && !isAuthenticated) { return <Redirect to={{ pathname: '/login' }} />; }
      return null;
    }}
  />;

MatchAuthenticated.propTypes = {
  component: PropTypes.any.isRequired,
  pattern: PropTypes.string.isRequired,
  exactly: PropTypes.bool,
  isAuthenticated: PropTypes.bool.isRequired,
  willAuthenticate: PropTypes.bool.isRequired
};

export default MatchAuthenticated;