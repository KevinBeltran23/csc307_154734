import React, { useEffect, useState } from "react";

function Clock() {
    // https://www.educative.io/answers/how-to-create-a-dynamic-digital-clock-in-react
    const [date, setDate] = useState(new Date());
    var t;

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="clock">
            {date.toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit"
            })}
        </div>
    );
}

export default Clock;
