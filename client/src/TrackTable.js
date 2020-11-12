import React, { useState } from 'react';
import MaterialTable from "material-table";

export default function TrackTable(props) {
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
            title: "Album",
            field: 'album'
        }
    ]

    return (
        <MaterialTable title="Liked Tracks" data={data} columns={columns}
            options={{
                sorting: true,
                doubleHorizontalScroll: true,
                headerStyle: {
                    fontSize: "25px",
                    fontWeight: "700",
                    backgroundColor: "#2DE2E6"
                },
                rowStyle: {
                    fontSize: "20px",
                    color: "red"
                }
            }}
        />
        )
}