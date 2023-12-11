import { getGQL, openNotification } from "../utils/getGQL";
import * as actions from "../constants/actions/index";

export const searchTrack = (trackName) => async (dispatch) => {
  try {
    let response = await getGQL("/graphql", {
      Authorization: `Bearer ${localStorage.authToken}`,
    })(
      `query trackFind{
         TrackFindOne(query: "[{\\"originalFileName\\":\\"${trackName}\\"}]"){
             originalFileName
             url
             _id
              id3 {
                 title 
                 album 
                 artist 
              }
       }}`
    );
    response && response.data && response.data.TrackFindOne && console.log(response.data.TrackFindOne);
    // await dispatch(setSearchTrack(response.data.TrackFindOne));
  } catch (error) {
    console.log(error);
  }
};

const setSearchTrack = (findTrack) => ({
  type: actions.SEARCH_TRACK,
  findTrack,
});
