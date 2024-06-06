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

/* Settings Component 
function Settings (props) {
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
}*/

function Settings(props) {
    const [selectedOption, setSelectedOption] = useState("Language & Region");
    const [settings, setSettings] = useState({
      language: "en",
      bold: false,
      large: false,
      default_view: "Monthly",
      polytime: true,
      secret_setting1: "",
      secret_setting2: "",
      user: props.userId
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
 
    function toggleCheck(settingKey) {
        const updatedSettings = {
            ...settings,
            [settingKey]: !settings[settingKey]
        };
        
        setSettings(updatedSettings);

        const settingToUpdate = props.settings.find((setting) => setting._id === settingKey);
        if (!settingToUpdate) {
            props.postSetting(updatedSettings)
                .then((newItemResponseJson) => {
                    props.setSettings((prevSettings) => [...prevSettings, newItemResponseJson]);
                })
                .catch((error) => {
                    console.log(error);
            });
        } else {
            props.putSetting(settingKey, updatedSettings)
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
        if (settings.bold) {
          document.body.classList.add("bold-text");
        } else {
          document.body.classList.remove("bold-text");
        }
    }, [settings.bold]);

  /* Reload the page when the component is first mounted 
  useEffect(() => {
    if (!sessionStorage.getItem("reloaded")) {
      sessionStorage.setItem("reloaded", "true");
      window.location.reload();
    } else {
      sessionStorage.removeItem("reloaded");
    }
  }, []);*/

  /* Activates or deactivates bold text 
  useEffect(() => {
    if (settings.Text["Bold Text"]) {
      document.body.classList.add("bold-text");
    } else {
      document.body.classList.remove("bold-text");
    }
  }, [settings.Text["Bold Text"]]);
*/

    const handleDropdownChange = (option, event) => {
        const selectedValue = event.target.value;
        setSettings((prevSettings) => ({
          ...prevSettings,
          [option]: selectedValue,
        }));
    };

    const renderOptionContent = () => {
        switch (selectedOption) {
          case "Language & Region":
            return (
              <div>
                <label className="settings-label">
                  Select Language:
                  <select
                    value={settings.language}
                    onChange={(event) => handleDropdownChange("language", event)}
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
                    value={settings.default_view}
                    onChange={(event) => handleDropdownChange("default_view", event)}
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
                {Object.keys(settings).map((setting) => (
                  <label key={setting} className="settings-label">
                    <input
                      type="checkbox"
                      checked={settings[setting]}
                      onChange={() => toggleCheck(setting)}
                    />
                    {setting}
                  </label>
                ))}
              </div>
            );
        }
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

  /* Component Layout 
  return (
    <div className="page-container">
      <div className="settings-box">
\        <div className="settings-bar"></div>

\        <div className="settings-header">Settings</div>
        <div className="settings-buttons-options">
\          <div className="settings-buttons">
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

\          <div className="settings-options">
            <div className="settings-option">{renderOptionContent()}</div>
          </div>
        </div>
      </div>
      <Translate /> \
    </div>
  );
};*/

export default Settings;
