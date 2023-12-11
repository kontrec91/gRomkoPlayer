import React from "react";
import { setCurrentTrack } from "../actions/playerActions";
import "../styles/MyPlaylists.css";

export const Track = ({
  pressedTracks,
  setPressedTracks,
  onPlaylistTrackPressed,
  track,
  dispatch,
  arr,
  playlistsItem,
  trackIndex,
  key,
  getTrack,
  setGetTrack,
  playlistsItemTrack,
  highlighted,
  playlistFilteredTracks,
}) => {
  return (
    <>
      {/* ТУТ ОШИБКА ПЕРЕРЕНДЕРИНГА */}
      {track.id3 ? (
        track.id3.artist || track.id3.album ? (
          <li
            className={highlighted ? "highlighted" : null}

             key={trackIndex}
          >
            <span>{track.originalFileName}</span>
          </li>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </>
  );
};
