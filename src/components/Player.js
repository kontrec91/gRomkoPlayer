import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import "../styles/player.css";
import { setCurrentTrack } from "../actions/playerActions";

const Player = ({
  playlist = [],
  track,
  currentTrack,
  setCurrentTrack,
  pressedTracks = [],
}) => {
  console.log("currentTrack in Player: ", currentTrack);
  console.log("playlist in Player: ", playlist);
  console.log("track in Player: ", track);
  console.log("pressedTracks in Player: ", pressedTracks);

  console.log("parent currentTrack in Player: ", currentTrack);


  const [isAutoplayed, setIsAutoplayed] = useState(true);
  const [isLoopTrack, setIsLoopTrack] = useState(false);
  const [isMixOrder, setIsmixOrder] = useState(false);

  useEffect(() => {
    setCurrentTrack(0);
  }, [localStorage.lastPLaylist])

  function goPrevTrack() {
    setIsAutoplayed(true);
    (currentTrack > 0 && setCurrentTrack(currentTrack - 1)) ||
      (playlist && currentTrack == 0 && setCurrentTrack(playlist.length - 1)) ||
      (pressedTracks &&
        currentTrack == 0 &&
        setCurrentTrack(pressedTracks.length - 1));
  }
  function goNextTrack() {
    setIsAutoplayed(true);
    (currentTrack < playlist.length - 1 && setCurrentTrack(currentTrack + 1)) ||
      (currentTrack == playlist.length - 1 && setCurrentTrack(0));
    (currentTrack < pressedTracks.length - 1 &&
      setCurrentTrack(currentTrack + 1)) ||
      (currentTrack == pressedTracks.length - 1 && setCurrentTrack(0));
  }

  return (
    <div className="player">
      <button className="prevTrack" onClick={() => goPrevTrack()}>
        prev
      </button>
      <audio
        controls
        src={
          (playlist[currentTrack] && playlist[currentTrack].url) ||
          (pressedTracks[currentTrack] && pressedTracks[currentTrack].url) ||
          ""
        }
        loop={isLoopTrack}
        onEnded={() => goNextTrack()}
        autoPlay={isAutoplayed}
      />
      <button className="nextTrack" onClick={() => goNextTrack()}>
        next
      </button>
      <button
        className="loopTrack"
        onClick={() => {
          let btn = document.querySelector(".loopTrack");
          setIsLoopTrack(!isLoopTrack);
          !isLoopTrack
            ? btn.classList.add("loopTrackClick")
            : btn.classList.remove("loopTrackClick");
        }}
      >
        loop
      </button>

      <button className="prevTrack" onClick={() => setIsmixOrder(!isMixOrder)}>
        Mix
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentTrack: state.player.currentTrack,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentTrack: (trackIndex) => dispatch(setCurrentTrack(trackIndex)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
