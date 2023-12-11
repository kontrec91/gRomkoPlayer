import * as actions from "../constants/actions/index";

const initialState = {
  findTracks: [],
  findPlaylist: [],
};

export default (
    state = initialState,
    {
        type,
        tracks,
        playlists
    }) => {
        switch(type){
            case actions.SEARCH_TRACK:
                return{
                    ...state,
                    tracks
                };
                
        default:
        return {...state};
    }
