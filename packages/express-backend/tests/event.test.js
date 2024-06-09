// __tests__/event-model.test.js

import eventModel from "../event.js"; // Adjust the path as per your project structure
import mongoose from "mongoose";

describe("Event Model", () => {
    // Test case to check if the model can be instantiated
    it("should create a new Event model", () => {
        // Create a mock Event object
        const mockEvent = {
            title: "Test Event",
            start: new Date("2024-06-08T09:00:00"),
            end: new Date("2024-06-08T10:00:00"),
            description: "This is a test event",
            location: "Test location",
            calendar: new mongoose.Types.ObjectId(),
            user: new mongoose.Types.ObjectId()
        };

        // Attempt to create a new Event model instance
        const eventInstance = new eventModel(mockEvent);

        // Ensure that the instance is created successfully
        expect(eventInstance).toBeInstanceOf(eventModel);
        expect(eventInstance.title).toEqual(mockEvent.title);
        expect(eventInstance.start).toEqual(mockEvent.start);
        expect(eventInstance.end).toEqual(mockEvent.end);
        expect(eventInstance.description).toEqual(mockEvent.description);
        expect(eventInstance.location).toEqual(mockEvent.location);
        expect(eventInstance.calendar).toEqual(mockEvent.calendar);
        expect(eventInstance.user).toEqual(mockEvent.user);
    });
});
