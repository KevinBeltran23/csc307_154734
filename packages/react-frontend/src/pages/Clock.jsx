import React, { useEffect, useState } from "react";

function Clock() {
    // https://www.educative.io/answers/how-to-create-a-dynamic-digital-clock-in-react used for tutorial
    const [date, setDate] = useState(new Date());

    // updates time every 1000ms (1 second)
    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // returns a clock with hours (drops leading zeros), minutes
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
