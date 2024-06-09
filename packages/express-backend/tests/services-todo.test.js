import todoModel from "../todo-item.js";
import todoService from "../services.js";

jest.mock("../todo-item.js");

describe("getTodoItems", () => {
    it("should return todo items for a given due date and userId", async () => {
        const duedate = "2022-01-01";
        const userId = "userId";
        const todoItems = [
            { duedate: duedate, user: userId, task: "Task1" },
            { duedate: duedate, user: userId, task: "Task2" }
        ];

        const findMock = jest.fn().mockResolvedValue(todoItems);
        todoModel.find = findMock;

        const result = await todoService.getTodoItems(duedate, userId);

        expect(findMock).toHaveBeenCalledWith({
            duedate: duedate,
            user: userId
        });
        expect(result).toEqual(todoItems);
    });

    it("should handle errors during fetching todo items", async () => {
        const findMock = jest
            .fn()
            .mockRejectedValue(new Error("Error fetching todo items"));
        todoModel.find = findMock;

        await expect(todoService.getTodoItems()).rejects.toThrow(
            "Error fetching todo items"
        );
    });
});

describe("addTodoItem", () => {
    it("should add a new todo item", async () => {
        const item = { task: "Task1" };
        const savedItem = { ...item, _id: "itemId" };

        const saveMock = jest.fn().mockResolvedValue(savedItem);
        todoModel.mockImplementation(() => ({
            save: saveMock
        }));

        const result = await todoService.addTodoItem(item);

        expect(saveMock).toHaveBeenCalled();
        expect(result).toEqual(savedItem);
    });

    it("should handle errors during adding todo item", async () => {
        const item = { task: "Task1" };
        const saveMock = jest
            .fn()
            .mockRejectedValue(new Error("Error adding todo item"));

        todoModel.mockImplementation(() => ({
            save: saveMock
        }));

        await expect(todoService.addTodoItem(item)).rejects.toThrow(
            "Error adding todo item"
        );
    });
});

describe("editTodoItem", () => {
    it("should update a todo item by id", async () => {
        const itemId = "itemId";
        const updatedItem = { task: "Updated Task" };
        const updatedItemData = { ...updatedItem, _id: itemId };

        const findByIdAndUpdateMock = jest
            .fn()
            .mockResolvedValue(updatedItemData);
        todoModel.findByIdAndUpdate = findByIdAndUpdateMock;

        const result = await todoService.editTodoItem(itemId, updatedItem);

        expect(findByIdAndUpdateMock).toHaveBeenCalledWith(
            itemId,
            updatedItem,
            { new: true }
        );
        expect(result).toEqual(updatedItemData);
    });

    it("should handle errors during updating todo item", async () => {
        const itemId = "itemId";
        const updatedItem = { task: "Updated Task" };

        const findByIdAndUpdateMock = jest
            .fn()
            .mockRejectedValue(new Error("Error updating todo item"));
        todoModel.findByIdAndUpdate = findByIdAndUpdateMock;

        await expect(
            todoService.editTodoItem(itemId, updatedItem)
        ).rejects.toThrow("Error updating todo item");
    });
});

describe("findTodoItemById", () => {
    it("should return a todo item by id", async () => {
        const itemId = "itemId";
        const item = { _id: itemId, task: "Task1" };

        const findByIdMock = jest.fn().mockResolvedValue(item);
        todoModel.findById = findByIdMock;

        const result = await todoService.findTodoItemById(itemId);

        expect(findByIdMock).toHaveBeenCalledWith(itemId);
        expect(result).toEqual(item);
    });

    it("should handle errors during fetching todo item", async () => {
        const itemId = "itemId";

        const findByIdMock = jest
            .fn()
            .mockRejectedValue(new Error("Error fetching todo item"));
        todoModel.findById = findByIdMock;

        await expect(todoService.findTodoItemById(itemId)).rejects.toThrow(
            "Error fetching todo item"
        );
    });
});

describe("deleteTodoItemById", () => {
    it("should delete a todo item by id", async () => {
        const itemId = "itemId";
        const deletedItem = { _id: itemId, task: "Task1" };

        const findByIdAndDeleteMock = jest.fn().mockResolvedValue(deletedItem);
        todoModel.findByIdAndDelete = findByIdAndDeleteMock;

        const result = await todoService.deleteTodoItemById(itemId);

        expect(findByIdAndDeleteMock).toHaveBeenCalledWith(itemId);
        expect(result).toEqual(deletedItem);
    });

    it("should handle errors during deleting todo item", async () => {
        const itemId = "itemId";

        const findByIdAndDeleteMock = jest
            .fn()
            .mockRejectedValue(new Error("Error deleting todo item"));
        todoModel.findByIdAndDelete = findByIdAndDeleteMock;

        await expect(todoService.deleteTodoItemById(itemId)).rejects.toThrow(
            "Error deleting todo item"
        );
    });
});
