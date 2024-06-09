import classModel from "../class.js";
import classService from "../services.js";

jest.mock("../class.js");

describe("getClasses", () => {
    it("should return classes for given start, calendar, and userId", async () => {
        const start = "2022-01-01";
        const calendar = "calendarId";
        const userId = "userId";
        const classes = [
            { start, calendar, user: userId, name: "Class1" },
            { start, calendar, user: userId, name: "Class2" }
        ];

        const findMock = jest.fn().mockResolvedValue(classes);
        classModel.find = findMock;

        const result = await classService.getClasses(start, calendar, userId);

        expect(findMock).toHaveBeenCalledWith({
            start,
            calendar,
            user: userId
        });
        expect(result).toEqual(classes);
    });

    it("should handle errors during fetching classes", async () => {
        const findMock = jest
            .fn()
            .mockRejectedValue(new Error("Error fetching classes"));
        classModel.find = findMock;

        await expect(classService.getClasses()).rejects.toThrow(
            "Error fetching classes"
        );
    });
});

describe("addClass", () => {
    it("should add a new class", async () => {
        const event = { name: "Class1" };
        const savedClass = { ...event, _id: "classId" };

        const saveMock = jest.fn().mockResolvedValue(savedClass);
        classModel.mockImplementation(() => ({
            save: saveMock
        }));

        const result = await classService.addClass(event);

        expect(saveMock).toHaveBeenCalled();
        expect(result).toEqual(savedClass);
    });

    it("should handle errors during adding class", async () => {
        const event = { name: "Class1" };
        const saveMock = jest
            .fn()
            .mockRejectedValue(new Error("Error adding class"));

        classModel.mockImplementation(() => ({
            save: saveMock
        }));

        await expect(classService.addClass(event)).rejects.toThrow(
            "Error adding class"
        );
    });
});

describe("editClass", () => {
    it("should update a class by id", async () => {
        const classId = "classId";
        const updatedClass = { name: "Updated Class" };
        const updatedClassData = { ...updatedClass, _id: classId };

        const findByIdAndUpdateMock = jest
            .fn()
            .mockResolvedValue(updatedClassData);
        classModel.findByIdAndUpdate = findByIdAndUpdateMock;

        const result = await classService.editClass(classId, updatedClass);

        expect(findByIdAndUpdateMock).toHaveBeenCalledWith(
            classId,
            updatedClass,
            { new: true }
        );
        expect(result).toEqual(updatedClassData);
    });

    it("should handle errors during updating class", async () => {
        const classId = "classId";
        const updatedClass = { name: "Updated Class" };

        const findByIdAndUpdateMock = jest
            .fn()
            .mockRejectedValue(new Error("Error updating class"));
        classModel.findByIdAndUpdate = findByIdAndUpdateMock;

        await expect(
            classService.editClass(classId, updatedClass)
        ).rejects.toThrow("Error updating class");
    });
});

describe("findClassById", () => {
    it("should return a class by id", async () => {
        const classId = "classId";
        const classObj = { _id: classId, name: "Class1" };

        const findByIdMock = jest.fn().mockResolvedValue(classObj);
        classModel.findById = findByIdMock;

        const result = await classService.findClassById(classId);

        expect(findByIdMock).toHaveBeenCalledWith(classId);
        expect(result).toEqual(classObj);
    });

    it("should handle errors during fetching class", async () => {
        const classId = "classId";

        const findByIdMock = jest
            .fn()
            .mockRejectedValue(new Error("Error fetching class"));
        classModel.findById = findByIdMock;

        await expect(classService.findClassById(classId)).rejects.toThrow(
            "Error fetching class"
        );
    });
});

describe("deleteClassById", () => {
    it("should delete a class by id", async () => {
        const classId = "classId";
        const deletedClass = { _id: classId, name: "Class1" };

        const findByIdAndDeleteMock = jest.fn().mockResolvedValue(deletedClass);
        classModel.findByIdAndDelete = findByIdAndDeleteMock;

        const result = await classService.deleteClassById(classId);

        expect(findByIdAndDeleteMock).toHaveBeenCalledWith(classId);
        expect(result).toEqual(deletedClass);
    });

    it("should handle errors during deleting class", async () => {
        const classId = "classId";

        const findByIdAndDeleteMock = jest
            .fn()
            .mockRejectedValue(new Error("Error deleting class"));
        classModel.findByIdAndDelete = findByIdAndDeleteMock;

        await expect(classService.deleteClassById(classId)).rejects.toThrow(
            "Error deleting class"
        );
    });
});
