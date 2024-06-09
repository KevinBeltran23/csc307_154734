import calendarModel from "../calendar.js";
import calendarService from "../services.js";

jest.mock("../calendar.js");

describe("getCalendars", () => {
    it("should return calendars for a given userId", async () => {
        const userId = "userId";
        const calendars = [
            { user: userId, name: "Calendar1" },
            { user: userId, name: "Calendar2" }
        ];

        const findMock = jest.fn().mockResolvedValue(calendars);
        calendarModel.find = findMock;

        const result = await calendarService.getCalendars(userId);

        expect(findMock).toHaveBeenCalledWith({ user: userId });
        expect(result).toEqual(calendars);
    });

    it("should return all calendars when no userId is provided", async () => {
        const calendars = [{ name: "Calendar1" }, { name: "Calendar2" }];

        const findMock = jest.fn().mockResolvedValue(calendars);
        calendarModel.find = findMock;

        const result = await calendarService.getCalendars();

        expect(findMock).toHaveBeenCalledWith({});
        expect(result).toEqual(calendars);
    });

    it("should handle errors during fetching calendars", async () => {
        const findMock = jest
            .fn()
            .mockRejectedValue(new Error("Error fetching calendars"));
        calendarModel.find = findMock;

        await expect(calendarService.getCalendars()).rejects.toThrow(
            "Error fetching calendars"
        );
    });
});

describe("addCalendar", () => {
    it("should add a new calendar", async () => {
        const calendar = { name: "Calendar1" };
        const savedCalendar = { ...calendar, _id: "calendarId" };

        const saveMock = jest.fn().mockResolvedValue(savedCalendar);
        calendarModel.mockImplementation(() => ({
            save: saveMock
        }));

        const result = await calendarService.addCalendar(calendar);

        expect(saveMock).toHaveBeenCalled();
        expect(result).toEqual(savedCalendar);
    });

    it("should handle errors during adding calendar", async () => {
        const calendar = { name: "Calendar1" };
        const saveMock = jest
            .fn()
            .mockRejectedValue(new Error("Error adding calendar"));

        calendarModel.mockImplementation(() => ({
            save: saveMock
        }));

        await expect(calendarService.addCalendar(calendar)).rejects.toThrow(
            "Error adding calendar"
        );
    });
});

describe("editCalendar", () => {
    it("should update a calendar by id", async () => {
        const calendarId = "calendarId";
        const updatedCalendar = { name: "Updated Calendar" };
        const updatedCalendarData = { ...updatedCalendar, _id: calendarId };

        const findByIdAndUpdateMock = jest
            .fn()
            .mockResolvedValue(updatedCalendarData);
        calendarModel.findByIdAndUpdate = findByIdAndUpdateMock;

        const result = await calendarService.editCalendar(
            calendarId,
            updatedCalendar
        );

        expect(findByIdAndUpdateMock).toHaveBeenCalledWith(
            calendarId,
            updatedCalendar,
            { new: true }
        );
        expect(result).toEqual(updatedCalendarData);
    });

    it("should handle errors during updating calendar", async () => {
        const calendarId = "calendarId";
        const updatedCalendar = { name: "Updated Calendar" };

        const findByIdAndUpdateMock = jest
            .fn()
            .mockRejectedValue(new Error("Error updating calendar"));
        calendarModel.findByIdAndUpdate = findByIdAndUpdateMock;

        await expect(
            calendarService.editCalendar(calendarId, updatedCalendar)
        ).rejects.toThrow("Error updating calendar");
    });
});

describe("findCalendarById", () => {
    it("should return a calendar by id", async () => {
        const calendarId = "calendarId";
        const calendar = { _id: calendarId, name: "Calendar1" };

        const findByIdMock = jest.fn().mockResolvedValue(calendar);
        calendarModel.findById = findByIdMock;

        const result = await calendarService.findCalendarById(calendarId);

        expect(findByIdMock).toHaveBeenCalledWith(calendarId);
        expect(result).toEqual(calendar);
    });

    it("should handle errors during fetching calendar", async () => {
        const calendarId = "calendarId";

        const findByIdMock = jest
            .fn()
            .mockRejectedValue(new Error("Error fetching calendar"));
        calendarModel.findById = findByIdMock;

        await expect(
            calendarService.findCalendarById(calendarId)
        ).rejects.toThrow("Error fetching calendar");
    });
});

describe("deleteCalendarById", () => {
    it("should delete a calendar by id", async () => {
        const calendarId = "calendarId";
        const deletedCalendar = { _id: calendarId, name: "Calendar1" };

        const findByIdAndDeleteMock = jest
            .fn()
            .mockResolvedValue(deletedCalendar);
        calendarModel.findByIdAndDelete = findByIdAndDeleteMock;

        const result = await calendarService.deleteCalendarById(calendarId);

        expect(findByIdAndDeleteMock).toHaveBeenCalledWith(calendarId);
        expect(result).toEqual(deletedCalendar);
    });

    it("should handle errors during deleting calendar", async () => {
        const calendarId = "calendarId";

        const findByIdAndDeleteMock = jest
            .fn()
            .mockRejectedValue(new Error("Error deleting calendar"));
        calendarModel.findByIdAndDelete = findByIdAndDeleteMock;

        await expect(
            calendarService.deleteCalendarById(calendarId)
        ).rejects.toThrow("Error deleting calendar");
    });
});
