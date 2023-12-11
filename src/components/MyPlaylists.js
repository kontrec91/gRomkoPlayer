import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Spin } from "antd";

import  AddTrack  from "./AddTrack";
import Player from "./Player";
import {
  findUser,
  findMyPlaylists,
  createMyPlaylist,
  findCurrentPlaylist,
} from "../actions/playerActions";

import Header from "./Header";
import Footer from "./Footer";

import "../styles/library.css";
import "../styles/playlists.css";
import "../styles/MyPlaylists.css";

const MyPlaylists = ({
  findUser,
  createMyPlaylist,
  findMyPlaylists,
  showMyPlaylists = [],
  findCurrentPlaylist,
  playlist = [],
  currentTrack
}) => {
  
  const [playlistName, setPlaylistName] = useState("");
  const [buttonClick, setButtonClick] = useState(false);

  useEffect(() => {
    findUser && findUser(`${localStorage.user}`);
  }, []);

  useEffect(() => {
    findMyPlaylists && findMyPlaylists();
  }, [localStorage.userId]);

  useEffect(() => {
    findMyPlaylists();
  }, [buttonClick]); //вызывая функцию findMyPlaylists через useEffect можно получить ошибку при переходе из страницы мои плейлисты на страницу все плейлисты

  function currentPlaylist(id) {
    findCurrentPlaylist(id);
  }

  return (
    <>
      <Header />
      <div className="main">
        <div className="my_playlists">
          <div className="my_playlists_list">
            <h2>My playlists</h2>
            <ul>
              {
              !showMyPlaylists.length ? (
                <div className="container2">
                  <Spin size="large" tip="loading..." />
                </div>
              ) : (
                showMyPlaylists.map((playlist, index) => (
                  playlist.name ? 
                  <li key={index.toString()}
                    onClick={() => {
                      localStorage.lastPLaylist = playlist._id;
                      currentPlaylist(localStorage.lastPLaylist);
                    }}
                    className={localStorage.lastPLaylist == playlist._id? "highlighted" : null}
                  >
                   {playlist.name}
                  </li> : null
                ))
              )}
            </ul>
          </div>
          <input
            type="text"
            placeholder="Enter the name of playlist"
            onChange={(e) => setPlaylistName(e.target.value)}
          />
          <button
            onClick={() =>
              playlistName
                ? createMyPlaylist(playlistName) &&
                  setButtonClick(() => !buttonClick) &&
                  console.log("onClick is run")
                : console.log("i dont know")
            }
          >
            Add new playlist
          </button>
        </div>
         <AddTrack myPlaylist={playlist} currentTrack={currentTrack}/>
      </div>
      {playlist.tracks !==null? <Player playlist={playlist.tracks}/>  : ""}
       {/* <Player playlist={playlist.tracks !==null? playlist.tracks:[]}/> */}
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  showMyPlaylists: state.player.showMyPlaylists,
  playlist: state.player.playlist,
  currentTrack: state.player.currentTrack,//it is important, without it not working highlighting tracks
  // login: (state.auth.data.data && state.auth.data.data.sub.login) || "",
});

const mapDispatchToProps = (dispatch) => ({
  findUser: (login) => dispatch(findUser(login)),
  createMyPlaylist: (playlistName) => dispatch(createMyPlaylist(playlistName)),
  findMyPlaylists: () => dispatch(findMyPlaylists()),
  findCurrentPlaylist: () => dispatch(findCurrentPlaylist(`${localStorage.lastPLaylist}`)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPlaylists);