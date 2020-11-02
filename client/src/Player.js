import React, { useState, useEffect } from 'react'
import EmbeddedPlayer from './EmbeddedPlayer'
import Dislike from './Dislike';
import Like from './Like'
import { getRandomStrForTrackSearch } from "./utils";
import { getASpotifyTrackFromRandomStr, getArtistInformation } from "./APIController"

function Player(props) {

    var { authToken, userId, playlistIdHandler } = props;

    const [trackId, changeTrackId] = useState("4WhyHQ2BXi2VU1iaFbF6jv");
    const [playlistId, getplayListId] = useState(null);
    const [trackLikeCount, changeTrackLikeCount] = useState(0);
    const [trackDislikeCount, changeTrackDislikeCount] = useState(0);
    const [artistId, setArtistId] = useState(null);
    const [artistData, setArtistData] = useState(null);

    //state updater functions to be passed as props

    const updateTrack = (tID) => {
        changeTrackId(tID)
    }

    const updateTrackLikeCount = (TLC) => {
        //how to increment? Can we add one in changeTrackLikecount
        changeTrackLikeCount(trackLikeCount + TLC); 
        updateTrackStr();
    }

    const updateDislikeCount = (TLC) => {
        changeTrackDislikeCount(trackDislikeCount + TLC);
        updateTrackStr();
    }

    const handleGetArtistInformation = async () => {
        if (artistId) {
            let artist = await getArtistInformation(authToken, artistId);
            if (artist) {
                setArtistData(artist);
            }
        } else {

        }
    }

    const updatePlaylistId = (pID) => {
        getplayListId(pID);
        playlistIdHandler(pID);
    }

    const updateTrackStr = () => {
        async function getData() {
            let newTrackId = await getASpotifyTrackFromRandomStr(getRandomStrForTrackSearch())
            if (newTrackId) {
                changeTrackId(newTrackId);        
            } else console.log("did not receive newTrack in Dislike.js")
        } getData()
    };

    return (
        <div className="Player">
            <EmbeddedPlayer trackIdFromDislike={trackId} />
            <div className="Player-icon-container">
                <Dislike updateDislike={updateDislikeCount} />
                <Like updatePlayerTrack={updateTrack} updateCount={updateTrackLikeCount} currentTrack={trackId} user={userId} authToken={authToken} playlist={playlistId} updatePlaylist={updatePlaylistId} />
                <button className="Player-ArtistInformation" onClick={handleGetArtistInformation}>Get Info on Artist</button>
            </div>
        </div>
        
        )
}

export default Player;