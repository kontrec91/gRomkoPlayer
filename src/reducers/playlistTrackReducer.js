import * as actions from "../constants/actions/index";

// switch (type){
//     case actions.SET_TRACK:
//     return {
//         // ...state,
//         track,
//         playlistTitle,
//         [playlistId]: [...(state[playlistId] || []), ...tracks],
//     }
//     default:
//         return { ...state };
// }

export default function playlistTrackReducer(state, action) {
  if (state === undefined) {
    return {};
  }
  if (action.type === 'SET_TRACK') {
    const { tracks, playlistTitle, playlistId } = action;
    return {
      // ...state,
      track,
      playlistTitle,
      [playlistId]: [...(state[playlistId] || []), ...tracks],
    };
  }
  return state;
}
