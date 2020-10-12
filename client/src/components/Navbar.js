import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const auth = useContext(AuthContext);

  const logoutHandler = () => {
    auth.logout();
  };
  return (
    <div className="navbar-container">
      <div className="logo">
        <span>PassManager</span>
      </div>
      {auth.isAuthenticated ? (
        <div className="user-menu">
          <div className="user-details">
            <span className="user-email">{auth.email}</span>
            <i className="medium material-icons user-icon">account_circle</i>
          </div>
          <button
            className="waves-effect waves-light btn-large"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Navbar;
