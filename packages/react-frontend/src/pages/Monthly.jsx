// src/pages/Monthly.jsx
import React, { useState } from "react";
/*import Calendar from "react-calendar";
import "../components/Monthly.css"; */
import BigCalendar from "react-big-calendar";

function Monthly() {
    const [value, setValue] = useState(new Date());

    function onChange(nextValue) {
        setValue(nextValue);
    }
    return <Calendar onChange={onChange} value={value} />;
}

export default Monthly;
