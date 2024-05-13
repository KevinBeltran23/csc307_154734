// src/pages/Settings.jsx
import React from "react";

const Settings = () => {
  return (
    <div className="buttons">
      {/* Apperance Button */}
      <div className="apperance-button">Apperance</div>
      
      {/* View Options Button */}
      <div className="view-options-button">View Options</div>
      
      {/* Colors Button */}
      <div className="colors-button">Colors</div>
      
      {/* Text Button */}
      <div className="text-button">Text</div>
      
      {/* Secret Settings */}
      <div className="secret-settings">Secret Settings</div>
      
      {/* Language & Region Button */}
      <div className="language-region-button">Language & Region</div>
      
      {/* Notifications Button */}
      <div className="notifications-button">Notifications</div>
      
      {/* Event Settings Button */}
      <div className="event-settings-button">Event Settings</div>
      
      {/* Account Settings Button */}
      <div className="account-settings-button">Account Settings</div>
    </div>
  );
};

export default Settings;
