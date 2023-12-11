import React, { useState, useEffect } from "react";

import { PlaylistTracks, 
  playlistsItemTrack
} from "./Tracks";

import {
  getPlaylist,
  setCurrentTrack,
  actionPlaylistTrackPressed,
} from "../actions/playerActions";
import { connect } from "react-redux";
import Player from "./Player";

import { Spin } from "antd";

import Header from "./Header";
import Footer from "./Footer";

import "../styles/library.css";



const Playlist = ({
  pressedTracks,
  actionPlaylistTrackPressed,
  playlistsItemTrack,
  actionOneTrackFind,
  actionSetTrack,
  state,
  getPlaylist,
  setTrack,
  playlists = [],
  playlistitem,
  highlighted,
  setCurrentTrack,
  currentTrack,
  oneTrackFind,
}) => {

  let playlistFilteredTracks = [];

  useEffect(() => {
    getPlaylist && getPlaylist();
  }, []);
  console.log("playlists in Playlist: ", playlists);
  useEffect(() => {
    setTrack && setTrack();
  }, []);
  return (
    <div className="wrapper">
      <Header />
      {!playlists.length && (
        <div className="container">
          <Spin size="large" tip="loading..."/>
        </div>
      )}
      <div className="main">
        <div className="trackList">
          <ul className="playlists">
            {playlists.map((playlistsItem, index) =>
              playlistsItem ? (
                  <PlaylistTracks
                  key={index}
                  actionPlaylistTrackPressed={actionPlaylistTrackPressed}
                    playlistsItem={playlistsItem}
                    actionOneTrackFind={actionOneTrackFind}
                    playlistFilteredTracks={playlistFilteredTracks}
                    pressedTracks={pressedTracks}
                    highlighted = {  highlighted  }
                  />
              ) : (
                ""
              )
            )}
          </ul>
        </div>
      </div>
      <Player pressedTracks={pressedTracks}/>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  playlists: state && state.player && state.player.playlists,
  state: state,
  currentTrack: state.player.currentTrack,
  pressedTracks: state.player.pressedTracks,
});

const mapDispatchToProps = (dispatch) => ({
  getPlaylist: () => dispatch(getPlaylist()),
  setCurrentTrack: (trackIndex) => dispatch(setCurrentTrack(trackIndex)),
  actionPlaylistTrackPressed: (pressedTracks) => dispatch(actionPlaylistTrackPressed(pressedTracks))
});

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
