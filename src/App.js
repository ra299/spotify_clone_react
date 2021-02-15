import React,{useEffect, useState} from "react";
import './App.css';
import Login from "./Login";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from 'spotify-web-api-js';
import Player from "./Player"
import {useDataLayerValue} from "./DataLayer";

const spotify = new SpotifyWebApi();

function App() {

    // {"dispatch"} is like a gun , By using this we can shoot to our data layer, like - pull and push
    const [{user, token, playlists}, dispatch] = useDataLayerValue();

    // useEffect run code based on a given condition 
    useEffect(() => {
        const hash = getTokenFromUrl();
        window.location.hash = "";
        const _token = hash.access_token;

        if(_token) {

            // We give token key to spotify, stable connection between spotify and REACT
            spotify.setAccessToken(_token);

            dispatch({
                type: "SET_TOKEN",
                token: _token
            })

            spotify.getMe().then((user) => {
                
                dispatch({
                    type: "SET_USER",
                    user: user,
                });
            });

            spotify.getUserPlaylists('jmperezperez').then(function(playlists) {
                dispatch({
                    type: "SET_PLAYLISTS",
                    playlists,
                });
                console.log(playlists)
            });

            spotify.getPlaylist("78nOPCzVYNZ2IDXv3Rytea").then((response) => {
                dispatch({
                    type: "SET_DISCOVER_WEEKLY",
                    discover_weekly: response,
                })
            })

        }
    },[]);

    return (
        <div className="app">
        {
            token ? (
                <Player spotify = {spotify}/>
            ):(
                <Login/>
            )
        }
        </div>
    );
}

export default App;