import React, { useState, useEffect } from "react";
import Translate from "./Translate"; // Import the Translate component
import "../components/Settings.css";
import "../components/general.css"; // Import the general CSS file

/* Google Translate Language Codes */
const languageOptions = {
    "Mandarin Chinese": "zh-CN",
    Spanish: "es",
    English: "en",
    Hindi: "hi",
    Bengali: "bn",
    Portuguese: "pt",
    Russian: "ru",
    Japanese: "ja",
    Vietnamese: "vi"
};

function Settings(props) {
    const [selectedSection, setSelectedSection] = useState("Visual");
    const [selectedLanguage, setSelectedLanguage] = useState(
        languageOptions["English"]
    ); // Default language
    const [selectedDefaultView, setSelectedDefaultView] = useState("Monthly");
    const [newUsername, setNewUsername] = useState(""); // State to hold the new username

    // Categorize settings based on sections
    const settingsSections = {
        Visual: ["bold", "polytime", "default_view"],
        Account: ["username", "password"],
        "Language & Region": ["language"],
        Misc: ["secret_setting1", "secret_setting2"]
    };

    // Initial fetch to view the current settings
    useEffect(() => {
        props
            .fetchUser(props.userId)
            .then((res) => res.json())
            .then((json) => {
                props.setUser(json.result);
                setSelectedDefaultView(json.result.default_view || "Monthly"); // Initialize default view state
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

    // Handle bold text setting
    useEffect(() => {
        if (props.user?.secret_setting2) {
            document.body.classList.add("body-with-image");
        } else {
            document.body.classList.remove("body-with-image");
        }
    }, [props.user?.secret_setting2]);

    // Function to toggle boolean settings
    const toggleCheck = (settingKey) => {
        const updatedUser = {
            ...props.user,
            [settingKey]: !props.user[settingKey]
        };

        props
            .putUser(props.userId, updatedUser)
            .then((result) => {
                if (result) {
                    props.setUser(result);
                    console.log(
                        "The put request is successful and the following is the updated User"
                    );
                    console.log(result);

                    // Check if secret_setting2 was toggled and update body class accordingly
                    if (settingKey === "secret_setting2") {
                        document.body.classList.toggle(
                            "body-with-image",
                            result[settingKey]
                        );
                    }
                } else {
                    console.log("No data returned from PUT request");
                }
            })
            .catch((error) => {
                props.setMessage(`Update Error: ${error.message}`);
                console.log(error);
            });
    };

    // Function to handle language change
    const handleLanguageChange = (languageCode) => {
        setSelectedLanguage(languageCode);
        updateGoogleTranslate(languageCode);

        // Update database
        const updatedUser = {
            ...props.user,
            language: languageCode
        };
        props
            .putUser(props.userId, updatedUser)
            .then((result) => {
                if (result) {
                    props.setUser(result);
                    console.log(
                        "The put request is successful and the following is the updated User"
                    );
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

    // Function to handle default view change
    const handleDefaultViewChange = (event) => {
        const updatedDefaultView = event.target.value;
        setSelectedDefaultView(updatedDefaultView);

        // Update database
        const updatedUser = {
            ...props.user,
            default_view: updatedDefaultView
        };
        props
            .putUser(props.userId, updatedUser)
            .then((result) => {
                if (result) {
                    props.setUser(result);
                    console.log(
                        "The put request is successful and the following is the updated User"
                    );
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

    // Function to handle username change request
    const handleChangeUsername = () => {
        // Make API call to update username
        const updatedUser = {
            ...props.user,
            username: newUsername
        };
        props
            .putUser(props.userId, updatedUser)
            .then((result) => {
                if (result) {
                    props.setUser(result);
                    console.log("Username updated successfully");
                } else {
                    console.log("No data returned from PUT request");
                }
            })
            .catch((error) => {
                props.setMessage(`Update Error: ${error.message}`);
                console.log(error);
            });
    };

    // Function to update Google Translate widget
    const updateGoogleTranslate = (languageCode) => {
        const googleTranslateElement = document.querySelector(".goog-te-combo");
        if (googleTranslateElement) {
            googleTranslateElement.value = languageCode;
            googleTranslateElement.dispatchEvent(new Event("change"));
        }
    };

    const renderOptionContent = () => {
        return (
            <div>
                {(settingsSections[selectedSection] || []).map((setting) => (
                    <div key={setting} className="settings-item">
                        {[
                            "bold",
                            "polytime",
                            "secret_setting1",
                            "secret_setting2"
                        ].includes(setting) ? (
                            <>
                                {setting === "secret_setting2" &&
                                !props.user.secret_setting1 ? null : ( // Conditionally render secret_setting2 based on secret_setting1
                                    <label className="settings-label">
                                        <input
                                            type="checkbox"
                                            checked={
                                                props.user[setting] || false
                                            }
                                            onChange={() =>
                                                toggleCheck(setting)
                                            }
                                        />
                                        {setting}
                                    </label>
                                )}
                            </>
                        ) : (
                            <>
                                {setting === "language" ? (
                                    <label className="settings-label">
                                        {setting}:
                                        <select
                                            value={selectedLanguage}
                                            onChange={(event) =>
                                                handleLanguageChange(
                                                    event.target.value
                                                )
                                            }
                                        >
                                            {Object.keys(languageOptions).map(
                                                (language) => (
                                                    <option
                                                        key={language}
                                                        value={
                                                            languageOptions[
                                                                language
                                                            ]
                                                        }
                                                    >
                                                        {language}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </label>
                                ) : (
                                    <>
                                        {setting === "default_view" && (
                                            <label className="settings-label">
                                                {setting}:
                                                <select
                                                    value={selectedDefaultView}
                                                    onChange={(event) =>
                                                        handleDefaultViewChange(
                                                            event
                                                        )
                                                    }
                                                >
                                                    {["Monthly", "Weekly"].map(
                                                        (option) => (
                                                            <option
                                                                key={option}
                                                                value={option}
                                                            >
                                                                {option}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </label>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                ))}
                {/* Add textbox for changing username */}
                {selectedSection === "Account" && (
                    <div className="settings-item">
                        <label className="settings-label">New Username:</label>
                        <input
                            type="text"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            className="username-input"
                        />
                        <button
                            onClick={handleChangeUsername}
                            className="change-username-button"
                        >
                            Change Username
                        </button>
                    </div>
                )}
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
                        {["Visual", "Account", "Language & Region", "Misc"].map(
                            (section) => (
                                <button
                                    key={section}
                                    className={`settings-button ${selectedSection === section ? "active" : ""}`}
                                    onClick={() => setSelectedSection(section)}
                                >
                                    <div className="settings-text">
                                        {section}
                                    </div>
                                </button>
                            )
                        )}
                    </div>
                    <div className="settings-options">
                        <div className="settings-option">
                            {renderOptionContent()}
                        </div>
                    </div>
                </div>
            </div>
            <Translate />
        </div>
    );
}

export default Settings;
