import React, { useEffect, useRef } from "react";

function Popup({ openPopup, closePopup, children }) {
    const ref = useRef();

    useEffect(() => {
        if (openPopup) {
            ref.current?.show();
        } else {
            ref.current?.close();
        }
    }, [openPopup]);

    return (
        <dialog id="popup" ref={ref} onCancel={closePopup}>
            {children}
            <button onClick={closePopup}>Close</button>
        </dialog>
    );
}

export default Popup;
