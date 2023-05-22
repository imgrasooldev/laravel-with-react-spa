import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
export default function DefaultLayout() {
  const { user, token, setUser, setToken, notification } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    axiosClient.get("/get_authenticated_user").then(({ data }) => {
      setUser(data.data);
    });
  }, []);

  return (
    /* <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </aside>
      <div className="content">
        <header>
          <div>Header</div>

          <div>
            {user.name} &nbsp; &nbsp;
            <a onClick={onLogout} className="btn-logout" href="#">
              Logout
            </a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
        {notification && <div className="notification">{notification}</div>}
      </div>
    </div> */

    <>
      {/* WRAPPER */}
      <div id="wrapper" className="clearfix">
        <TopBar />
        <SideBar />
        <section id="middle">
          <Outlet />
        </section>
        {notification && <div className="notification">{notification}</div>}
      </div>
    </>
  );
}
