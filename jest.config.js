module.exports = {
    testEnvironment: "jsdom",
    moduleFileExtensions: ["js", "jsx", "json", "node"],
    transform: {
        "^.+\\.jsx?$": "babel-jest",
        "^.+\\.css$": "./cssTransform.js" // Use custom transformer for CSS files
    },
    transformIgnorePatterns: ["/node_modules/"],
    setupFilesAfterEnv: ["./jest.setup.js"] // Ensure this path is correct
};
