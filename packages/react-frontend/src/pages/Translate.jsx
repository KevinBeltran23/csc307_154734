import React, { useEffect } from "react";

const Translate = () => {
    useEffect(() => {
        if (!window.google || !window.google.translate) {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src =
                "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            document.body.appendChild(script);
        } else {
            window.googleTranslateElementInit();
        }
    }, []);

    return (
        <div id="google_translate_element" style={{ display: "none" }}></div>
    );
};

export default Translate;
