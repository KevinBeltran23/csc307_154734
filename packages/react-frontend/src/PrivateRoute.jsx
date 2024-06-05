import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ element: Component, isAuthenticated, ...rest }) {
    console.log("hello I am " + isAuthenticated.toString());
    if (isAuthenticated) {
        return <Component {...rest} />;
    } else {
        return <Navigate to="/" />;
    }
}

export default PrivateRoute;