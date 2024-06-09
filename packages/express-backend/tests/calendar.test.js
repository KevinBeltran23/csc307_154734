// __tests__/calendar-model.test.js

import calendarModel from "../calendar.js"; // Adjust the path as per your project structure
import mongoose from "mongoose";

describe("Calendar Model", () => {
    // Test case to check if the model can be instantiated
    it("should create a new Calendar model", () => {
        // Create a mock Calendar object
        const mockCalendar = {
            color: "#FF0000", // Sample color code
            name: "Test Calendar",
            user: new mongoose.Types.ObjectId()
        };

        // Attempt to create a new Calendar model instance
        const calendarInstance = new calendarModel(mockCalendar);

        // Ensure that the instance is created successfully
        expect(calendarInstance).toBeInstanceOf(calendarModel);
        expect(calendarInstance.color).toEqual(mockCalendar.color);
        expect(calendarInstance.name).toEqual(mockCalendar.name);
        expect(calendarInstance.user).toEqual(mockCalendar.user);
    });
});
