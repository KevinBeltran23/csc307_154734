import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Login.css";

function Login(props) {
    // this is the user state that gets stored in the schema
    const [creds, setCreds] = useState({
        username: "",
        pwd: "",
        language: "en",
        bold: false,
        default_view: "Monthly",
        polytime: true,
        secret_setting1: false,
        secret_setting2: false
    });

    const navigate = useNavigate(); // to navigate between pages

    function handleChange(event) {
        // checks for username, password
        const { name, value } = event.target;
        switch (name) {
            case "username":
                setCreds({ ...creds, username: value });
                break;
            case "password":
                setCreds({ ...creds, pwd: value });
                break;
        }
    }

    function handleRegister() {
        // navigates to sign up page
        navigate("/signup");
    }

    // navigate to monthly if authenticated e
    function submitForm() {
        props.handleSubmit(creds).then((response) => {
            if (response === true) {
                console.log("navigating to monthly");
                navigate("/monthly");
            }
        });
        setCreds({ username: "", pwd: "" });
    }

    /* react components for the page */
    return (
        <div className="login-main-box">
            {/* Gold Box */}
            <div className="login-gold-box"></div>

            {/* Poly Planner */}
            <div className="login-poly-planner">Poly Planner</div>

            {/* Username */}
            <div className="login-username">Username</div>
            <input
                className="login-username-box"
                type="text"
                name="username"
                value={creds.username}
                onChange={handleChange}
                style={{ fontSize: "18px" }}
            />

            {/* Password */}
            <div className="login-password">Password</div>
            <input
                className="login-password-box"
                type="password"
                name="password"
                value={creds.pwd}
                onChange={handleChange}
                style={{ fontSize: "18px" }}
            />

            {/* Error Message */}
            {props.message && (
                <div className="login-error-message">{props.message}</div>
            )}

            {/* Login Box */}
            <button className="login-login-box" onClick={submitForm}>
                <span className="login-login">Login</span>
            </button>

            {/* Register Button */}
            <button className="login-register-button" onClick={handleRegister}>
                <p className="login-register-text">Create Account</p>
            </button>
        </div>
    );
}

export default Login;
