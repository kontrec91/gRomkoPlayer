// import { gql} from "../utils/getGQL";
import { getGQL, openNotification } from "../utils/getGQL";
import * as actions from "../constants/actions/index";
import { clearTrackList } from "../actions/playerActions";

export function actionLogIn(token) {
  return {
    type: actions.LOGIN,
    token,
  };
}
function actionLogOut() {
  return {
    type: actions.LOGOUT,
  };
}

export const logOut = () => (dispatch) => {
  dispatch(clearTrackList());
  dispatch(actionLogOut());
};

export const doLogin = (login, password) => async (dispatch) => {
  try {
    localStorage.authToken = "";
    localStorage.userId = "";
    let response = await getGQL("/graphql", {
      Authorization: `Bearer ${localStorage.authToken}`,
    })(
      // let response = await gql(
      `query Login($login:String!, $password:String!){
        login(login:$login, password:$password)
        }`,
      {
        login,
        password,
      }
    );
    console.log(response);
    await dispatch(actionLogIn(response.data.login));
    localStorage.user = login;
  } catch (error) {
    if (error.message.includes("Invalid token")) {
      openNotification(
        "error",
        "Error",
        `Invalid credentials! ${error.message}`
      );
    } else {
      openNotification(
        "error",
        "Error",
        `Something went wrong! ${error.message}`
      );
    }
  }
};

export const actionNewUser = ({ login, _id }) => ({
  type: actions.NEW_USER,
  login,
  _id,
});

export const newUser = (login, password) => async (dispatch) => {
  try {
    // localStorage.authToken = "";
    let response = await getGQL("/graphql")(
      `mutation User{
      createUser (login: "${login}", password: "${password}"){
      _id login
        }
    }`
    );
    console.log(response.data.createUser);
    await dispatch(doLogin(response.data.createUser.login, password));
  } catch (error) {
    openNotification(
      "error",
      "Error",
      `User ${login} has already been created. Please use another login`
    );
  }
};