import React, { useState } from 'react'
import info from './assets/images/information.svg';
import Graph from './Graph';
import { getTracksFromPlaylist } from "./APIController"


export default function GenreWindow(props) {
    var { authToken, playlistId } = props;
    const [visible, changeVisible] = useState(false)

    const handleClick = async () => {
        let playlistTracks = await getTracksFromPlaylist(authToken, playlistId);
        console.log(playlistTracks)
        changeVisible(!visible);
    }

    return (
        <div className='GenreWindow'>
            <button className="GenreWindow-button" onClick={handleClick}>Get My Genres</button>
            {visible ?
                <Graph
                    toggle={handleClick}
                    width={400}
                    height={400}


                />
                : null
            }
        </div>
    )
}