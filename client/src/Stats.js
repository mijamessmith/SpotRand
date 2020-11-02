import React, { useState } from 'react'
import info from './assets/images/information.svg';
import Graph from './Graph';
import { getTracksFromPlaylist } from "./APIController"


export default function Stats(props) {
    var { authToken, playlistId } = props;
    const [visible, changeVisible] = useState(false)
    const [stats, setStats] = useState(null);

    const handleClick = async () => {
        let playlist = await getTracksFromPlaylist(authToken);
        console.log(playlist)
        debugger;
        changeVisible(!visible);
    }

    return (
        <div className='GenreWindow'>
            <button className="GenreWindow-button" onClick={handleClick}>Stats</button>
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