// import {gql} from "../utils/getGQL";
import { getGQL, openNotification } from "../utils/getGQL";
import * as actions from "../constants/actions/index";
// import { Button, notification } from "antd";

// const openNotification = (
//   type = "info",
//   title = "info",
//   description = "Some params are missing"
// ) => {
//   notification[type]({
//     message: title,
//     description: description,
//     onClick: () => {
//       console.log("Notification Clicked!");
//     },
//   });
// };

const setTracks = (tracks) => ({
  type: actions.SET_TRACKS,
  tracks,
});

export const setCurrentTrack = (trackIndex) => ({
  type: actions.SET_CURRENT_TRACK,
  trackIndex,
});

export const getTracks = () => async (dispatch) => {
  try {
    let response = await getGQL("/graphql", {
      Authorization: `Bearer ${localStorage.authToken}`,
    })(
      // let response = await gql(
      `query tracksFind($query: String){
              TrackFind(query: $query){
                  _id
                  url
                  originalFileName
              }
            }`,
      {
        query: JSON.stringify([
          {},
          {
            limit: [12],
          },
        ]),
      }
    );
    await dispatch(setTracks(response.data.TrackFind));
    console.log("response.data.TrackFind: ", response.data.TrackFind);
  } catch (error) {
    console.log(error);
  }
};

export const setTrack = (track) => ({
  type: actions.SET_TRACK,
  track,
});

export const clearTrackList = () => ({
  type: actions.CLEAR_TRACK_LIST,
});


// `query playList{
//   PlaylistFind(query:"[{}]"){
//     _id
//     name
//     description
//     tracks{
//       originalFileName
//       url
//       id3{
//       artist
//         album
//         title
//       }
//       owner {
//         _id
//         login
//       }
//     }
//   }
// }`,

export const getPlaylist = () => async (dispatch) => {
  try {
    let response = await getGQL("/graphql", {
      Authorization: `Bearer ${localStorage.authToken}`,
    })(
      // let response = await gql(
      `query playList{
          PlaylistFind(query:"[{}]"){
            _id
            name
            description
            tracks{
              originalFileName
              url
              id3{
              artist
                album
                title
              }
              owner {
                _id
                login
              }
            }
          }
        }`,
      {
        query: JSON.stringify([{}]),
      }
    );
    console.log("response in getPlaylist: ", response);
    await dispatch(setPlayList(response.data.PlaylistFind));
  } catch (error) {
    console.log(error);
  }
};

const setPlayList = (playlists) => ({
  type: actions.SET_PLAYLISTS,
  playlists,
});

export const createMyPlaylist = (name, id) => async (dispatch) => {
  console.log("name in action: ", name);
  try {
    let response = await getGQL("/graphql", {
      Authorization: `Bearer ${localStorage.authToken}`,
    })(
      `mutation addPlaylist{
        PlaylistUpsert(playlist:
          { name: "${name}" } ) {_id}
      }`
    );
    console.log(response);
    await dispatch(setMyPlaylist(response.data.PlaylistUpsert));
  } catch (error) {
    console.log(error, "errorr is running");
  }
};

export const setMyPlaylist = (myPlaylist) => ({
  type: actions.CREATE_MY_PLAYLIST,
  myPlaylist,
});

export const findMyPlaylists = () => async (dispatch) => {
  try {
    let response = await getGQL("/graphql", {
      Authorization: `Bearer ${localStorage.authToken}`,
    })(
      `query playlists{
        PlaylistFind(query: "[{\\"___owner\\":\\"${localStorage.userId}\\"}]")
        {
          name 
          _id 
          description
          }
      }`,
      {
        query: JSON.stringify([{}]),
      }
    );
    // response && response.data && response.data.PlaylistFind &&
    console.log(response.data.PlaylistFind);
    // response && response.data && response.data.PlaylistFind && (
    await dispatch(setFindMyPlaylists(response.data.PlaylistFind))
    console.log('response.data.PlaylistFind: ', response.data.PlaylistFind);
    // );
  } catch (error) {
    console.log(error);
  }
};

const setFindMyPlaylists = (showMyPlaylists) => ({
  type: actions.FIND_MY_PLAYLISTS,
  showMyPlaylists,
});

export const oneTrackFind = (id) => async (dispatch) => {
  try {
    let response = await getGQL("/graphql", {
      Authorization: `Bearer ${localStorage.authToken}`,
    })(
      // let response = await gql(
      `query onePlaylistTracks($query: String!){
        PlaylistFindOne(query: $query){
          _id
          name
          tracks{
            _id
            url
            originalFileName
          }  
        }
      }`,
      {
        query: JSON.stringify([{ _id: id }]),
      }
    ).then((data) => {
      console.log(data);
      return dispatch(
        actionSetTrack(
          data.data.PlaylistFindOne.tracks,
          data.data.PlaylistFindOne.name,
          data.data.PlaylistFindOne._id
        )
      );
    });
  } catch (error) {}
};

export function actionSetTrack(tracks, playlistTitle, playlistId) {
  return {
    type: "SET_TRACK",
    tracks: tracks == null ? [] : tracks,
    playlistTitle,
    playlistId,
  };
}

export const actionPlaylistTrackPressed = (pressedTracks) => ({
  type: actions.PLAYLIST_TRACK_PRESSED,
  pressedTracks,
});

export const findUser = (login) => async (dispatch) => {
  let response = await getGQL("/graphql", {
    Authorization: `Bearer ${localStorage.authToken}`,
  })(
    `query findUser{
          UserFindOne(query: "[{\\"login\\":\\"${localStorage.user}\\"}]"){ 
              _id
              nick
            login
            createdAt
          }
      }`
  );
  response && response.data && response.data.UserFindOne && response.data.UserFindOne._id &&
  await dispatch(setFindUser(response.data.UserFindOne._id));
  localStorage.userId = response.data.UserFindOne._id;//some mistake about "can not read UserFindOne of undefined"
};

export const setFindUser = (userId) => ({
  type: actions.FIND_MY_USER,
  userId,
});

export const findCurrentPlaylist = () => async (dispatch) => {
  let response = await getGQL("/graphql", {
    Authorization: `Bearer ${localStorage.authToken}`,
  })(
    `query playlist{
      PlaylistFindOne(query:"[{\\"_id\\":\\"${localStorage.lastPLaylist}\\"}]"){
        _id 
        name 
        tracks {
          _id 
          originalFileName 
          url
          id3{
            title 
            album 
            artist 
        }}}
  }`,
    {
      query: JSON.stringify([{}]),
    }
  );
  console.log("current playlist: ", response.data.PlaylistFindOne);
  await dispatch(myCurrentPlaylist(response.data.PlaylistFindOne));
};

const myCurrentPlaylist = (playlist) => ({
  type: actions.MY_CURRENT_PLAYLIST,
  playlist,
});

export const addTrackToPlaylist = (idPlaylist, arrTracks, idTrack) => async (dispatch) => {
  try {
    let tracksArr = [...arrTracks, { ["_id"]: idTrack }];
    console.log("tracksArr", tracksArr);

    let response = await getGQL("/graphql", {
      Authorization: `Bearer ${localStorage.authToken}`,
    })(
      `mutation addtrack($idPlaylist:ID,$tracksArr:[TrackInput]){   
          PlaylistUpsert(playlist: {
                _id: $idPlaylist,
                tracks:$tracksArr
            }){_id}
      }`,
      {
        idPlaylist: idPlaylist,
        tracksArr: tracksArr,
      }
    );
    openNotification(
      "success",
      "Info",
      "Uploading was completed successfully!"
    );
    await dispatch(findCurrentPlaylist());
  } catch (error) {
    console.error(error);
    openNotification(
      "error",
      "Error",
      `Uploading was interrupted! ${error.message}`
    );
  }
};

export const deleteTrackFromPlaylist = (
  // idPlaylist,
  // arrTracks,
  // trackIndex
  idPlaylist,
  playlist,
  currentIndex
) => async (dispatch) => {
  try {
    let tracksArr = [];
    playlist.tracks &&
      playlist.tracks.map((track) => tracksArr.push({ ["_id"]: track._id }));
    tracksArr.splice(currentIndex, 1);

    // let response = await getGQL("/graphql",

    // )

    let response = await getGQL("/graphql", {
      Authorization: `Bearer ${localStorage.authToken}`,
    })(
      `mutation addtrack($idPlaylist:ID,$tracksArr:[TrackInput]){   
        PlaylistUpsert(playlist: {
              _id: $idPlaylist,
              tracks:$tracksArr
          }){_id}
    }`,
      {
        idPlaylist: idPlaylist,
        tracksArr: tracksArr,
      }
    );
    openNotification("success", "Info", "Delete was completed successfully!");
    dispatch(findCurrentPlaylist());
  } catch (error) {
    console.error(error);
    openNotification(
      "error",
      "Error",
      `Delete was interrupted! ${error.message}`
    );
  }
};


export const currentTrackId = (trackId) => ({
  type: actions.CURRENT_TRACK_ID,
  trackId
});