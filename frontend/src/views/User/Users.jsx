import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider.jsx";
import BreadCrumb from "../../components/BreadCrumb.jsx";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  useEffect(() => {
    getUsers();
  }, []);

  const onDeleteClick = (user) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    axiosClient.delete(`/users/${user.id}`).then(() => {
      setNotification("User was successfully deleted");
      getUsers();
    });
  };

  const getUsers = () => {
    setLoading(true);
    axiosClient
      .get("/users")
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data.items);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <BreadCrumb />
      <div id="content" className="padding-20">
        <div id="panel-1" className="panel panel-default">
          <div className="panel-heading">
            <span className="title elipsis">
              <strong>Users</strong>
            </span>
            <ul className="options pull-right list-inline">
              <li>
                <Link
                  to="/users/new"
                  className="btn btn-primary btn-xs white btn_create_new_user"
                >
                  <i className="fa fa-plus"></i>
                  <span>Add User</span>
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="opt panel_colapse"
                  data-toggle="tooltip"
                  title=""
                  data-placement="bottom"
                  data-original-title="Colapse"
                ></a>
              </li>
              <li>
                <a
                  href="#"
                  className="opt panel_fullscreen hidden-xs"
                  data-toggle="tooltip"
                  title=""
                  data-placement="bottom"
                  data-original-title="Fullscreen"
                >
                  <i className="fa fa-expand"></i>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="opt panel_close"
                  data-confirm-title="Confirm"
                  data-confirm-message="Are you sure you want to remove this panel?"
                  data-toggle="tooltip"
                  title=""
                  data-placement="bottom"
                  data-original-title="Close"
                >
                  <i className="fa fa-times"></i>
                </a>
              </li>
            </ul>
          </div>

          <div className="panel-body">
            <div className="table-responsive">
              <table className="table table-bordered nomargin">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Create Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                {loading && (
                  <tbody>
                    <tr>
                      <td colSpan="5" className="text-center">
                        Loading...
                      </td>
                    </tr>
                  </tbody>
                )}
                {!loading && (
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.created_at}</td>
                        <td>
                          <Link
                            className="btn btn-primary btn-xs white btn_create_new_user"
                            to={"/users/" + u.id}
                          >
                            <i className="fa fa-edit"></i>
                            <span>Edit</span>
                          </Link>
                          &nbsp;
                          <button
                            className="btn btn-danger btn-xs white btn_create_new_user"
                            onClick={(ev) => onDeleteClick(u)}
                          >
                            <i className="fa fa-trash"></i>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
          <div className="panel-footer"></div>
        </div>
      </div>
    </>
  );
}
