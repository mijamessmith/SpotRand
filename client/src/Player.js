import React, { useState, useEffect } from 'react'
import EmbeddedPlayer from './EmbeddedPlayer'
import Dislike from './Dislike';
import Like from './Like'
import { getRandomStrForTrackSearch } from "./utils";
import { getASpotifyTrackFromRandomStr, getArtistInformation } from "./APIController"

function Player(props) {

    var { authToken, userId, playlistIdHandler, firstSearchString } = props;

    const [trackId, changeTrackId] = useState(null);
    const [playlistId, getplayListId] = useState(null);
    const [trackLikeCount, changeTrackLikeCount] = useState(0);
    const [trackDislikeCount, changeTrackDislikeCount] = useState(0);
    const [artistId, setArtistId] = useState(null);
    const [artistData, setArtistData] = useState(null);
    const [isFirstSearch, setIsFirstSearch] = useState(true);


    useEffect(() => {
        if (trackId === null) {
            debugger;
            return updateTrackStr();
        }
    }, [])

    //state updater functions to be passed as props

    const updateIsFirstSearch = () => {
        setIsFirstSearch(false);
    }


    const updateTrack = (tID) => {
        changeTrackId(tID)
    }

    const updateTrackLikeCount = (TLC) => {
        //how to increment? Can we add one in changeTrackLikecount
        changeTrackLikeCount(trackLikeCount + TLC); 
        updateTrackStr();
    }

    const handleArtistId = (id) => {
        setArtistId(id);
    }

    const updateDislikeCount = (TLC) => {
        changeTrackDislikeCount(trackDislikeCount + TLC);
        updateTrackStr();
    }

    const handleGetArtistInformation = async () => {
        debugger;
        async function getInfo() {
        return getArtistInformation(authToken, artistId)
        }
        await getInfo()
            .then(artist => {
                debugger;
        if (artist) {
                setArtistData(artist);
        } else {
            console.log("Did not receive Artist Data")
        }
            }).catch((err) => {
                console.log(err)
            })
}

    const getTracks = async () => {
        if (playlistId) {
            let playlistItems = await getTracksFromPlaylist(this.state.accessToken, this.state.playlistId);
            debugger;
            console.log(playlistItems);
            this.setState({
                playlist: playlistItems
            })
        } else {
            //get the playlistId
        }
    }



    const updatePlaylistId = (pID) => {
        getplayListId(pID);
        playlistIdHandler(pID);
    }

    const updateTrackStr = async () => {
        async function getData() {
            return getASpotifyTrackFromRandomStr(getRandomStrForTrackSearch());
        } await getData()
            .then(data => {
            debugger;
                if (data[0]) {
                    let newTrackId = data[0];
                    let newArtistId = data[1];
                    updateTrack(newTrackId);
                    setArtistId(newArtistId);
            } else console.log("did not receive newTrack in Dislike.js")
            })
    };

    return (
        <div className="Player">
            {trackId ?
                <EmbeddedPlayer trackIdFromDislike={trackId} /> : null}
            
            <div className="Player-icon-container">
                <Dislike handleArtistId={handleArtistId} updateDislike={updateDislikeCount} />
                <Like handleArtistId={handleArtistId} updatePlayerTrack={updateTrack} updateCount={updateTrackLikeCount} currentTrack={trackId} user={userId} authToken={authToken} playlist={playlistId} updatePlaylist={updatePlaylistId} isFirstSearch={isFirstSearch} updateIsFirstSearch={updateIsFirstSearch} />
            </div>
            <div className="Player-information">
                <button className="Player-information-artistInfo" onClick={handleGetArtistInformation}>Get Info on Artist</button>
            </div>
        </div>
        
        )
}

export default Player;