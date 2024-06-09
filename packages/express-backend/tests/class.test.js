// __tests__/class-model.test.js

import classModel from "../class.js"; // Adjust the path as per your project structure
import mongoose from "mongoose";

describe("Class Model", () => {
    // Test case to check if the model can be instantiated
    it("should create a new Class model", () => {
        // Create a mock Class object
        const mockClass = {
            title: "Test Class",
            start: new Date("2024-06-08T09:00:00"),
            end: new Date("2024-06-08T10:00:00"),
            description: "This is a test class",
            professor: "Test Professor",
            calendar: new mongoose.Types.ObjectId(),
            user: new mongoose.Types.ObjectId()
        };

        // Attempt to create a new Class model instance
        const classInstance = new classModel(mockClass);

        // Ensure that the instance is created successfully
        expect(classInstance).toBeInstanceOf(classModel);
        expect(classInstance.title).toEqual(mockClass.title);
        expect(classInstance.start).toEqual(mockClass.start);
        expect(classInstance.end).toEqual(mockClass.end);
        expect(classInstance.description).toEqual(mockClass.description);
        expect(classInstance.professor).toEqual(mockClass.professor);
        expect(classInstance.calendar).toEqual(mockClass.calendar);
        expect(classInstance.user).toEqual(mockClass.user);
    });
});
