import React, { useEffect, useState } from "react";
import { useDataLayerValue } from "./DataLayer";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import "./Footer.css";
import { Grid, Slider } from "@material-ui/core";

function Footer({spotify}) {
    const [{ token, item, playing }, dispatch] = useDataLayerValue();

    useEffect(() => {
        spotify.getMyCurrentPlaybackState().then((r) => {
        console.log(r);

        dispatch({
            type: "SET_PLAYING",
            playing: r.is_playing,
        });

        dispatch({
            type: "SET_ITEM",
            item: r.item,
        });
        });
    }, [spotify]);

    const handlePlayPause = () => {
        if (playing) {
        spotify.pause();
        dispatch({
            type: "SET_PLAYING",
            playing: false,
        });
        } else {
        spotify.play();
        dispatch({
            type: "SET_PLAYING",
            playing: true,
        });
        }
    };

    const skipNext = () => {
        spotify.skipToNext();
        spotify.getMyCurrentPlayingTrack().then((r) => {
        dispatch({
            type: "SET_ITEM",
            item: r.item,
        });
        dispatch({
            type: "SET_PLAYING",
            playing: true,
        });
        });
    };

    const skipPrevious = () => {
        spotify.skipToPrevious();
        spotify.getMyCurrentPlayingTrack().then((r) => {
        dispatch({
            type: "SET_ITEM",
            item: r.item,
        });
        dispatch({
            type: "SET_PLAYING",
            playing: true,
        });
        });
    };
    return (
        <div className = "footer">
            <div className = "footer__left">
                <img
                    className="footer__albumLogo"
                    src= "https://i.scdn.co/image/ab67706c0000bebb6bf87746fd935e4143b65d43"
                    alt = ""
                />
                <div className = "footer__songInfo">
                    <h4>Yeah!</h4>
                    <p>Usher</p>
                </div>
            </div>
            <div className = "footer__center">
                <ShuffleIcon className="footer__green"/>
                <SkipPreviousIcon className="footer__icon"/>
                <PlayCircleOutlineIcon className="footer__icon" fontSize = "large"/>
                <SkipNextIcon className="footer__icon"/>
                <RepeatIcon className="footer__green"/>
            </div>
            <div className = "footer__right">
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlayIcon/>
                    </Grid>
                    <Grid item>
                        <VolumeDownIcon/>
                    </Grid>
                    <Grid item xs>
                        <Slider/>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Footer
