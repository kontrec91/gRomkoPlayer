import jwt_decode from "jwt-decode";
import * as actions from "../constants/actions/index";

const initialState = {
  data: {},
  token: "",
};

let authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.NEW_USER:
      // console.log({ data: { data }, token: action.token });
      // console.log(state)
      console.log(action)
      return{
        // ...state,
        login: action.login,
        _id: action._id
      }

    case actions.LOGIN:
      var data = jwt_decode(action.token);
      console.log(data);

      // localStorage.authToken = data.data.login;
      const token = localStorage.authToken;

      localStorage.authToken = action.token;
      console.log({ data: { data }, token: action.token });
      return { 
        // ...state, 
        data: { data }, 
        token: action.token
      };

    case actions.LOGOUT:
      localStorage.userId= "";
      localStorage.authToken = "";
      localStorage.lastPLaylist = "";
      localStorage.user = "";
      // headers = {}
      return { 
        // ...state,
        data: initialState.data, 
        token: initialState.token,
        _id: "",
        login: ""
      };

    default:
      return state;
  }
};

export default authReducer;
