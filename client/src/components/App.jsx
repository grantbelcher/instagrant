import React from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import LandingPage from './LandingPage';

const App = () => {
  console.log('yoo');
  return (
    <div>
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/">
          <LandingPage />
          <li>
            <Link to="/dashboard">dashboard</Link>
          </li>
        </Route>
      </Switch>
    </div>
  );
};


export default App;
