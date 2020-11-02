import React, { Component } from 'react';
import { getRandomStrForTrackSearch, getHashParams } from "./utils";

import './assets/css/App.css';
import './assets/css/EmbeddedPlayer.css';
import './assets/css/Like.css';
import './assets/css/Dislike.css';
import './assets/css/Layout.css';
import './assets/css/LoggedOutLanding.css';
import './assets/css/Player.css';
import './assets/css/PopoutInfo.css';
import './assets/css/GenreWindow.css';

import LoggedOutLanding from './pages/LoggedOutLanding'
import Player from './Player';
import Layout from './Layout';
import Stats from "./Stats"
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();


class App extends Component {
    constructor(props) {
        super();
        const params = getHashParams();
        const token = params.access_token;
        var userId;

        if (params) {
            userId = params.userId
        } else {
            userId = null;
        }


        if (token) {
            spotifyApi.setAccessToken(token);
        }

        this.state = {
            loggedIn: token ? true : false,
            userId: userId,
            nowPlaying: { name: '4WhyHQ2BXi2VU1iaFbF6jv', albumArt: '' },
            recentlyPlayed: null,
            accessToken: token,
            params: params,
            playlist: {},
            playlistId: null
        }

        this.playlistIdHandler = this.playlistIdHandler.bind(this);
        this.playlistTrackHandler = this.playlistTrackHandler.bind(this);

    }

    playlistIdHandler(id) {
        this.setState({
            playlistId: id
        })
    }

    playlistTrackHandler(tracks) {
        this.setState({
            playlist: tracks
        })
    }


    render() {
      
    return (
        <div className="App">
            {!this.state.loggedIn &&
                <LoggedOutLanding />
            }

            {this.state.loggedIn &&
                <div className="loggedIn">  
                <Layout loggedIn={true} />
                <Player authToken={this.state.accessToken} userId={this.state.userId} playlistIdHandler={this.playlistIdHandler} />
                <Stats authToken={this.state.accessToken} userId={this.state.userId} playlistId={this.state.playlistId} />
            </div>
            }
      </div>
    );
  }
}

export default App;
