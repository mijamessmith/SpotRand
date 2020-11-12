import React, { useState, useEffect } from 'react';
import { formatTrackDataFromArray } from './utils';
import MaterialTable from "material-table";
export default function TracksWindow(props) {

    var {playlistTracks} = props
    const [formattedPlaylist, getFormattedPlaylist] = useState(playlistTracks);

    return (
        <div className="TracksWindow">
            <h2>Spotind Playlist</h2>
            <table>
                <tr>
                    <th>Artist</th>
                    <th>Track</th>
                    <th>Album</th>
                </tr>
                <tbody>
                {
                    formattedPlaylist.map((obj, index) => (
                        <div>
                            <tr key={index}>
                                {obj.artist}
                            </tr>
                            <tr key={index}>
                                {obj.track}
                            </tr>
                            <tr key={index}>
                                {obj.album}
                            </tr>
                        </div>
                        )
                        )}
                    </tbody>

            </table>
        </div>
        )
}