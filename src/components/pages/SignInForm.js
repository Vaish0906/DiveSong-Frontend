import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Consumer } from '../../context';
import uuid from 'uuid';
import { config } from '../../config';

class SignInForm extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(dispatch, e) {
    e.preventDefault();

    const { email, password } = this.state;

    console.log('The form was submitted with the following data:');
    console.log(this.state);

    const newUser = {
      uid: '',
      email: '',
      fname: '',
      lname: '',
      uname: '',
      auth_token: '',
      session: false,
      search: ''
    };

    // dispatch({
    //   type: 'TEMP_USER',
    //   payload: newUser
    // });

    let serialize = function(obj, prefix) {
      var str = [],
        p;
      for (p in obj) {
        if (obj.hasOwnProperty(p)) {
          var k = prefix ? prefix + '[' + p + ']' : p,
            v = obj[p];
          str.push(
            v !== null && typeof v === 'object'
              ? serialize(v, k)
              : encodeURIComponent(k) + '=' + encodeURIComponent(v)
          );
        }
      }
      return str.join('&');
    };
    const query = {
      uname: email,
      password,
      'user-agent':
        'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:63.0) Gecko/20100101 Firefox/63.0',
      secret: 'abcdef'
    };
    fetch(
      `http://${config.server.hostname}:${config.server.port}/login?` +
        serialize(query),
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => (console.log(response.status), response.json()))
      .then(
        json => (
          // dispatch({
          //   type: 'TEMP_USER'
          //   // payload: newUser
          // }),
          console.log(json.auth_token),
          (newUser.uid = json.uid),
          (newUser.email = json.email),
          (newUser.fname = json.fname),
          (newUser.auth_token = json.auth_token),
          (newUser.uname = json.uname),
          (newUser.lname = json.lname),
          (newUser.session = true),
          (newUser.search = ''),
          //   id: json.uid,
          //   email,
          //   password,
          //   name: ''
          // };

          dispatch({
            type: 'TEMP_USER',
            payload: newUser
          }),
          this.props.history.push('/homepage')
        )
      )
      .catch(error => {
        this.props.history.push('/login-fail');
      });
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div>
              <div className="PageSwitcher">
                <NavLink
                  to="/sign-in"
                  activeClassName="PageSwitcher__Item--Active"
                  className="PageSwitcher__Item"
                >
                  Sign In
                </NavLink>
                <NavLink
                  exact
                  to="/"
                  activeClassName="PageSwitcher__Item--Active"
                  className="PageSwitcher__Item"
                >
                  Sign Up
                </NavLink>
              </div>

              <div className="FormTitle">
                <NavLink
                  to="/sign-in"
                  activeClassName="FormTitle__Link--Active"
                  className="FormTitle__Link"
                >
                  Sign In
                </NavLink>{' '}
                or{' '}
                <NavLink
                  exact
                  to="/"
                  activeClassName="FormTitle__Link--Active"
                  className="FormTitle__Link"
                >
                  Sign Up
                </NavLink>
              </div>
              <div className="FormCenter">
                <form
                  className="FormFields"
                  onSubmit={this.handleSubmit.bind(this, dispatch)}
                >
                  <div className="FormField">
                    <label className="FormField__Label" htmlFor="email">
                      E-Mail/UserName
                    </label>
                    <input
                      type="text"
                      id="email"
                      className="FormField__Input text-dark"
                      placeholder="Enter your email/user-name"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="FormField">
                    <label className="FormField__Label" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="FormField__Input text-dark"
                      placeholder="Enter your password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="FormField">
                    <button className="FormField__Button mr-20">Sign In</button>{' '}
                    <Link to="/" className="FormField__Link">
                      Create an account
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default SignInForm;
