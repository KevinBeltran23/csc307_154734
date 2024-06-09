import eventModel from "../event.js";
import eventService from "../services.js";

jest.mock("../event.js");

describe("getEvents", () => {
    it("should return events based on start, calendar, and userId", async () => {
        const start = new Date();
        const calendar = "calendarId";
        const userId = "userId";
        const events = [
            { id: 1, name: "event1" },
            { id: 2, name: "event2" }
        ];

        const findMock = jest.fn().mockResolvedValue(events);
        eventModel.find = findMock;

        const result = await eventService.getEvents(start, calendar, userId);

        expect(findMock).toHaveBeenCalledWith({
            start,
            calendar,
            user: userId
        });
        expect(result).toEqual(events);
    });

    it("should return events based on start", async () => {
        const start = new Date();
        const events = [
            { id: 1, name: "event1" },
            { id: 2, name: "event2" }
        ];

        const findMock = jest.fn().mockResolvedValue(events);
        eventModel.find = findMock;

        const result = await eventService.getEvents(start);

        expect(findMock).toHaveBeenCalledWith({ start });
        expect(result).toEqual(events);
    });

    it("should return events based on calendar", async () => {
        const calendar = "calendarId";
        const events = [
            { id: 1, name: "event1" },
            { id: 2, name: "event2" }
        ];

        const findMock = jest.fn().mockResolvedValue(events);
        eventModel.find = findMock;

        const result = await eventService.getEvents(undefined, calendar);

        expect(findMock).toHaveBeenCalledWith({ calendar });
        expect(result).toEqual(events);
    });

    it("should return events based on userId", async () => {
        const userId = "userId";
        const events = [
            { id: 1, name: "event1" },
            { id: 2, name: "event2" }
        ];

        const findMock = jest.fn().mockResolvedValue(events);
        eventModel.find = findMock;

        const result = await eventService.getEvents(
            undefined,
            undefined,
            userId
        );

        expect(findMock).toHaveBeenCalledWith({ user: userId });
        expect(result).toEqual(events);
    });

    it("should handle errors during fetching events", async () => {
        const findMock = jest
            .fn()
            .mockRejectedValue(new Error("Error fetching events"));
        eventModel.find = findMock;

        await expect(eventService.getEvents()).rejects.toThrow(
            "Error fetching events"
        );
    });
});

describe("addEvent", () => {
    it("should add a new event", async () => {
        const event = {
            name: "event1",
            start: new Date(),
            calendar: "calendarId",
            user: "userId"
        };
        const savedEvent = { ...event, id: "eventId" };

        const saveMock = jest.fn().mockResolvedValue(savedEvent);
        eventModel.mockImplementation(() => ({
            save: saveMock
        }));

        const result = await eventService.addEvent(event);

        expect(saveMock).toHaveBeenCalled();
        expect(result).toEqual(savedEvent);
    });

    it("should handle errors during adding event", async () => {
        const event = {
            name: "event1",
            start: new Date(),
            calendar: "calendarId",
            user: "userId"
        };
        const saveMock = jest
            .fn()
            .mockRejectedValue(new Error("Error adding event"));

        eventModel.mockImplementation(() => ({
            save: saveMock
        }));

        await expect(eventService.addEvent(event)).rejects.toThrow(
            "Error adding event"
        );
    });
});

describe("editEvent", () => {
    it("should update an event by id", async () => {
        const eventId = "eventId";
        const updatedEvent = { name: "updatedEvent" };
        const updatedEventData = { ...updatedEvent, id: eventId };

        const findByIdAndUpdateMock = jest
            .fn()
            .mockResolvedValue(updatedEventData);
        eventModel.findByIdAndUpdate = findByIdAndUpdateMock;

        const result = await eventService.editEvent(eventId, updatedEvent);

        expect(findByIdAndUpdateMock).toHaveBeenCalledWith(
            eventId,
            updatedEvent,
            { new: true }
        );
        expect(result).toEqual(updatedEventData);
    });

    it("should handle errors during updating event", async () => {
        const eventId = "eventId";
        const updatedEvent = { name: "updatedEvent" };

        const findByIdAndUpdateMock = jest
            .fn()
            .mockRejectedValue(new Error("Error updating event"));
        eventModel.findByIdAndUpdate = findByIdAndUpdateMock;

        await expect(
            eventService.editEvent(eventId, updatedEvent)
        ).rejects.toThrow("Error updating event");
    });
});

describe("findEventById", () => {
    it("should return an event by id", async () => {
        const eventId = "eventId";
        const event = { id: eventId, name: "event1" };

        const findByIdMock = jest.fn().mockResolvedValue(event);
        eventModel.findById = findByIdMock;

        const result = await eventService.findEventById(eventId);

        expect(findByIdMock).toHaveBeenCalledWith(eventId);
        expect(result).toEqual(event);
    });

    it("should handle errors during fetching event", async () => {
        const eventId = "eventId";

        const findByIdMock = jest
            .fn()
            .mockRejectedValue(new Error("Error fetching event"));
        eventModel.findById = findByIdMock;

        await expect(eventService.findEventById(eventId)).rejects.toThrow(
            "Error fetching event"
        );
    });
});

describe("deleteEventById", () => {
    it("should delete an event by id", async () => {
        const eventId = "eventId";
        const deletedEvent = { id: eventId, name: "event1" };

        const findByIdAndDeleteMock = jest.fn().mockResolvedValue(deletedEvent);
        eventModel.findByIdAndDelete = findByIdAndDeleteMock;

        const result = await eventService.deleteEventById(eventId);

        expect(findByIdAndDeleteMock).toHaveBeenCalledWith(eventId);
        expect(result).toEqual(deletedEvent);
    });

    it("should handle errors during deleting event", async () => {
        const eventId = "eventId";

        const findByIdAndDeleteMock = jest
            .fn()
            .mockRejectedValue(new Error("Error deleting event"));
        eventModel.findByIdAndDelete = findByIdAndDeleteMock;

        await expect(eventService.deleteEventById(eventId)).rejects.toThrow(
            "Error deleting event"
        );
    });
});
