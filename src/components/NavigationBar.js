import React from "react";
import { NavLink } from "react-router-dom";
import "./NavigationBar.css";

const NavigationBar = () => {
  return (
    <div className="navBarContainer">
      <NavLink to="/" className="itemNavBar" activeClassName="activeLinkBar">
        <h2 className="itemNavBarTitle">Overview</h2>
      </NavLink>
      <NavLink
        to="/operators"
        className="itemNavBar"
        activeClassName="activeLinkBar"
      >
        <h2 className="itemNavBarTitle">Operators</h2>
      </NavLink>
    </div>
  );
};

export default NavigationBar;
