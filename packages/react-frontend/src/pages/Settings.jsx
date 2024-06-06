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
  const [settings, setSettings] = useState({
    "Language & Region": {
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

  useEffect(() => {
    props.fetchSettings()
      .then((res) => res.json())
      .then((json) => {
        const settings = json.settings_list;
        props.setSettings(settings);
      })
      .catch((error) => {
        console.log(error);
        props.setMessage(`Fetch Error: ${error.message}`);
      });
  }, []);

  function toggleCheck(option, settingKey) {
    const updatedSettings = {
      ...settings,
      [option]: {
        ...settings[option],
        [settingKey]: !settings[option][settingKey]
      }
    };
    
    setSettings(updatedSettings);

    const flatSettings = flattenSettings(updatedSettings, props.userId);
    const settingToUpdate = props.settings.find((setting) => setting._id === settingKey);
    if (!settingToUpdate) {
      props.postSetting(flatSettings)
        .then((newItemResponseJson) => {
          props.setSettings((prevSettings) => [...prevSettings, newItemResponseJson]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      props.putSetting(settingKey, flatSettings)
        .then((updatedSettingResponse) => {
          props.setSettings(
            props.settings.map((setting) =>
              setting._id === settingKey ? updatedSettingResponse : setting
            )
          );
        })
        .catch((error) => {
          props.setMessage(`Update Error: ${error.message}`);
          console.log(error);
        });
    }
  }

  useEffect(() => {
    if (settings.Text["Bold Text"]) {
      document.body.classList.add("bold-text");
    } else {
      document.body.classList.remove("bold-text");
    }
  }, [settings.Text["Bold Text"]]);

  const handleDropdownChange = (option, event) => {
    const selectedValue = event.target.value;
    setSettings((prevSettings) => {
      const newSettings = Object.keys(prevSettings[option]).reduce((acc, key) => {
        acc[key] = key === selectedValue;
        return acc;
      }, {});
      return {
        ...prevSettings,
        [option]: newSettings,
      };
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

  const flattenSettings = (nestedSettings, userId) => {
    return {
      user: userId,
      language: Object.keys(nestedSettings["Language & Region"]).find(key => nestedSettings["Language & Region"][key]),
      bold: nestedSettings.Text["Bold Text"],
      large: nestedSettings.Text["Large Text"],
      default_view: nestedSettings["Calendar Settings"]["Default View"],
      polytime: nestedSettings["Event Settings"]["Poly Time"],
      secret_setting1: nestedSettings["Secret Settings"]["Secret Setting 1"],
      secret_setting2: nestedSettings["Secret Settings"]["Secret Setting 2"],
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
