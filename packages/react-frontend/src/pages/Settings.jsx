import React, { useState, useEffect } from "react";
import Translate from "./Translate"; // Import the Translate component
import "../components/Settings.css";

const Settings = () => {
  const [selectedOption, setSelectedOption] = useState(
    localStorage.getItem("selectedOption") || "Language & Region"
  );
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
      "High Contrasst": false,
      "Random": false,
    },
    "Text": {
      "Bold Text": false,
      "Large Text": false,
    },
    "Secret Settings": {
      "Secret Setting 1": false,
      "Secret Setting 2": false,
    }
  });

  // useEffect(() => {
  //   const savedSettings = localStorage.getItem("settings");
  //   if (savedSettings) {
  //     setSettings(JSON.parse(savedSettings));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("selectedOption", selectedOption);
  //   localStorage.setItem("settings", JSON.stringify(settings));
  // }, [selectedOption, settings]);

  // Effect to toggle bold text class
  useEffect(() => {
    if (settings.Text["Bold Text"]) {
      document.body.classList.add("bold-text");
    } else {
      document.body.classList.remove("bold-text");
    }
  }, [settings.Text["Bold Text"]]);

  const handleCheckboxChange = (option, setting) => {
    setSettings((prevSettings) => {
      const updatedSettings = { ...prevSettings };
      // For options like language and colors, uncheck other options when one is checked
      if (option === "Language & Region" || option === "Appearance" || option === "Colors") {
        Object.keys(updatedSettings[option]).forEach((key) => {
          updatedSettings[option][key] = key === setting;
        });
      } else {
        updatedSettings[option][setting] = !updatedSettings[option][setting];
      }

      if (option === "Language & Region") {
        const selectedLanguage = setting === "English" ? "en" : "es";
        const googleTranslateElement = document.querySelector(".goog-te-combo");
        if (googleTranslateElement) {
          googleTranslateElement.value = selectedLanguage;
          setTimeout(() => {
            googleTranslateElement.dispatchEvent(new Event("change"));
          }, 0); // Trigger change event after setting the value
        }
      }

      return updatedSettings;
    });
  };

  const renderOptionContent = () => {
    return (
      <div>
        {Object.keys(settings[selectedOption]).map((setting) => (
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
    <div className="page-container">
      <div className="settings-box">
        {/* Gold Bar */}
        <div className="settings-bar"></div>

        {/* Settings Text */}
        <div className="settings-header">Settings</div>
        <div className="settings-buttons-options">
          <div className="settings-buttons">
            {Object.keys(settings).map((option) => (
              <button
                key={option}
                className={`settings-button ${selectedOption === option ? "active" : ""}`}
                onClick={() => setSelectedOption(option)}
              >
                <div className="settings-text">{option}</div>
              </button>
            ))}
          </div>

          {/* Setting Options */}
          <div className="settings-options">
            <div className="settings-option">{renderOptionContent()}</div>
          </div>
        </div>
      </div>
      <Translate /> {/* Add the Translate component */}
    </div>
  );
};

export default Settings;
