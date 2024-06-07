import React, { useState, useEffect } from "react";
import User from "./../../../packages/express-backend/user.js";
import Translate from "./Translate";
import "../components/Settings.css";

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
  const [settings, setSettings] = useState({
    "Language & Region": {},
    "Event Settings": {},
    "Calendar Settings": {},
    "Colors": {},
    "Text": {},
    "Secret Settings": {}
  });

  useEffect(() => {
    User.findOne({ username: props.username })
      .then(user => {
        if (user) {
          setSettings({
            "Language & Region": {
              [user.language]: true
            },
            "Event Settings": {
              "Poly Time": user.polytime
            },
            "Calendar Settings": {
              "Default View": user.default_view
            },
            "Colors": {
              "Default": false,
              "Random": false,
            },
            "Text": {
              "Bold Text": user.bold
            },
            "Secret Settings": {
              "Secret Setting 1": user.secret_setting1,
              "Secret Setting 2": user.secret_setting2,
            }
          });
        }
      })
      .catch(error => {
        console.log(error);
        props.setMessage(`Fetch Error: ${error.message}`);
      });
  }, []);

  const handleDropdownChange = (option, event) => {
    const selectedValue = event.target.value;
    const updatedSettings = {
      ...settings,
      [option]: {
        [selectedValue]: true
      }
    };
    setSettings(updatedSettings);

    const flattenedSettings = flattenSettings(updatedSettings, props.username);
    User.findOneAndUpdate(
      { username: props.username },
      flattenedSettings,
      { new: true, upsert: true }
    )
      .then(user => {
        // Handle successful update
      })
      .catch(error => {
        console.log(error);
        props.setMessage(`Update Error: ${error.message}`);
      });
  };

  const toggleCheck = (option, settingKey) => {
    const updatedSettings = {
      ...settings,
      [option]: {
        ...settings[option],
        [settingKey]: !settings[option][settingKey]
      }
    };
    setSettings(updatedSettings);

    const flattenedSettings = flattenSettings(updatedSettings, props.username);
    User.findOneAndUpdate(
      { username: props.username },
      flattenedSettings,
      { new: true, upsert: true }
    )
      .then(user => {
        // Handle successful update
      })
      .catch(error => {
        console.log(error);
        props.setMessage(`Update Error: ${error.message}`);
      });
  };

  const renderOptionContent = () => {
    switch (selectedOption) {
      case "Language & Region":
        return (
          <div>
            <label className="settings-label">
              Select Language:
              <select
                value={Object.keys(settings["Language & Region"]).find(key => settings["Language & Region"][key]) || "English"}
                onChange={(event) => handleDropdownChange("Language & Region", event)}
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
      case "Calendar Settings":
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
      default:
        return (
          <div>
            {Object.keys(settings[selectedOption]).map((setting) => (
              <label key={setting} className="settings-label">
                <input
                  type="checkbox"
                  checked={settings[selectedOption][setting]}
                  onChange={() => toggleCheck(selectedOption, setting)}
                />
                {setting}
              </label>
            ))}
          </div>
        );
    }
  };

  const flattenSettings = (nestedSettings, username) => {
    return {
      username: username,
      language: Object.keys(nestedSettings["Language & Region"]).find(key => nestedSettings["Language & Region"][key]),
      bold: nestedSettings.Text["Bold Text"],
      default_view: nestedSettings["Calendar Settings"]["Default View"],
      polytime: nestedSettings["Event Settings"]["Poly Time"],
      secret_setting1: nestedSettings["Secret Settings"]["Secret Setting 1"],
      secret_setting2: nestedSettings["Secret Settings"]["Secret Setting 2"]
    };
  };

  return (
    <div className="page-container">
      <div className="settings-box">
        <div className="settings-bar"></div>
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
