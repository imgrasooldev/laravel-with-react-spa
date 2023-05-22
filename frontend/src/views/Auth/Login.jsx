import { Link } from "react-router-dom";
import axiosClient from "./../../axios-client.js";
import { createRef } from "react";
import { useStateContext } from "../../context/ContextProvider.jsx";
import { useState } from "react";
import "./auth.css";
import Loader from "../../components/Loader/Loader.jsx";

export default function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    await axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.data.user);
        setToken(data.data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message);
        }
      });
    setLoading(false);
  };

  return (
    <>
      <div className="padding-15">
        <div className="login-box">
          <form onSubmit={onSubmit} className="sky-form boxed">
            <header>
              <i className="fa fa-users"></i> Sign In
            </header>
            {message && (
              <div className="alert alert-danger noborder text-center weight-400 nomargin noradius">
                {message}
              </div>
            )}
            <fieldset>
              <section>
                <label className="label">E-mail</label>
                <label className="input">
                  <i className="icon-append fa fa-envelope"></i>
                  <input ref={emailRef} type="email" placeholder="Email" />
                  <span className="tooltip tooltip-top-right">
                    Email Address
                  </span>
                </label>
              </section>

              <section>
                <label className="label">Password</label>
                <label className="input">
                  <i className="icon-append fa fa-lock"></i>
                  <input
                    ref={passwordRef}
                    type="password"
                    placeholder="Password"
                  />
                  <b className="tooltip tooltip-top-right">
                    Type your Password
                  </b>
                </label>
              </section>
              {loading && (
                <div className="text-center">
                  <Loader />
                </div>
              )}
            </fieldset>

            <footer>
              <button
                type="submit"
                className="btn btn-primary pull-right"
                disabled={loading}
              >
                Sign In
              </button>
              <div className="forgot-password pull-left">
                <Link to="/signup">
                  <b>Need to Register?</b>
                </Link>
              </div>
            </footer>
          </form>
        </div>
      </div>
    </>
  );
}
