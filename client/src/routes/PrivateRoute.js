import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (isAuthenticated) {
        return (
          <Fragment>
            <Component {...props} />
          </Fragment>
        );
      } else {
        return <Redirect to="/login" />;
      }
    }}
  />
);

export default PrivateRoute;
