import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

import PrivateRoute from "./routes/PrivateRoute";

import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar";

import { AuthContext } from "./context/auth.context";
import { useAuth } from "./hooks/auth.hook";

import "materialize-css";
import "./styles.scss";

function App() {
  const { token, userId, email, login, logout } = useAuth(); // custom hook
  const [isAuthenticated, setAuthenticated] = useState(!!token);

  useEffect(() => {
    setAuthenticated(!!token);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ userId, token, email, login, logout, isAuthenticated }}
    >
      <Router>
        <Navbar />
        <div className="page-container">
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <PrivateRoute
              exact
              path="/dashboard"
              component={Dashboard}
              isAuthenticated={isAuthenticated}
            />
            <Redirect to="/dashboard" />
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
