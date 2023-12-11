import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { connect } from "react-redux";

import { Provider } from "react-redux";
import store from "./store";
import history from "./utils/history";

import "./styles/Reset.css";
import "./styles/App.css";

import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Playlist from "./components/Playlist";//проверить правильные пути, поменять пути на соответствующие
import MyPlaylists from "./components/MyPlaylists";
import Search from "./components/Search";

const PrivateRoute = (props) => {
  console.log(props);
  const { children, ...rest } = props;

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return localStorage.authToken ? (
          children
        ) : (
          <Redirect
            to={{
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={LoginForm} />
            <Route exact path="/registration" component={RegisterForm} />
            <Route exact path="/all_playlists" component={Playlist} />
            <Route exact path="/my_playlists" component={MyPlaylists} />
            <Route exact path="/search" component={Search} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
};
