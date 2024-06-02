import React, { useState } from "react";

function Dropdown(opt) {
    const [selectedValue, setSelectedValue] = useState();
    const options = opt;

    return (
        <div className="Dropdown">
            <select id = "dropdown"
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                    {option.label}
                </option>
                ))}
            </select>
        </div>
        );
       }


export default Dropdown;