// src/pages/Registration.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Registration() {

    return (
        <div className="position-relative">
            {/* Main Box */}
            <div className="main-box"></div>

            {/* Username Box */}
            <input
                className="username-box"
                type="text"
                name="name"
                style={{ fontSize: "18px" }}
            />

            {/* Password Box */}
            <input
                className="password-box"
                type="password"
                name="password"
                style={{ fontSize: "18px" }}
            />


            {/* Register Box /*<button className="registration-box" onClick={handleRegistration}> </button>*/ }
            
            <button className='registration-frame'>
                <span className='registration'>Sign Up</span>
            </button>

            {/* Gold Box */}
            <div className="gold-box"></div>

            {/* Text elements */}
            <div className="text-elements">
                {/* Poly Planner */}
                <div className="poly-planner">Poly Planner</div>

                {/* Username */}
                <div className="username">Username</div>

                {/* Password */}
                <div className="password">Password</div>

                {/* Register */}
                
            </div>
        </div>
    );
}

export default Registration;