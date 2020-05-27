import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './Dashboard';
import LandingPage from './LandingPage';

// useEffect(async () => {
//   try {
//     const token = await localStorage.getItem('token');
//     token ?
//   } catch (error) {
//     console.log(error.message);
//   }
// }, []);
const App = ({ isLoggedIn }) => {
  console.log(isLoggedIn, 'App');
  return (
    <div>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Redirect to="/dashboard" /> : <LandingPage />}
        </Route>
        <Route path="/dashboard">
          <Dashboard />
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
