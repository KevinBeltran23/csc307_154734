import React, { useState, useEffect } from "react";
import Translate from "./Translate"; // Import the Translate component
import "../components/Settings.css";

/* Google Translate Language Codes */
const languageOptions = {
  "Mandarin Chinese": "zh-CN",
  "Spanish": "es",
  "English": "en",
  "Hindi": "hi",
  "Bengali": "bn",
  "Portuguese": "pt-BR",
  "Russian": "ru",
  "Japanese": "ja",
  "Vietnamese": "vi"
};

/* Settings Component */
const Settings = () => {
  const [selectedOption, setSelectedOption] = useState("Language");
  const [settings, setSettings] = useState({
    "Language": {
      "Mandarin Chinese": false,
      "Spanish": false,
      "English": true, // Default to English
      "Hindi": false,
      "Bengali": false,
      "Portuguese": false,
      "Russian": false,
      "Japanese": false,
      "Vietnamese": false,
    },
    "Event Settings": {
      "Poly Time": true,
    },
    "Calendar Settings": {
      "Default View": "Monthly", // Default to Monthly
    },
    "Colors": {
      "Default": false,
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

  /* Reload the page when the component is first mounted */
  useEffect(() => {
    if (!sessionStorage.getItem("reloaded")) {
      sessionStorage.setItem("reloaded", "true");
      window.location.reload();
    } else {
      sessionStorage.removeItem("reloaded");
    }
  }, []);

  /* Activates or deactivates bold text */
  useEffect(() => {
    if (settings.Text["Bold Text"]) {
      document.body.classList.add("bold-text");
    } else {
      document.body.classList.remove("bold-text");
    }
  }, [settings.Text["Bold Text"]]);

  /* Handles dropdown change for language options */
  const handleDropdownChange = (option, event) => {
    const selectedValue = event.target.value;
    setSettings((prevSettings) => {
      const updatedSettings = { ...prevSettings };
      Object.keys(updatedSettings[option]).forEach((key) => {
        updatedSettings[option][key] = key === selectedValue;
      });

      if (option === "Language") {
        const languageCode = languageOptions[selectedValue];
        const googleTranslateElement = document.querySelector(".goog-te-combo");
        if (googleTranslateElement) {
          googleTranslateElement.value = languageCode;
          setTimeout(() => {
            googleTranslateElement.dispatchEvent(new Event("change"));
          }, 0); // Trigger change event after setting the value
        }
      }

      if (option === "Calendar Settings") {
        updatedSettings[option]["Default View"] = selectedValue;
      }

      return updatedSettings;
    });
  };

  /* Renders options based on settings selection */
  const renderOptionContent = () => {
    if (selectedOption === "Language") {
      return (
        <div>
          <label className="settings-label">
            Select Language:
            <select
              value={Object.keys(settings["Language"]).find(key => settings["Language"][key]) || "English"}
              onChange={(event) => handleDropdownChange("Language", event)}
            >
              {Object.keys(languageOptions).map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </label>
        </div>
      );
    } else if (selectedOption === "Calendar Settings") {
      return (
        <div>
          <label className="settings-label">
            Default View:
            <select
              value={settings["Calendar Settings"]["Default View"]}
              onChange={(event) => handleDropdownChange("Calendar Settings", event)}
            >
              <option value="Monthly">Monthly</option>
              <option value="Weekly">Weekly</option>
            </select>
          </label>
        </div>
      );
    }
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

  /* Handles the selection of a checkbox */
  const handleCheckboxChange = (option, setting) => {
    setSettings((prevSettings) => {
      const updatedSettings = { ...prevSettings };
      updatedSettings[option][setting] = !updatedSettings[option][setting];
      return updatedSettings;
    });
  };

  /* Component Layout */
  return (
    <div className="page-container">
      <div className="settings-box">
        {/* Gold Bar */}
        <div className="settings-bar"></div>

        {/* Settings Text */}
        <div className="settings-header">Settings</div>
        <div className="settings-buttons-options">
          {/* Settings Buttons */}
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

