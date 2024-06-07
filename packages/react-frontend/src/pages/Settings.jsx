


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

function Settings(props) {
  const [selectedOption, setSelectedOption] = useState("Language & Region");

  useEffect(() => {
    console.log(props.settings);
    console.log(localStorage.getItem("settings"));
  }, [props.settings]);

  useEffect(() => {
    console.log(props.userId);
    props.fetchSettings(props.userId)
      .then((res) => res.json())
      .then((json) => {
        props.setSettings(json.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.userId]);

  useEffect(() => {
    if (props.settings?.bold) {
      document.body.classList.add("bold-text");
    } else {
      document.body.classList.remove("bold-text");
    }
  }, [props.settings?.bold]);

  const handleDropdownChange = (option, event) => {
    const selectedValue = event.target.value;
    props.setSettings((prevSettings) => ({
      ...prevSettings,
      [option]: selectedValue
    }));

    const flatSettings = flattenSettings({ ...props.settings, [option]: selectedValue }, props.userId);
    props.putSetting(props.userId, flatSettings)
      .catch((error) => {
        props.setMessage(`Update Error: ${error.message}`);
        console.log(error);
      });
  };
/*
  const toggleCheck = (settingKey) => {
    const updatedSettings = {
      ...props.settings,
      [settingKey]: !props.settings[settingKey]
    };

    props.setSettings(updatedSettings);

    const flatSettings = flattenSettings(updatedSettings, props.userId);
    props.putSetting(props.userId, flatSettings)
      .catch((error) => {
        props.setMessage(`Update Error: ${error.message}`);
        console.log(error);
      });
  };*/

  const toggleCheck = (settingKey) => {
    const updatedSettings = {
      ...props.settings,
      [settingKey]: !props.settings[settingKey]
    };
    props.setSettings(updatedSettings);

    const flatSettings = flattenSettings(updatedSettings, props.userId);
    props.putUser(props.userId, flatSettings)
        .then((result) => {
          if (result) {
            props.setSettings(result);
          } else {
            console.log("No data returned from PUT request");
            props.setSettings(updatedSettings); // Keep local state if the response is empty
          }
          console.log(updatedSettings);
          console.log(result);
        })
        .catch((error) => {
          props.setMessage(`Update Error: ${error.message}`);
          console.log(error);
        });
  };

  const renderOptionContent = () => {
    return (
      <div>
        {Object.keys(props.settings || {}).map((setting) => (
          <div key={setting} className="settings-item">
            {typeof props.settings[setting] === "boolean" ? (
              <label className="settings-label">
                <input
                  type="checkbox"
                  checked={props.settings[setting]}
                  onChange={() => toggleCheck(setting)}
                />
                {setting}
              </label>
            ) : (
              <label className="settings-label">
                {setting}:
                <select
                  value={props.settings[setting]}
                  onChange={(event) => handleDropdownChange(setting, event)}
                >
                  {setting === "language" ? (
                    Object.keys(languageOptions).map((language) => (
                      <option key={language} value={languageOptions[language]}>
                        {language}
                      </option>
                    ))
                  ) : (
                    ["Monthly", "Weekly"].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))
                  )}
                </select>
              </label>
            )}
          </div>
        ))}
      </div>
    );
  };

  const flattenSettings = (settings, userId) => ({
    ...settings,
    userId
  });

  return (
    <div className="page-container">
      <div className="settings-box">
        <div className="settings-bar"></div>
        <div className="settings-header">Settings</div>
        <div className="settings-buttons-options">
          <div className="settings-buttons">
            {Object.keys(props.settings || {}).map((option) => (
              <button
                key={option}
                className={`settings-button ${selectedOption === option ? "active" : ""}`}
                onClick={() => setSelectedOption(option)}
              >
                <div className="settings-text">{option}</div>
              </button>
            ))}
          </div>
          <div className="settings-options">
            <div className="settings-option">{renderOptionContent()}</div>
          </div>
        </div>
      </div>
      <Translate />
    </div>
  );
}

export default Settings;