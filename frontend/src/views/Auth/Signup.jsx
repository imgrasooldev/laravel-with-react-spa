import { Link } from "react-router-dom";
import { createRef, useState } from "react";
import axiosClient from "./../../axios-client.js";
import { useStateContext } from "../../context/ContextProvider.jsx";
import "./auth.css";
import Loader from "../../components/Loader/Loader.jsx";

export default function Signup() {
  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (ev) => {
    setLoading(true);
    ev.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: passwordConfirmationRef.current.value,
    };
    await axiosClient
      .post("/register", payload)
      .then(({ data }) => {
        setUser(data.data.user);
        setToken(data.data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
    setLoading(false);
  };

  return (
    /* <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Signup for Free</h1>
          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          <input ref={nameRef} type="text" placeholder="Full Name" />
          <input ref={emailRef} type="email" placeholder="Email Address" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <input
            ref={passwordConfirmationRef}
            type="password"
            placeholder="Repeat Password"
          />
          <button className="btn btn-block">Signup</button>
          <p className="message">
            Already registered? <Link to="/login">Sign In</Link>
          </p>
        </form>
      </div>
    </div> */

    <div className="padding-15">
      <div className="login-box">
        {errors && (
          <div className="alert alert-danger">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}

        <form
          action="#"
          method="post"
          onSubmit={onSubmit}
          className="sky-form boxed"
        >
          <header>
            <i className="fa fa-users" /> Create Account{" "}
            <small className="note bold">IT'S FREE</small>
          </header>

          <fieldset>
            <label className="input">
              <input type="text" ref={nameRef} placeholder="Name" name="name" />
              <b className="tooltip tooltip-bottom-right">
                Enter your Full Name
              </b>
            </label>

            <label className="input">
              <input
                type="text"
                ref={emailRef}
                placeholder="Email address"
                name="email"
              />
              <b className="tooltip tooltip-bottom-right">
                Needed to verify your account
              </b>
            </label>

            <label className="input">
              <input
                type="password"
                ref={passwordRef}
                placeholder="Password"
                name="password"
              />
              <b className="tooltip tooltip-bottom-right">
                Only latin characters and numbers
              </b>
            </label>

            <label className="input">
              <input
                type="password"
                ref={passwordConfirmationRef}
                placeholder="Confirm password"
                name="confirmPassword"
              />
              <b className="tooltip tooltip-bottom-right">
                Only latin characters and numbers
              </b>
            </label>

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
              <i className="fa fa-check" /> Create Account
            </button>

            <div className="forgot-password pull-left">
              <Link to="/">
                <b>Need to Login?</b>
              </Link>
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
}
