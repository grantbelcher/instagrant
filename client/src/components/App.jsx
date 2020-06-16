import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import LandingPage from './LandingPage';
import Main from './Main';
import { setDeviceWidth } from '../redux/actions/views';
import { loadUser } from '../redux/actions/auth';
import store from '../redux/index';
import setAuthToken from '../../../utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}


const App = ({ isLoggedIn, token, setWidth }) => {
  const [jwt, setJWT] = useState(null);

  useEffect(() => {
    setWidth(window.innerWidth);
    const webToken = localStorage.getItem('token');
    store.dispatch(loadUser(jwt));
    setJWT(webToken);
  }, []);

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
    token,
  };
};

const mapDispatchToProps = {
  setWidth: setDeviceWidth,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
