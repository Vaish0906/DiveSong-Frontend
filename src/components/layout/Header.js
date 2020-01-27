import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../../context';

class Header extends Component {
  state = {
    search: ''
  };

  handleChange = (dispatch, e) => {
    // this.setState({
    //   [e.target.name]: e.target.value
    // });
    // const { search } = this.state;
    const x = e.target.value;
    // console.log(x);
    this.setState({ search: e.target.value }, () => {
      console.log(this.state.search);
      dispatch({
        type: 'SEARCH_SONG',
        payload: this.state.search
      });
    });
    // dispatch({
    //   type: 'SEARCH_SONG',
    //   payload: x
    // });
  };

  render() {
    const { branding } = this.props;
    return (
      <Consumer>
        {value => {
          const { user, dispatch } = value;
          return (
            <nav className="navbar navbar-expand-sm navbar-dark veryblack mb-3 py-0 sticky-top">
              <div className="container">
                <Link to="/homepage" className="navbar-brand">
                  {branding}
                </Link>
                {/* <form onSubmit={this.handleSubmit.bind(this, dispatch)}> */}

                <input
                  className="form-control bg-dark w-50 border-0 text-white-50"
                  type="text"
                  name="search"
                  placeholder="Search"
                  aria-label="Search"
                  // onSubmit={
                  // console.log('submitted')
                  // this.handleSubmit.bind(this, dispatch)
                  // }
                  onChange={this.handleChange.bind(this, dispatch)}
                  onKeyDown={this.handleChange.bind(this, dispatch)}
                />

                {/* </form> */}
                <div>
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <Link to="/homepage" className="nav-link">
                        <i className="fas fa-home"> Home</i>
                      </Link>
                    </li>
                    <li className="nav-item">
                      {/* <Link to="/" className="nav-link">
                        Log Out
                      </Link> */}
                      {user.session ? (
                        <a href="/sign-in" className="nav-link">
                          Log Out
                        </a>
                      ) : (
                        <a href="/sign-in" className="nav-link">
                          Log In
                        </a>
                      )}
                    </li>
                    <li className="nav-item">
                      <Link to="/profile" className="nav-link">
                        {user.fname}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          );
        }}
      </Consumer>
    );
  }
}

export default Header;
