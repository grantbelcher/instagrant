import React, { useEffect } from 'react';
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

const App = ({ isLoggedIn }) => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Redirect to="/dashboard" /> : <LandingPage />}
        </Route>
        <Route path="/dashboard">
          <Main />
        </Route>
      </Switch>
    </div>
  );
};
const mapStateToProps = (state) => {
  const { isLoggedIn } = state.auth;
  return {
    isLoggedIn,
  };
};

export default connect(mapStateToProps, null)(App);
