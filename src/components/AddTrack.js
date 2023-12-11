//try to do dropzone, open Programming/hw/project/src/components/DropZone and check code
//MyPlaylists && playerActions && AddTrack
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  addTrackToPlaylist,
  deleteTrackFromPlaylist,
  findCurrentPlaylist,
} from "../actions/playerActions";
import { connect } from "react-redux";
import { Spin } from "antd";

import "../styles/library.css";
import { createLogger } from "vuex";

const AddTrack = ({
  pList,
  myPlaylist,
  addTrackToPlaylist,
  deleteTrackFromPlaylist,
  currentTrack
}) => {

  let ref = useRef();
  const [isLoading, setIsLoading] = useState(false);

  console.log("myPlaylist: ", myPlaylist)

  // let arrTracks = myPlaylist.tracks && myPlaylist.tracks.map((item) => {
  //   return {_id: item._id }; 
  // });

  async function Upload(playlistId, arrTracks, formData) {
    await fetch("/track", {
      method: "POST",
      headers: localStorage.authToken
        ? { Authorization: "Bearer " + localStorage.authToken }
        : {},
      body: formData,
    })
      .then((res) => res.json()) //у чего есть then? у promise.
      .then(async (track) => {
        console.log("track: ", track);
        await addTrackToPlaylist(playlistId, arrTracks, track._id);
      });
    console.log("arrTracks in upload: ", arrTracks);
  }
  const onDrop = useCallback((acceptedFiles) => {
    setIsLoading(true);
    console.log("acceptedFiles", acceptedFiles)
    let arrTracks = [];
    myPlaylist.tracks && myPlaylist.tracks.map((item) => arrTracks.push({ ["_id"]: item._id }));

    // console.log(index);

    // console.log(acceptedFiles[index]);

    // let formData = new FormData();
    //   formData.append("track", acceptedFiles[index]);
    //   Upload(localStorage.lastPLaylist, arrTracks, formData);

    // if (acceptedFiles.length > index) {
    //   index++;
    //   useCallback(acceptedFiles, index);
    // }
    
    acceptedFiles.map(async (file) => {
      // pList.tracks && pList.tracks.map((item) => arrTracks.push({ ["_id"]: item._id }));
      console.log("pList: ",pList);
      let formData = new FormData();
      formData.append("track", file);
      await Upload(localStorage.lastPLaylist, arrTracks, formData);
    });
    findCurrentPlaylist(localStorage.lastPLaylist);
    setIsLoading(false);
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="my_tracks">
      <h2>My tracks in playlist {myPlaylist.name}</h2>
      <ul
       className={" main__description__dropzone"} {...getRootProps()}
       >
        <input{...getInputProps()}/>
        { myPlaylist &&
          myPlaylist.tracks &&
          myPlaylist.tracks.map((track, index) => (
            <li 
            className={index == currentTrack? "highlighted" : null}
            key={index.toString()}>
              {track.originalFileName}
              <span
                className="adding-track"
                onClick={async (event) => {
                  event.stopPropagation();
                  console.log(index);
                  await deleteTrackFromPlaylist(
                    localStorage.lastPLaylist,
                    myPlaylist,
                    index
                  );
                }}
              >x</span>
            </li>
          ))} 
      </ul> 
        <div className={"getRootProps main__description__dropzone"} {...getRootProps()}>
         <h2>Add track</h2>
        <Spin className="" spinning={isLoading} />
         <input{...getInputProps()}/><span  className="adding-track"> +</span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  // newTrack: state.player.newTrack,
     pList: state.player.playlist,
     myPlaylist: state.player.playlist,
});

const mapDispatchtoProps = (dispatch) => ({
  addTrackToPlaylist: (idPlaylist, arrTracks, idTrack) =>
    dispatch(addTrackToPlaylist(idPlaylist, arrTracks, idTrack)),
  deleteTrackFromPlaylist: (idPlaylist, playlist, currentIndex) =>
    dispatch(deleteTrackFromPlaylist(idPlaylist, playlist, currentIndex)),
    // findCurrentPlaylist: dispatch(findCurrentPlaylist(localStorage.lastPLaylist)),
});

export default connect(mapStateToProps, mapDispatchtoProps)(AddTrack);
