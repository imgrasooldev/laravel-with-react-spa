import React, { useEffect } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from "../context/ContextProvider";

function TopBar() {
    const { user, token, setUser, setToken, notification } = useStateContext();

    const onLogout = (ev) => {
        ev.preventDefault();

        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    return (
        <>
            {/* HEADER */}
            <header id="header">

                {/* Mobile Button */}
                <button id="mobileMenuBtn"></button>

                {/* Logo */}
                <span className="logo pull-left">
                    <img src="assets/images/logo_light.png" alt="admin panel" height="35" />
                </span>

                <form method="get" action="page-search.html" className="search pull-left hidden-xs">
                    <input type="text" className="form-control" name="k" placeholder="Search for something..." />
                </form>

                <nav>

                    {/* OPTIONS LIST */}
                    <ul className="nav pull-right">

                        {/* USER OPTIONS */}
                        <li className="dropdown pull-left">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                <img className="user-avatar" alt="" src="assets/images/noavatar.jpg" height="34" />
                                <span className="user-name">
                                    <span className="hidden-xs">
                                        {user.name} <i className="fa fa-angle-down"></i>
                                    </span>
                                </span>
                            </a>
                            <ul className="dropdown-menu hold-on-click">
                                <li>{/* logout */}

                                    <a onClick={onLogout} ><i className="fa fa-power-off"></i> Log Out</a>
                                </li>
                            </ul>
                        </li>
                        {/* /USER OPTIONS */}

                    </ul>
                    {/* /OPTIONS LIST */}

                </nav>

            </header>
            {/* /HEADER */}


        </>
    )
}

export default TopBar