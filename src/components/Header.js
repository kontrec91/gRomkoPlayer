import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../actions/authActions";
import { useHistory } from "react-router-dom";

import "../styles/library.css";

const Header = ({ logOut }) => {
  let history = useHistory();
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    let pathname = window.location.pathname.toLowerCase();
    pathname = pathname.replace("/", "");
    let li = document.querySelector(`[data-action=${pathname}]`);
    if (pathname === li.dataset.action) {
      li.classList.add("selected");
    } else {
      li.classList.remove("selected");
    }
  }, []);

  function onLogOut() {
    logOut();
    history.push("/");
  }

  function highlight(text) {
    if (text == "All Playlists") {
      history.push("/all_playlists");
    } else if (text == "My Playlists") {
      history.push("/my_playlists");
    } else if (text == "Search") {
      history.push("/search");
    }
  }

  return (
    <div className="header">
      <ul
        className="mainMenu"
        onClick={(e) => {
          let li;
          li = e.target.closest("li");
          highlight(li.innerText);
        }}
      >
        <li className="selected">
          <h2>gRomkoPlayer</h2>
        </li>
        <li data-action="all_playlists">
          <h2>All Playlists</h2>
        </li>
        <li data-action="my_playlists">
          <h2>My Playlists</h2>
        </li>
        <li data-action="search">
          <h2>Search</h2>
        </li>
        <li className="userMenu" onClick={() => onLogOut()}>
          <h2>User: {localStorage.user}</h2>
          <ul className="userMenu-child">
            <li>Log out</li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  state: state,
});
export default connect(mapStateToProps, { logOut })(Header);
