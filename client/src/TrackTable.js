import React, { useState } from 'react';
import MaterialTable from "material-table";

export default function MaterialTable(props) {
    var { data } = props;
    const columns = [
        {
            title: "Artist",
            field: 'artist'
        },
        {
            title: "Track",
            field: 'track'
        },
        {
            title: "Albumn",
            field: 'albumn'
        }
    ]

    return (
        <MaterialTable title="playlistTracks" data={data} columns={columns} />
        )
}