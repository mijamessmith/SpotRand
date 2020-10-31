import React, { useState, useEffect } from 'react';
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
import GenreWindow from "./GenreWindow"
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();


export default function App() {

    const params = getHashParams();
    const token = params.access_token;

    const [loggedIn, changeLogin] = useState(false);
    const [userId, setUserId] = useState('');
    const [nowPlaying, setNowPlaying] = useState({});
    const [accessToken, setAccessToken] = useState(null);
    const [paramater, setParams] = useState(params);
    const [playlist, setPlaylist] = useState(null);
    const [playlistId, setPlaylistId] = useState(null);

    useEffect(() => {

        if (params) {
            setParams(params);
            setUserId(params.userId);
            changeLogin(true);
            setAccessToken(token);
            spotifyApi.setAccessToken(token);
        } else {
            setUserId(null);
        }
    }, []);

    var getPlaylistId = (id) => {
        setPlaylistId(id);
    }

    var getPlaylist = (playlist) => {
        setPlaylist(playlist);
    }

    return (
        <div className="App">
            {loggedIn == false &&
                <LoggedOutLanding />
            }

            {loggedIn &&
                <div className="loggedIn">
                    <Layout loggedIn={loggedIn} />
                    <Player authToken={accessToken} userId={userId} setPlaylistId={getPlaylistId} />
                    <GenreWindow authToken={accessToken} playlistId={playlistId} playlist={playlist} />
                </div>
            }
        </div>
    );
}


