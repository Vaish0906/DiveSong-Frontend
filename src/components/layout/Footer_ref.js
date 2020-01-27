import React, { Component } from 'react';
import { config } from '../../config';

class Footer extends Component {
  render() {
    // const { branding } = this.props;
    return (
      <footer className="footer veryblack">
        <div className="container">
          <iframe
            src={`http://${config.server.hostname}:${
              config.server.port
            }/playNextSong`}
          >
            <script />{' '}
          </iframe>
        </div>
      </footer>
    );
  }
}

export default Footer;
