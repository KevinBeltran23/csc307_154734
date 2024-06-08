module.exports = {
    testEnvironment: "jsdom",
    moduleFileExtensions: ["js", "jsx", "json", "node"],
    transform: {
      "^.+\\.[tj]sx?$": "babel-jest",
      "^.+\\.css$": "<rootDir>/cssTransform.js" // Use custom transformer for CSS files
    },
    transformIgnorePatterns: ["/node_modules/"],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"] // Ensure this path is correct
};
