import React, { useEffect, useRef } from "react";

function Popup({ openPopup, closePopup, children }) {
    const ref = useRef();

    // checks to see if popup is open
    useEffect(() => {
        if (openPopup) {
            ref.current?.show();
        } else {
            ref.current?.close();
        }
    }, [openPopup]);

    // returns a dialog box, closes when button click
    return (
        <dialog id="popup" ref={ref} onCancel={closePopup}>
            {children}
            <button onClick={closePopup}>Close</button>
        </dialog>
    );
}

export default Popup;
