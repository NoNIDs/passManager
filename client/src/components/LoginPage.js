import React, { useContext, useEffect, useState } from "react";

import axios from "axios";

import { AuthContext } from "../context/auth.context";
import { useMessage } from "../hooks/message.hook";
import { Redirect, Link } from "react-router-dom";

function AuthPage() {
  const auth = useContext(AuthContext);
  const message = useMessage();

  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginHandler = () => {
    const headers = { "Content-Type": "application/json" };
    axios
      .post("/api/auth/login", { ...form }, headers)
      .then((res) => {
        auth.login(res.data.token, res.data.userId, res.data.email);
      })
      .catch((err) => message(err.response.data.message));
  };

  if (auth.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="auth-container">
      <h1 className="auth-container-title">Sign In</h1>
      <div className="input-field">
        <input
          placeholder="Enter your email"
          id="email"
          type="email"
          name="email"
          className="validate"
          value={form.email}
          onChange={changeHandler}
        />
        <label htmlFor="email">Email</label>
      </div>
      <div className="input-field">
        <input
          placeholder="Enter your password"
          id="password"
          type="password"
          name="password"
          className="validate"
          value={form.password}
          onChange={changeHandler}
        />
        <label htmlFor="password">Password</label>
      </div>

      <button
        className="waves-effect waves-light deep-purple accent-4 btn-large"
        onClick={loginHandler}
      >
        Login
      </button>
      <span className="auth-helper">
        Don't have an account? <Link to="/register">Sign Up</Link>{" "}
      </span>
    </div>
  );
}

export default AuthPage;
