


import React, { useState, useEffect } from "react";
import Translate from "./Translate"; // Import the Translate component
import "../components/Settings.css";

/* Google Translate Language Codes */
const languageOptions = {
    "Mandarin Chinese": "zh-CN",
    Spanish: "es",
    English: "en",
    Hindi: "hi",
    Bengali: "bn",
    Portuguese: "pt-BR",
    Russian: "ru",
    Japanese: "ja",
    Vietnamese: "vi"
};

function Settings(props) {
  const [selectedOption, setSelectedOption] = useState("Language & Region");

  useEffect(() => {
    console.log("User has been updated. Here they are");
    console.log(props.user);
  }, [props.user]);

  useEffect(() => {
    props.fetchUser(props.userId)
      .then((res) => res.json())
      .then((json) => {
        props.setUser(json.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.userId]);

  useEffect(() => {
    if (props.user?.bold) {
      document.body.classList.add("bold-text");
    } else {
      document.body.classList.remove("bold-text");
    }
  }, [props.user?.bold]);

  const handleDropdownChange = (option, event) => {
    const selectedValue = event.target.value;
    props.setUser((prevUser) => ({
      ...prevUser,
      [option]: selectedValue
    }));

    const flatSettings = flattenSettings({ ...props.user, [option]: selectedValue }, props.userId);
    props.putUser(props.userId, flatSettings)
      .catch((error) => {
        props.setMessage(`Update Error: ${error.message}`);
        console.log(error);
      });
  };
/*
  const toggleCheck = (settingKey) => {
    const updatedSettings = {
      ...props.user,
      [settingKey]: !props.user[settingKey]
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
    const updatedUser = {
      ...props.user,
      [settingKey]: !props.user[settingKey]
    };
    props.setUser(updatedUser);

    const flatSettings = flattenSettings(updatedUser, props.userId);
    props.putUser(props.userId, flatSettings)
        .then((result) => {
          if (result) {
            props.setUser(result);
          } else {
            console.log("No data returned from PUT request");
            props.setUser(updatedUser); // Keep local state if the response is empty
          }
          console.log("The put request is successful and the following is the updated User")
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
        {Object.keys(props.user || {}).map((setting) => (
          <div key={setting} className="settings-item">
            {typeof props.user[setting] === "boolean" ? (
              <label className="settings-label">
                <input
                  type="checkbox"
                  checked={props.user[setting]}
                  onChange={() => toggleCheck(setting)}
                />
                {setting}
              </label>
            ) : (
              <label className="settings-label">
                {setting}:
                <select
                  value={props.user[setting]}
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
            {Object.keys(props.user || {}).map((option) => (
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
