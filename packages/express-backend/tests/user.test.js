import userModel from "../user.js"; // Adjust the path as per your project structure

describe("User Model", () => {
    // Test case to check if the model can be instantiated
    it("should create a new User model", () => {
        // Create a mock User object
        const mockUser = {
            username: "testuser",
            password: "password123",
            language: "en",
            bold: true,
            default_view: "monthly",
            polytime: false,
            secret_setting1: true,
            secret_setting2: false
        };

        // Attempt to create a new User model instance
        const userInstance = new userModel(mockUser);

        // Ensure that the instance is created successfully
        expect(userInstance).toBeInstanceOf(userModel);
        expect(userInstance.username).toEqual(mockUser.username);
        expect(userInstance.password).toEqual(mockUser.password);
        expect(userInstance.language).toEqual(mockUser.language);
        expect(userInstance.bold).toEqual(mockUser.bold);
        expect(userInstance.default_view).toEqual(mockUser.default_view);
        expect(userInstance.polytime).toEqual(mockUser.polytime);
        expect(userInstance.secret_setting1).toEqual(mockUser.secret_setting1);
        expect(userInstance.secret_setting2).toEqual(mockUser.secret_setting2);
    });
});
