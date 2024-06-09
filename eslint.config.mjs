import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

export default [
    {
        languageOptions: { globals: globals.browser }
    },
    pluginJs.configs.recommended,
    pluginReactConfig,
    {
        ignores: [
            "**/packages/react-frontend/build/**",
            "**/packages/express-backend/tests/**",
            "jest.config.js",
            "babel.config.js",
            "cssTransform.js",
            "jest.setup.js"
        ]
    }
];
