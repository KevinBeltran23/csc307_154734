// src/pages/Settings.jsx
import React from "react";
import "../components/Settings.css";

const Settings = () => {
  return (
    <div className="page-container"> {/* Added a container */}
      <div className="container">
        {/* Gold Bar */}
        <div className="gold-bar"></div>

        {/* Main Box */}
        <div className="main-box"></div>

        {/* Settings Text */}
        <div className="settings-text">Settings</div>
      </div>


      {/* Appearance Button */}
      <div className="appearance-button"></div>

      {/* View Options Button */}
      <div className="view-options-button"></div>

      {/* Colors Button */}
      <div className="colors-button"></div>

      {/* Text Button */}
      <div className="text-button"></div>

      {/* Secret Settings Button */}
      <div className="secret-settings-button"></div>

      {/* Language & Region Button */}
      <div className="language-region-button"></div>

      {/* Notifications Button */}
      <div className="notifications-button"></div>

      {/* Event Settings Button */}
      <div className="event-settings-button"></div>

      {/* Account Settings Button */}
      <div className="account-settings-button"></div>
    </div>
  );
};

export default Settings;
