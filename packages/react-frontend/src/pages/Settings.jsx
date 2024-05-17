// src/pages/Settings.jsx
import React from "react";
import "../components/Settings.css";

const Settings = () => {
  return (
    <div className="page-container"> {/* Added a container */}
      <div className="settings-box">
        
        {/* Gold Bar */}
        <div className="settings-bar"></div>

        {/* Settings Text */}
        <div className="settings-header">Settings</div>
        <div className="settings-buttons-options">
          <div className="settings-buttons">
            <button id="settings-button">
                <div className="settings-text">Language & Region</div>
            </button>
            <button id="settings-button">
              <div className="settings-text">Notifications</div>
            </button>
            <button id="settings-button">
              <div className="settings-text">Event Settings</div>
            </button>
            <button id="settings-button">
              <div className="settings-text">Account Settings</div>
            </button>
            <button id="settings-button">
              <div className="settings-text">Appearance</div>
            </button>
            <button id="settings-button">
              <div className="settings-text">View Options</div>
            </button>
            <button id="settings-button">
              <div className="settings-text">Colors</div>
            </button>
            <button id="settings-button">
              <div className="settings-text">Text</div>
            </button>
            <button id="settings-button">
              <div className="settings-text">Secret Settings</div>
            </button>
          </div>

          {/* Setting Options */}
          <div className="settings-options">
            <div className="settings-option">
              <p>FILLER TEXT</p>
            </div>
            <div className="settings-option">
              <p>FILLER TEXT</p>
            </div>
            <div className="settings-option">
            < p>FILLER TEXT</p>
            </div>
            <div className="settings-option">
              <p>FILLER TEXT</p>
          </div>
        </div>

        </div>
        
      </div>
    </div>
  );
};

export default Settings;
