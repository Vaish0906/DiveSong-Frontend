import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import classnames from 'classnames';
import { config } from '../../config';
import axios from 'axios';
// import serialize from '../../serialize';

class Track extends Component {
  onLikeCLick = (id, uid, auth_token, dispatch) => {
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
      auth_token: auth_token,
      'user-agent':
        'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:63.0) Gecko/20100101 Firefox/63.0',
      tid: id,
      operation: 'like',
      uid: uid
    };
    fetch(
      `http://${config.server.hostname}:${config.server.port}/like?` +
        serialize(query),
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    ).then(res =>
      dispatch({
        type: 'LIKE_SONG',
        payload: id
      })
    );
    // dispatch({
    //   type: 'LIKE_SONG',
    //   payload: id
    // });
  };

  onUnlikeCLick = async (id, uid, auth_token, dispatch) => {
    const oper = {
      auth_token: auth_token,
      'user-agent':
        'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:63.0) Gecko/20100101 Firefox/63.0',
      tid: id,
      operation: 'dislike',
      uid: uid
    };
    // await axios
    //   .post(`http://${config.server.hostname}:${config.server.port}/like`, oper)
    //   .then(res =>
    //     dispatch({
    //       type: 'UNLIKE_SONG',
    //       payload: id
    //     })
    //   );
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
      auth_token: auth_token,
      'user-agent':
        'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:63.0) Gecko/20100101 Firefox/63.0',
      tid: id,
      operation: 'dislike',
      uid: uid
    };
    fetch(
      `http://${config.server.hostname}:${config.server.port}/like?` +
        serialize(query),
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    ).then(res =>
      dispatch({
        type: 'UNLIKE_SONG',
        payload: id
      })
    );
  };

  onRequestClick = (id, uid, auth_token, dispatch) => {
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
      auth_token: auth_token,
      'user-agent':
        'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:63.0) Gecko/20100101 Firefox/63.0',
      tid: id,
      uid: uid
    };
    fetch(
      `http://${config.server.hostname}:${config.server.port}/request?` +
        serialize(query),
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    ).then(res =>
      dispatch({
        type: 'REQUEST_SONG',
        payload: id
      })
    );

    // dispatch({
    //   type: 'REQUEST_SONG',
    //   payload: id
    // });
  };

  render() {
    const { id, name, artist, img, like, requested } = this.props.track;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          const { user } = value;
          return (
            <div className="col-md-4">
              <div
                className="card mb-4 bg-dark"
                // style={{ cursor: 'pointer' }}
                // onClick={() =>
                //   this.setState({
                //     showTrackInfo: !this.state.showTrackInfo
                //   })
                // }
              >
                <img
                  className="card img-top border-0 bg-dark"
                  src={`http://${config.server.hostname}:${
                    config.server.port
                  }/image?tid=${id}`}
                  // src="https://t2.genius.com/unsafe/220x220/https%3A%2F%2Fimages.genius.com%2F2ffbcb4f4921cb2dad89925466513a98.1000x1000x1.jpg"
                  alt={name}
                  height="225px"
                  width="100%"
                />

                <div className="card-body">
                  <h6 className="text-white-50 bg-dark text-truncate">
                    {name} - {artist}{' '}
                  </h6>

                  {/* {showTrackInfo ? ( */}
                  <ul className="list-group border-0">
                    <li className="list-group-item bg-dark border-0">
                      <div className="row bg-dark">
                        <div
                          className={classnames(
                            'col btn btn-sm btn-outline-success',
                            { 'bg-success': like === 1 }
                          )}
                          onClick={this.onLikeCLick.bind(
                            this,
                            id,
                            user.uid,
                            user.auth_token,
                            dispatch
                          )}
                        >
                          <i
                            className="fas fa-thumbs-up"
                            style={{ color: 'white' }}
                          />
                        </div>

                        <div
                          className={classnames(
                            'col btn btn-sm btn-outline-success',
                            { 'bg-success': like === -1 }
                          )}
                          onClick={this.onUnlikeCLick.bind(
                            this,
                            id,
                            user.uid,
                            user.auth_token,
                            dispatch
                          )}
                        >
                          <i
                            className="fas fa-thumbs-down"
                            style={{ color: 'white' }}
                          />
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item bg-dark border-0">
                      <div
                        className={classnames(
                          'col btn btn-sm btn-outline-success',
                          // { 'bg-success': like === -1 }
                          { 'btn-outline-dark bg-success': requested === 1 }
                        )}
                        onClick={this.onRequestClick.bind(
                          this,
                          id,
                          user.uid,
                          user.auth_token,
                          dispatch
                        )}
                      >
                        Request
                      </div>
                    </li>
                  </ul>
                  {/* ) : null} */}
                </div>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Track.propTypes = {
  track: PropTypes.object.isRequired
};

export default Track;
