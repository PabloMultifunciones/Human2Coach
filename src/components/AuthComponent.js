import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/loginActions';

/**
 * Allow login from a code given in backend
 */
const AuthComponent = (props) => {
  const query = new URLSearchParams(useLocation().search);
  const code = query.get('code');

  if (code) {
    props.loginRequest({ token: code });
  }
  if (!code) {
    return (
      <Navigate
        to={{
          pathname: '/'
        }}
      />
    );
  }

  return (
    <Navigate
      to={{
        pathname: '/dashboard'
      }}
    />
  );
};

const mapDispatchToProps = {
  loginRequest
};

export default connect(null, mapDispatchToProps)(AuthComponent);
