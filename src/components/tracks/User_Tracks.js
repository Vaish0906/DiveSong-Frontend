import React, { Component } from 'react';
import Track from './Track';
import { Consumer } from '../../context';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

class User_Tracks extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { tracks, users, user } = value;

          return (
            <div className="background">
              <Header branding="DiveSong" />

              <div className="container">
                <h1 className="display-4 mb-2">
                  <span className="text-success">Favourite</span>{' '}
                  <span className="text-light">Songs</span>
                </h1>
                <div className="album py-5">
                  <div className="container">
                    <div className="row">
                      {tracks.map(track =>
                        track.like === 1 ? (
                          <Track key={track.id} track={track} />
                        ) : null
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />

              <div className="container">
                <h1 className="display-4 mb-2">
                  <span className="text-success">Unliked</span>{' '}
                  <span className="text-light">Songs</span>
                </h1>
                <div className="album py-5">
                  <div className="container">
                    <div className="row">
                      {tracks.map(track =>
                        track.like === -1 ? (
                          <Track key={track.id} track={track} />
                        ) : null
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />

              <Footer />
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default User_Tracks;
