
// import getGQL from "../utils/getGQL";
import * as actions from "../constants/actions/index";
import { getGQL, openNotification } from "../utils/getGQL";


function actionLogOut() {
  return {
    type: actions.LOGOUT,
  };
}

export const doLogOut = (store, dispatch) => {
  try {
    store.dispatch(actionLogOut());
  } catch (error) {
    console.log(error)
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
        `"Something went wrong ${error.message}`
      );
    }
  }
};
