import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch
} from 'react-router-dom';

import './App.css';
import Header from './components/layout/Header';
import Tracks from './components/tracks/Tracks';
import Footer from './components/layout/Footer';
import SignInForm from './components/pages/SignInForm';
import SignUpForm from './components/pages/SignUpForm';
import Sign from './components/pages/Sign';

import Tracks1 from './components/tracks/Tracks1';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from './context';
import User_Tracks from './components/tracks/User_Tracks';
import LoginFail from './components/pages/LoginFail';
import SignUpFail from './components/pages/SignUpFail';

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={SignUpForm} />
              <Route exact path="/sign-in" component={SignInForm} />
              <Route exact path="/homepage" component={Tracks1} />
              <Route exact path="/profile" component={User_Tracks} />
              <Route exact path="/login-fail" component={LoginFail} />
              <Route exact path="/signup-fail" component={SignUpFail} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );

    return (
      <Provider>
        <div className="App background">
          <Header branding="DiveSong" />

          <Tracks />

          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;
