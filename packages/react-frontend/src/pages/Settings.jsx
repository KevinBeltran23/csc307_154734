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
    const [selectedSection, setSelectedSection] = useState("Visual");

    // Categorize settings based on sections
    const settingsSections = {
      Visual: ["bold", "polytime", "defaultView"],
      Account: ["password", "username"],
      "Language & Region": ["language"],
      Misc: ["secret_setting1", "secret_setting2"]
    };

    // Initial fetch to view the current settings
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

    // Handle bold text setting
    useEffect(() => {
        if (props.user?.bold) {
            document.body.classList.add("bold-text");
        } else {
            document.body.classList.remove("bold-text");
        }
    }, [props.user?.bold]);

    // Function to toggle boolean settings
    const toggleCheck = (settingKey) => {
        const updatedUser = {
            ...props.user,
            [settingKey]: !props.user[settingKey]
        };

        props.putUser(props.userId, updatedUser)
            .then((result) => {
                if (result) {
                    props.setUser(result);
                    console.log("The put request is successful and the following is the updated User");
                    console.log(result);
                } else {
                    console.log("No data returned from PUT request");
                }
            })
            .catch((error) => {
                props.setMessage(`Update Error: ${error.message}`);
                console.log(error);
            });
    };

    // Function to handle dropdown changes
    const handleDropdownChange = (settingKey, event) => {
        const updatedUser = {
            ...props.user,
            [settingKey]: event.target.value
        };

        props.putUser(props.userId, updatedUser)
            .then((result) => {
                if (result) {
                    props.setUser(result);
                    console.log("The put request is successful and the following is the updated User");
                    console.log(result);
                } else {
                    console.log("No data returned from PUT request");
                }
            })
            .catch((error) => {
                props.setMessage(`Update Error: ${error.message}`);
                console.log(error);
            });
    };

    const renderOptionContent = () => {
        return (
            <div>
                {(settingsSections[selectedSection] || []).map((setting) => (
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

    return (
        <div className="page-container">
            <div className="settings-box">
                <div className="settings-bar"></div>
                <div className="settings-header">Settings</div>
                <div className="settings-buttons-options">
                    <div className="settings-buttons">
                        {["Visual", "Account", "Language & Region", "Misc"].map((section) => (
                            <button
                                key={section}
                                className={`settings-button ${selectedSection === section ? "active" : ""}`}
                                onClick={() => setSelectedSection(section)}
                            >
                                <div className="settings-text">{section}</div>
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