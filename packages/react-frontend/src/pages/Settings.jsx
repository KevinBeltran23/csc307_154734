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
  }, []);

  useEffect(() => {
    console.log(props.settings);
    props.fetchSettings()
      .then((res) => res.json())
      .then((json) => {
        const settings = json.result;
        props.setSettings(settings);
      })
      .catch((error) => {
        console.log(error);
        props.setMessage(`Fetch Error: ${error.message}`);
      });
  }, [props.settings]);

  useEffect(() => {
    if (props.settings.bold) {
      document.body.classList.add("bold-text");
    } else {
      document.body.classList.remove("bold-text");
    }
  }, [props.settings.bold]);

  const handleDropdownChange = (option, event) => {
    const selectedValue = event.target.value;
    props.setSettings((prevSettings) => {
      const updatedSettings = { ...prevSettings };
      Object.keys(updatedSettings[option]).forEach((key) => {
        updatedSettings[option][key] = key === selectedValue;
      });

      if (option === "Language & Region") {
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

    const flatSettings = flattenSettings(props.settings, props.userId);
    const settingToUpdate = props.settings.find((setting) => setting._id === selectedValue);
    if (!settingToUpdate) {
      props.postSetting(flatSettings)
        .then((newItemResponseJson) => {
          props.setSettings((prevSettings) => [...prevSettings, newItemResponseJson]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      props.putSetting(selectedValue, flatSettings)
        .then((updatedSettingResponse) => {
          props.setSettings(
            props.settings.map((setting) =>
              setting._id === selectedValue ? updatedSettingResponse : setting
            )
          );
        })
        .catch((error) => {
          props.setMessage(`Update Error: ${error.message}`);
          console.log(error);
        });
    }
  };

  const toggleCheck = (option, settingKey) => {
    const updatedSettings = {
      ...props.settings,
      [option]: {
        ...props.settings[option],
        [settingKey]: !props.settings[option][settingKey]
      }
    };

    props.setSettings(updatedSettings);

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
  };

  const renderOptionContent = ({ selectedOption, props, handleDropdownChange, toggleCheck }) => {
    const [content, setContent] = useState(null);
  
    useEffect(() => {
      // Render the content once props.settings has been updated
      switch (selectedOption) {
        case "Language & Region":
          setContent(
            <div>
              <label className="settings-label">
                Select Language:
                <select
                  value={Object.keys(props.settings["Language & Region"]).find(key => props.settings["Language & Region"][key]) || "English"}
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
          break;
        case "Calendar Settings":
          setContent(
            <div>
              <label className="settings-label">
                Default View:
                <select
                  value={props.settings["Calendar Settings"]["Default View"]}
                  onChange={(event) => handleDropdownChange("Calendar Settings", event)}
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Weekly">Weekly</option>
                </select>
              </label>
            </div>
          );
          break;
        default:
          setContent(
            <div>
              {Object.keys(props.settings[selectedOption]).map((setting) => (
                <label key={setting} className="settings-label">
                  <input
                    type="checkbox"
                    checked={props.settings[selectedOption][setting]}
                    onChange={() => toggleCheck(selectedOption, setting)}
                  />
                  {setting}
                </label>
              ))}
            </div>
          );
          break;
      }
    }, [selectedOption, props.settings]);
  
    return content;
  };

  const flattenSettings = (nestedSettings, userId) => {
    return {
      user: userId,
      language: Object.keys(nestedSettings["Language & Region"]).find(key => nestedSettings["Language & Region"][key]),
      bold: nestedSettings.Text["Bold Text"],
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
            {Object.keys(props.settings).map((option) => (
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
