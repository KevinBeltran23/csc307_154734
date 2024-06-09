import userModel from "../user.js";
import userService from "../services.js";

// Mocking the userModel
jest.mock("../user.js");

describe("getUsers", () => {
    it("should return a user when username and password are provided", async () => {
        const username = "testuser";
        const password = "testpass";
        const user = { username: "testuser", password: "testpass" };

        const findOneMock = jest.fn().mockResolvedValue(user);
        userModel.findOne = findOneMock;

        const result = await userService.getUsers(username, password);

        expect(findOneMock).toHaveBeenCalledWith({ username, password });
        expect(result).toEqual(user);
    });

    it("should return users when only username is provided", async () => {
        const username = "testuser";
        const users = [{ username: "testuser1" }, { username: "testuser2" }];

        const findMock = jest.fn().mockResolvedValue(users);
        userModel.find = findMock;

        const result = await userService.getUsers(username);

        expect(findMock).toHaveBeenCalledWith({ username });
        expect(result).toEqual(users);
    });

    it("should return users when only password is provided", async () => {
        const password = "testpass";
        const users = [{ password: "testpass1" }, { password: "testpass2" }];

        const findMock = jest.fn().mockResolvedValue(users);
        userModel.find = findMock;

        const result = await userService.getUsers(undefined, password);

        expect(findMock).toHaveBeenCalledWith({ password });
        expect(result).toEqual(users);
    });

    it("should return users when no username and password are provided", async () => {
        const users = [{ username: "user1" }, { username: "user2" }];

        const findMock = jest.fn().mockResolvedValue(users);
        userModel.find = findMock;

        const result = await userService.getUsers();

        expect(findMock).toHaveBeenCalledWith({});
        expect(result).toEqual(users);
    });

    it("should handle errors during fetching users", async () => {
        const findMock = jest
            .fn()
            .mockRejectedValue(new Error("Error fetching users"));
        userModel.find = findMock;

        await expect(userService.getUsers()).rejects.toThrow(
            "Error fetching users"
        );
    });
});

describe("getUserByNameAndPassword", () => {
    it("should return a user when username and password are provided", async () => {
        const username = "testuser";
        const password = "testpass";
        const user = { username: "testuser", password: "testpass" };

        const findOneMock = jest.fn().mockResolvedValue(user);
        userModel.findOne = findOneMock;

        const result = await userService.getUserByNameAndPassword(
            username,
            password
        );

        expect(findOneMock).toHaveBeenCalledWith({ username, password });
        expect(result).toEqual(user);
    });

    it("should handle errors during fetching user", async () => {
        const username = "testuser";
        const password = "testpass";
        const findOneMock = jest
            .fn()
            .mockRejectedValue(new Error("Error fetching user"));
        userModel.findOne = findOneMock;

        await expect(
            userService.getUserByNameAndPassword(username, password)
        ).rejects.toThrow("Error fetching user");
    });
});

describe("addUser", () => {
    it("should add a new user", async () => {
        const user = { username: "testuser", password: "testpass" };
        const savedUser = { ...user, _id: "userId" };

        const saveMock = jest.fn().mockResolvedValue(savedUser);
        userModel.mockImplementation(() => ({
            save: saveMock
        }));

        const result = await userService.addUser(user);

        expect(saveMock).toHaveBeenCalled();
        expect(result).toEqual(savedUser);
    });

    it("should handle errors during adding user", async () => {
        const user = { username: "testuser", password: "testpass" };
        const saveMock = jest
            .fn()
            .mockRejectedValue(new Error("Error adding user"));

        userModel.mockImplementation(() => ({
            save: saveMock
        }));

        await expect(userService.addUser(user)).rejects.toThrow(
            "Error adding user"
        );
    });
});

describe("editUser", () => {
    it("should update a user by id", async () => {
        const userId = "userId";
        const updatedUser = { username: "updatedUser" };
        const updatedUserData = { ...updatedUser, _id: userId };

        const findByIdAndUpdateMock = jest
            .fn()
            .mockResolvedValue(updatedUserData);
        userModel.findByIdAndUpdate = findByIdAndUpdateMock;

        const result = await userService.editUser(userId, updatedUser);

        expect(findByIdAndUpdateMock).toHaveBeenCalledWith(
            userId,
            updatedUser,
            { new: true }
        );
        expect(result).toEqual(updatedUserData);
    });

    it("should handle errors during updating user", async () => {
        const userId = "userId";
        const updatedUser = { username: "updatedUser" };

        const findByIdAndUpdateMock = jest
            .fn()
            .mockRejectedValue(new Error("Error updating user"));
        userModel.findByIdAndUpdate = findByIdAndUpdateMock;

        await expect(userService.editUser(userId, updatedUser)).rejects.toThrow(
            "Error updating user"
        );
    });
});

describe("findUserById", () => {
    it("should return a user by id", async () => {
        const userId = "userId";
        const user = { _id: userId, username: "testuser" };

        const findByIdMock = jest.fn().mockResolvedValue(user);
        userModel.findById = findByIdMock;

        const result = await userService.findUserById(userId);

        expect(findByIdMock).toHaveBeenCalledWith(userId);
        expect(result).toEqual(user);
    });

    it("should handle errors during fetching user", async () => {
        const userId = "userId";

        const findByIdMock = jest
            .fn()
            .mockRejectedValue(new Error("Error fetching user"));
        userModel.findById = findByIdMock;

        await expect(userService.findUserById(userId)).rejects.toThrow(
            "Error fetching user"
        );
    });
});

describe("deleteUserById", () => {
    it("should delete a user by id", async () => {
        const userId = "userId";
        const deletedUser = { _id: userId, username: "testuser" };

        const findByIdAndDeleteMock = jest.fn().mockResolvedValue(deletedUser);
        userModel.findByIdAndDelete = findByIdAndDeleteMock;

        const result = await userService.deleteUserById(userId);

        expect(findByIdAndDeleteMock).toHaveBeenCalledWith(userId);
        expect(result).toEqual(deletedUser);
    });

    it("should handle errors during deleting user", async () => {
        const userId = "userId";

        const findByIdAndDeleteMock = jest
            .fn()
            .mockRejectedValue(new Error("Error deleting user"));
        userModel.findByIdAndDelete = findByIdAndDeleteMock;

        await expect(userService.deleteUserById(userId)).rejects.toThrow(
            "Error deleting user"
        );
    });
});
