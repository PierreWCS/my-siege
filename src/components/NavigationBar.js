import React from 'react';
import {NavLink} from "react-router-dom";
import './NavigationBar.css';

const NavigationBar = () => {
  return (
    <div className="navBarContainer">
      <NavLink to='/' className="itemNavBar" activeClassName="activeLinkBar">
        <h2 className="itemNavBarTitle">Home</h2>
      </NavLink>
      <NavLink to='/comparator' className="itemNavBar" activeClassName="activeLinkBar">
        <h2 className="itemNavBarTitle">Comparator</h2>
      </NavLink>
    </div>
  )
};

export default NavigationBar;
