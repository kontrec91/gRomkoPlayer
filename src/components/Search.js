import React, { useState, useEffect } from "react";
import { Checkbox } from "antd";
import { connect } from "react-redux";

import Header from "./Header";
import Footer from "./Footer";
import { searchTrack } from "../actions/searchActions";

import "../styles/library.css";
import "../styles/Search.css";

export const Search = ({ searchTrack }) => {
  
  const [isTracks, setIsTracks] = useState(false);
  // const [searchPlaylists, setSearchPlaylists] = useState(false);

  const [trackName, setTrackName] = useState("");

  // function onChange(e) {
  //   console.log(`checked = ${e.target.checked}`);
  // }

  function searchData(isTracks, playlists) {
    console.log(isTracks);
    console.log(trackName);
    // `${tracks}` ?console.log(tracks) : '';
    // isTracks ? searchTrack(trackName) : '';
    searchTrack(trackName);
    // isTracks && !playlists ? searchTrack(isTracks) : '';
    // playlists && !tracks ?  searchPlaylists(trackName) : '';
    // tracks && playlists ? searchTrack(trackName) && searchPlaylists(trackName) : '';
  }
  return (
    <>
      <Header />
      <div className="main">
        <div className="search">
          <div>
            <label htmlFor="search-field">Search</label>
            <input
              type="text"
              id="search-field"
              placeholder="Enter the name"
              onChange={(e) =>
                setTrackName(e.target.value)
              }
            />
            <button onClick={()=> searchData()
              // searchTrack(trackName) 
              }>Search</button>
          </div>
          <div className="search-filters">
            <div>
              <div className="checkbox">
                {/* <Checkbox onChange={onChange}>Checkbox</Checkbox> */}
                <div>
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    id="search-playlists"
                    onChange={(e) => {
                      console.log(e.target.checked);
                      // setIsTracks(e.target.checked)
                      // searchData(e.target.checked);
                    }}
                  />
                  <label htmlFor="search-playlists">Search in playlists</label>
                </div>
                <div>
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    id="search-tracks"
                    onChange={(e)=>{
                      console.log(e.target.checked);
                      setIsTracks(e.target.checked);
                      // searchData(e.target.checked);
                    }}
                  />
                  <label htmlFor="search-tracks">Search in tracks</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <FindTracks />
        <FindPlaylists /> */}
      </div>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  // findTracks: state.search.findTracks,
});

const mapDispatchToProps = (dispatch) => ({
  searchTrack: (trackName) => dispatch(searchTrack(trackName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
