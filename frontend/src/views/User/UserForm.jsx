import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../context/ContextProvider.jsx";
import BreadCrumb from "../../components/BreadCrumb.jsx";

export default function UserForm() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient
        .get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setUser(data.data);
        })
        .catch(() => {
          setLoading(false);
        });
    }, []);
  }

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (user.id) {
      axiosClient
        .patch(`/users/${user.id}`, user)
        .then(() => {
          setNotification("User was successfully updated");
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/users", user)
        .then(() => {
          setNotification("User was successfully created");
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <>
      <BreadCrumb />

      <div id="content" className="padding-20">
        <div id="panel-1" className="panel panel-default width-450">
          <div className="panel-heading">
            <span className="title elipsis">
              <strong>
                {user.id && <>Update User</>}
                {!user.id && <>New User</>}
                {loading && <div className="text-center">Loading...</div>}
              </strong>
            </span>
          </div>
          <div className="panel-body">
            {errors && (
              <div className="alert alert-danger noborder text-center weight-400 nomargin noradius width-400">
                {Object.keys(errors).map((key) => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            )}

            {!loading && (
              <form onSubmit={onSubmit} className="sky-form boxed width-400">
                <fieldset>
                  <label className="input">
                    <input
                      type="text"
                      value={user.name}
                      onChange={(ev) =>
                        setUser({ ...user, name: ev.target.value })
                      }
                      placeholder="Name"
                    />
                    <b className="tooltip tooltip-bottom-right">
                      Enter your Full Name
                    </b>
                  </label>
                  <label className="input">
                    <input
                      value={user.email}
                      onChange={(ev) =>
                        setUser({ ...user, email: ev.target.value })
                      }
                      placeholder="Email"
                    />
                    <b className="tooltip tooltip-bottom-right">
                      Email can't be edited.
                    </b>
                  </label>
                  <label className="input">
                    <input
                      type="password"
                      onChange={(ev) =>
                        setUser({ ...user, password: ev.target.value })
                      }
                      placeholder="Password"
                    />
                    <b className="tooltip tooltip-bottom-right">
                      Only latin characters and numbers
                    </b>
                  </label>
                  <label className="input">
                    <input
                      type="password"
                      onChange={(ev) =>
                        setUser({
                          ...user,
                          password_confirmation: ev.target.value,
                        })
                      }
                      placeholder="Password Confirmation"
                    />
                    <b className="tooltip tooltip-bottom-right">
                      Only latin characters and numbers
                    </b>
                  </label>
                </fieldset>
                <footer>
                  <button type="submit" className="btn btn-primary pull-right">
                    <i className="fa fa-check"></i> {user.id && <>Update</>}
                    {!user.id && <>Add</>} User
                  </button>
                </footer>
              </form>
            )}
          </div>
          <div className="panel-footer"></div>
        </div>
      </div>
    </>
  );
}
