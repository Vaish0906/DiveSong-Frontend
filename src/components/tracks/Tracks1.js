import React, { Component } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Tracks from './Tracks';
import { Consumer } from '../../context';

class Tracks1 extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { tracks, users, user } = value;
          return (
            <React.Fragment>
              {/* {users.map(x => */}
              {/* /*x.email === user.email && x.password === user.password*/}
              {/* true */}
              {/* ? ((user.name = x.name), */}
              {/* console.log(user.name), */}
              {/* ( */}
              <div className="background">
                <Header branding="DiveSong" />

                <Tracks />
                <br />
                <br />
                <br />
                <br />
                <br />

                <Footer />
              </div>
              {/* )) */}
              {/* : (console.log('unverified'), */}
              {/* (
                      <h3 style={{ backgroundColor: 'white' }}>
                        {' '}
                        Incorrect EMail or Password
                      </h3>
                    ))
              )} */}
            </React.Fragment>
          );
        }}
      </Consumer>
    );

    // return (

    //   <div className="background">
    //     <Tracks />
    //     <Header branding="DiveSong" />

    //     <Footer />
    //   </div>

    // );
  }
}

export default Tracks1;
