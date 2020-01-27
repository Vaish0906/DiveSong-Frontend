import React, { Component } from 'react';
import { config } from './config';
import axios from 'axios';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        users: [action.payload, ...state.users]
      };

    case 'TEMP_USER':
      return {
        ...state,
        user: action.payload
      };

    case 'LIKE_SONG':
      return {
        ...state,
        tracks: state.tracks.map(
          track => (
            track.id === action.payload
              ? track.like === 1
                ? (track.like = 0)
                : (track.like = 1)
              : { track },
            track
          )
        )
      };

    case 'UNLIKE_SONG':
      return {
        ...state,
        tracks: state.tracks.map(
          track => (
            track.id === action.payload
              ? track.like === -1
                ? (track.like = 0)
                : (track.like = -1)
              : { track },
            track
          )
        )
      };

    case 'REQUEST_SONG':
      return {
        state
      };

    case 'POPULATE_TRACKS':
      return {
        ...state,
        tracks: action.payload
      };

    case 'SEARCH_SONG': {
      let ret = {
        ...state
      };
      ret.user.search = action.payload;
      return ret;
    }

    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    tracks: [],

    user: {
      // id: 1,
      // name: 'Moosa',
      // email: 'moosa@gmail.com',
      // password: '1234'
      // random: 'random'
    },
    dispatch: action => (
      this.setState(state => reducer(state, action)),
      action.type === 'TEMP_USER' ? this.getSongs() : {},
      action.type === 'SEARCH_SONG' ? this.getSongs() : {},
      action.type === 'REQUEST_SONG' ? this.getSongs() : {}
    )
  };
  // {cookies.set("uid",this.state.user["uid"]),
  // cookies.set("fname",this.state.user["fname"])
  // cookies.set("lname",this.state.user["lname"])
  // cookies.set("uname",this.state.user["uname"])
  // cookies.set("email",this.state.user["email"])
  // cookies.set("auth_token",this.state.user["auth_token"])

  // console.log(this.state.user)}

  getSongs = async () => {
    // const res = await axios.get(
    //   `http://${config.server.hostname}:${config.server.port}/songlist?uid=${
    //     this.state.user.uid
    //   }`
    const res = await axios.get(
      `http://${config.server.hostname}:${config.server.port}/search?uid=${
        this.state.user.uid
      }&search=${this.state.user.search}`
    ); // Dont forget the await!!

    this.setState({
      tracks: res.data
    });
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
