import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import LandingPage from './LandingPage';
import Main from './Main';

import { loadUser } from '../redux/actions/auth';
import store from '../redux/index';
import setAuthToken from '../../../utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = ({ isLoggedIn, token }) => {
  const [jwt, setJWT] = useState(null)
  useEffect(() => {
    const webToken = localStorage.getItem('token');
    store.dispatch(loadUser(jwt));
    setJWT(webToken);
  }, []);
  console.log(jwt, isLoggedIn);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     store.dispatch(loadUser(token));
  //   }
  // }, [isLoggedIn]);

  return (
    <div>
      <Switch>
        <Route exact path="/">
          {jwt || token ? <Redirect to="/dashboard" /> : <LandingPage setToken={setJWT} />}
        </Route>
        <Route path="/dashboard">
          <Main />
        </Route>
      </Switch>
    </div>
  );
};
const mapStateToProps = (state) => {
  const { isLoggedIn, token } = state.auth;
  return {
    isLoggedIn,
    token
  };
};

export default connect(mapStateToProps, null)(App);
