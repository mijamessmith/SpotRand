import React, { useState } from 'react';
import cross from "./assets/images/cross.svg"

export default function ArtistInfoWindow(props) {

    var {artistData, artistInfoToggle, setArtistInfoToggle } = props


    var getPopularity = (n) => {
        if (n <= 1) {
            return "Undiscovered Artist"
        }
        else if (n <= 5) {
            return "Extremely Low Profile  "
        } 
        else if (n <= 12) {
            return "Low Profile"
        } 
        else if (n <= 25) {
            return "Some Profile"
        } 
        else if (n < 40) {
            return "Currently Very Present"
        } 

        else if (n < 60) {
            return "Popular Artist"
        } 

        else if (n < 74) {
            return "Major Exposure"
        } 

        else if (n <= 90) {
            return "Leading Artist of Today"
        } 

        else if (n <= 100) {
            return "Chart Topping Spotify Artist"
        } 
    }


    var artistPopularity = getPopularity(artistData.popularity);

    const handleClick = () => {
        debugger;
        setArtistInfoToggle(!artistInfoToggle);
    }


    return (
        <div className="ArtistInfoWindow">
            <img className="ArtistInfoWindow-cross" style={{ height: 30, width: 30 }} src={cross} onClick={handleClick} />
            <div className="ArtistInfoWindow-name">{artistData.name}</div>

            <img className="ArtistInfoWindow-artist-img" src={artistData.images[1].url} alt="Artist Picture" />

            {artistData.genres ?
                <div className="ArtistInfoWindow-genres">GENRES:
                     {artistData.genres.map((genre, index = 0) => (
                         <div className="ArtistInfoWindow-artist-genre" key={index}>{genre}</div>
                     )
                     )}
                </div>
                 : null}

            <div className="artistInfoWindow-followers">FOLLOWERS: {artistData.followers.total}</div>

            <div className="artistInfoWindow-populartity">POPULARITY: {artistPopularity}</div>
        </div>
        )
}