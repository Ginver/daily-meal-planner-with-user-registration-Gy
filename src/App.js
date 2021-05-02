import React from 'react';
import {BrowserRouter as Router,  Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Profile from './pages/Profile';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import './App.css';

function App() {

  return (
      <>
     <Header />
     <Router >
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route exact path="/signin">
              <SignIn />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
          </Switch>
        </div>
          </Router>

      </>
  );
}

export default App;
