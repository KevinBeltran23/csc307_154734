import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/SignUp.css";

function SignUp(props) {
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

    const navigate = useNavigate();

    function handleReturn() {
        navigate("/");
    }

    // navigate to monthly if authenticated
    function submitForm() {
        if (creds.pwd !== creds.confirmPwd) {
            props.setMessage("Signup Error: Passwords do not match");
            return;
        }

        props.handleSubmit(creds).then((response) => {
            if (response === true) {
                navigate("/monthly");
            }
        });
        setCreds({ username: "", pwd: "", confirmPwd: "" });
    }

    return (
        <div className="signup-position-relative">
            {/* Main Box */}
            <div className="signup-main-box">
                {/* Gold Box */}
                <div className="signup-gold-box"></div>

                {/* Poly Planner */}
                <div className="signup-poly-planner">Poly Planner</div>

                {/* Username */}
                <div className="signup-username">Username</div>
                <input
                    className="signup-username-box"
                    type="text"
                    name="username"
                    value={creds.username}
                    onChange={handleChange}
                    style={{ fontSize: "18px" }}
                />

                {/* Password */}
                <div className="signup-password">Password</div>
                <input
                    className="signup-password-box"
                    type="password"
                    name="password"
                    value={creds.pwd}
                    onChange={handleChange}
                    style={{ fontSize: "18px" }}
                />

                {/* Confirm Password */}
                <div className="signup-confirm-password">Confirm Password</div>
                <input
                    className="signup-confirm-password-box"
                    type="password"
                    name="confirmPwd"
                    value={creds.confirmPwd}
                    onChange={handleChange}
                    style={{ fontSize: "18px" }}
                />

                {/* Error Message */}
                {props.message && (
                    <div className="signup-error-message">{props.message}</div>
                )}

                {/* Sign Up Box */}
                <button className="signup-login-box" onClick={submitForm}>
                    <p className="signup-login">Sign Up</p>
                </button>

                {/* Login Box */}
                <button className="signup-return-button" onClick={handleReturn}>
                    <p className="signup-return-text">Return To Login</p>
                </button>
            </div>
        </div>
    );

    function handleChange(event) {
        const { name, value } = event.target;
        switch (name) {
            case "username":
                setCreds({ ...creds, username: value });
                break;
            case "password":
                setCreds({ ...creds, pwd: value });
                break;
            case "confirmPwd":
                setCreds({ ...creds, confirmPwd: value });
                break;
        }
    }
}

export default SignUp;
