import React, { Component } from 'react';
import { Consumer } from '../../context';
import { Link, NavLink } from 'react-router-dom';
import uuid from 'uuid';
import { config } from '../../config';

class SignUpForm extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      fname: '',
      lname: '',
      uname: '',
      hasAgreed: true
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (dispatch, e) => {
    e.preventDefault();

    const { uname, fname, lname, email, password } = this.state;

    console.log('The form was submitted with the following data:');
    console.log(this.state);

    // const newUser = {
    //   id: uuid(),
    //   name,
    //   email,
    //   password
    // };

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
      fname,
      lname,
      password,
      email,
      uname
    };

    fetch(
      `http://${config.server.hostname}:${config.server.port}/addUser?` +
        serialize(query),
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(json => this.props.history.push('/sign-in'))
      .catch(error => {
        this.props.history.push('/signup-fail');
      });
  };

  render() {
    const { status } = this.state;
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
              {/* {status === 200 ? {} : <p className="text-danger">error</p>} */}
              {/* {status !== '200' ? (
                <p className="text-danger">error 409 </p>
              ) : (
                <div />
              )} */}
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
                  onSubmit={this.handleSubmit.bind(this, dispatch)}
                  className="FormFields"
                >
                  <div className="FormField">
                    <label className="FormField__Label" htmlFor="name">
                      User Name
                    </label>
                    <input
                      type="text"
                      id="uname"
                      className="FormField__Input text-dark"
                      placeholder="Enter your first name"
                      name="uname"
                      value={this.state.uname}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="FormField">
                    <label className="FormField__Label" htmlFor="name">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="fname"
                      className="FormField__Input text-dark"
                      placeholder="Enter your first name"
                      name="fname"
                      value={this.state.fname}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="FormField">
                    <label className="FormField__Label" htmlFor="name">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lname"
                      className="FormField__Input text-dark"
                      placeholder="Enter your last name"
                      name="lname"
                      value={this.state.lname}
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
                    <label className="FormField__Label" htmlFor="email">
                      E-Mail Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="FormField__Input text-dark"
                      placeholder="Enter your email"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </div>

                  {/* <div className="FormField">
                    <label className="FormField__CheckboxLabel">
                      <input
                        className="FormField__Checkbox"
                        type="checkbox"
                        name="hasAgreed"
                        value={this.state.hasAgreed}
                        onChange={this.handleChange}
                      />{' '}
                      I agree all statements in{' '}
                      <a href="" className="FormField__TermsLink">
                        terms of service
                      </a>
                    </label>
                  </div> */}

                  <div className="FormField">
                    <button className="FormField__Button mr-20">Sign Up</button>{' '}
                    <Link to="/sign-in" className="FormField__Link">
                      I'm already member
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

export default SignUpForm;
