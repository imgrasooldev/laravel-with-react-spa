import React from "react";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <>
      {/*
                ASIDE
                Keep it outside of #wrapper (responsive purpose)
			*/}
      <aside id="aside">
        <nav id="sideNav">
          <ul className="nav nav-list">
            <li>
              <Link to="/dashboard">
                <i className="main-icon fa fa-users"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/users">
                <i className="main-icon fa fa-cart-plus"></i>
                <span>Users</span>
              </Link>
            </li>
          </ul>
        </nav>

        <span id="asidebg"></span>
      </aside>
    </>
  );
}

export default SideBar;
