import React, { useState } from "react";
import "../components/Settings.css";

const Settings = () => {
  const [selectedOption, setSelectedOption] = useState("Language & Region");
  const [settings, setSettings] = useState({
    "Language & Region": {
      "English": false,
      "Spanish": false,
    },
    "Notifications": {
      "Email Notifications": false,
      "Text Notifications": false,
    },
    "Event Settings": {
      "Reminders": false,
      "Poly Time": false,
    },
    "Account Settings": {
      "Change Password": false,
    },
    "Appearance": {
      "Light Mode": false,
      "Dark Mode": false,
    },
    "View Options": {
      "Default to Weekly": false,
    },
    "Colors": {
      "Cal Poly Colors": false,
      "High Contrast": false,
      "Random": false,
    },
    "Text": {
      "Bold Text": false,
      "Italic Text": false,
    },
    "Secret Settings": {
      "Secret Setting 1": false,
      "Secret Setting 2": false,
    }
  });

  const handleCheckboxChange = (option, setting) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [option]: {
        ...prevSettings[option],
        [setting]: !prevSettings[option][setting],
      },
    }));
  };

  const renderOptionContent = () => {
    return (
      <div>
        {Object.keys(settings[selectedOption]).map(setting => (
          <label key={setting} className="settings-label">
            <input
              type="checkbox"
              checked={settings[selectedOption][setting]}
              onChange={() => handleCheckboxChange(selectedOption, setting)}
            />
            {setting}
          </label>
        ))}
      </div>
    );
  };

  return (
    <div className="page-container"> {/* Added a container */}
      <div className="settings-box">

        {/* Gold Bar */}
        <div className="settings-bar"></div>

        {/* Settings Text */}
        <div className="settings-header">Settings</div>
        <div className="settings-buttons-options">
          <div className="settings-buttons">
            {Object.keys(settings).map(option => (
              <button 
                key={option} 
                id="settings-button"
                onClick={() => setSelectedOption(option)}
                className={selectedOption === option ? "active" : ""}
              >
                <div className="settings-text">{option}</div>
              </button>
            ))}
          </div>

          {/* Setting Options */}
          <div className="settings-options">
            <div className="settings-option">
              {renderOptionContent()}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Settings;
