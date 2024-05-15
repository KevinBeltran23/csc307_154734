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
            <div className="settings-button">
                <div className="settings-text">Language & Region</div>
            </div>
            <div className="settings-button">
              <div className="settings-text">Notifications</div>
            </div>
            <div className="settings-button">
              <div className="settings-text">Event Settings</div>
            </div>
            <div className="settings-button">
              <div className="settings-text">Account Settings</div>
            </div>
            <div className="settings-button">
              <div className="settings-text">Appearance</div>
            </div>
            <div className="settings-button">
              <div className="settings-text">View Options</div>
            </div>
            <div className="settings-button">
              <div className="settings-text">Colors</div>
            </div>
            <div className="settings-button">
              <div className="settings-text">Text</div>
            </div>
            <div className="settings-button">
              <div className="settings-text">Secret Settings</div>
            </div>
          </div>

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