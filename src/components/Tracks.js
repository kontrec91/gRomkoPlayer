import React, { useState, useEffect } from "react";
import Player from "./Player";
import { Track } from "./Track";

import "../styles/library.css";
import "../styles/playlists.css";
import "../styles/MyPlaylists.css";

// export let playlistFilteredTracks = [];

export const PlaylistTracks = ({
  playlistFilteredTracks,
  pressedTracks,
  actionPlaylistTrackPressed,
  playlistsItem,
  highlighted,
  actionSetTrack,
  actionOneTrackFind,
  // playlistFilteredTracks,
  currentTrack,
}) => {
  const [checked, setChecked] = useState(false);
  // console.log("playlistsItem in PlaylistTracks: ", playlistsItem);

  let playlistsItemTrack = [];
  //выводм по плейлисту из общего плейлиста(хранилища)
  const { _id, name, tracks, trackIndex } = playlistsItem;
  console.log(tracks)
  // let arr =

  // function arrMap(arr) {
  //   arr.map((item, index) => console.log(item.name, index));
  // }
  function arrMap(track) {
    // if (track && (track.id3 && track.id3.artist) || track.id3.album) {
    if (track && track.id3 && track.id3.artist) {
    // if (track.originalFileName && track.url && track._id) {
      return true;
    }
  }

  playlistFilteredTracks =
    playlistsItem && playlistsItem.tracks
      ? (playlistsItemTrack =
          playlistFilteredTracks && playlistsItem.tracks.filter(arrMap))
      : [];
  // playlistsItem.tracks.filter((track) => track.length !== null)) : [];
  // playlistsItem.tracks.filter((track) => track)) : [];

  // (track) => track.id3 && track.id3.artist && track.id3.album ): [];

  // useEffect(() => console.log(playlistFilteredTracks), []);
  //  const { _id, name, tracks, trackIndex } = playlistFilteredTracks;
  // console.log({ name }, { _id });
  // console.log("arr: ", arr);
  // setGetTrack(arr); //ТУТ ОШИБКА
  // {
  //     if (track.id3 && track.id3.artist && track.id3.album) {
  //       return true; //оставляем в массиве
  //     } else {
  //       return false; //удалаяем из массива
  //     }
  //   })
  // [];

  // console.log("playlistFilteredTracks in Tracks: ", playlistFilteredTracks)
  const onPlaylistTrackPressed = (name) => {
    name
      ? actionPlaylistTrackPressed(tracks) && setChecked(true)
      : console.log("nothing was find");
  };


  return (
    <>
      {playlistFilteredTracks.length > 0 ? (
        <li
          id={_id}
          // onMouseOver={(e) =>
          onClick={(e) => onPlaylistTrackPressed(name)}
          // trackIndex={trackIndex}
          // onMouseEnter={//хотели ввести для того что бы можно листать треки в пределах одного плейлиста кнопками
          // // onClick={
          //   (e) => {
          //     console.dir(e.target);
          //     return actionOneTrackFind(e.target.id);
          //   }
          // // console.log(e.target.id);
          // // return store.dispatch(actionSetTrack(, e.target.firstChild.data, e.target.id))
          // }
          className={checked ? "highlighted" && console.log(checked): null}
        >
          {name}

          <ul
            className="playlist_item"
            // onMouseOver={(e)=> {
            //   console.dir(e.target);
            //   return actionOneTrackFind(e.target.parentElement.id)
            // }}
            // onMouseOver={(e)=> actionOneTrackFind(e.target.id)}
          >
            {playlistsItem.tracks && playlistFilteredTracks
              ? playlistFilteredTracks.map((track, trackIndex) => (
                  <Track 
                    // key={trackIndex}
                    playlistFilteredTracks={playlistFilteredTracks}
                    pressedTracks={pressedTracks}
                    track={{ ...track, trackIndex }}
                    trackIndex={trackIndex}
                    playlistFilteredTracks={playlistFilteredTracks}
                    playlistsItem={playlistsItem}
                    playlistsItemTrack={playlistsItemTrack}
                    highlighted={(trackIndex === currentTrack)?highlighted:null }
                    onPlaylistTrackPressed={onPlaylistTrackPressed}
                  />
                ))
              : ""}
          </ul>
        </li>
      ) : (
        ""
      )}
      {/* </p> */}
      {/* <Player track={playlistFilteredTracks} /> */}
    </>
  );
};
