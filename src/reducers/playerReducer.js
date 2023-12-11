import * as actions from "../constants/actions/index";

const initialState = {
  tracks: [],
  track: [],
  currentTrack: 0,
  playlist: [],
};

export default (
  state = initialState,
  {
    type,
    tracks,
    track,
    trackIndex,
    playlists,
    pressedTracks,
    myPlaylist,
    showMyPlaylists,
    userId,
    playlist,
    findTrack,
    newTrack,
    trackId
  }
) => {
  switch (type) {
    case actions.SET_TRACK:
      return {
        ...state,
        track,
      };

    case actions.SET_TRACKS:
      return {
        ...state,
        tracks,
      };

    case actions.SET_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: trackIndex,
      };

    // case actions.CLEAR_TRACK_LIST:
    //   return {
    //     ...state,
    //     currentTrack: {},
    //     tracks: [],
    //   };

    case actions.SET_PLAYLISTS:
      return {
        ...state,
        playlists,
      };

    case actions.PLAYLIST_TRACK_PRESSED:
      return {
        ...state,
        pressedTracks,
      };

    case actions.CREATE_MY_PLAYLIST:
      return {
        ...state,
        myPlaylist,
      };

    case actions.FIND_MY_PLAYLISTS:
      return {
        ...state,
        showMyPlaylists,
      };
    case actions.FIND_MY_USER:
      return {
        ...state,
        userId,
      };
    case actions.MY_CURRENT_PLAYLIST:
      return {
        ...state,
        playlist,
      };
    case actions.SEARCH_TRACK:
      return {
        ...state,
        findTrack,
      };
    case actions.UPLOAD_TRACK:
      return {
        ...state,
        newTrack,
      };

      case actions.CURRENT_TRACK_ID:
        return {
          ...state,
            trackId
        }

    default:
      return { ...state };
  }
};
