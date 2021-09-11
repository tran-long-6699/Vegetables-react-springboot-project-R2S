import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedAdmin = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const { roles } = localStorage.getItem("credentials")
          ? JSON.parse(localStorage.getItem("credentials"))
          : [];
        if (roles) {
          let admin = roles.find((e) => e === "ROLE_ADMIN");
          if (admin) return <Component {...props} />;
          if (!admin)
            return (
              <Redirect
                to={{ path: "/home", state: { from: props.location } }}
              />
            );
        }else{
          return (
            <Redirect
              to={{ path: "/home", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedAdmin;
