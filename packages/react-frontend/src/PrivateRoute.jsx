import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ element: Component, ...rest }) {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (isAuthenticated) {
        return <Component {...rest} />;
    } else {
        return <Navigate to="/" />;
    }
}

export default PrivateRoute;
