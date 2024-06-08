// __tests__/todo-services.test.js

import Service from '../services.js';
import todoModel from '../todo-item.js';

// Mocking the todoModel.save() method
jest.mock('../todo-item', () => ({
  save: jest.fn(),
}));

describe('Todo Services', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock usage data after each test
  });

  describe('addTodoItem', () => {
    it('should add a new todo item', async () => {
      const mockItem = {
        duedate: new Date(),
        contents: 'Test todo item',
        checked: false,
        user: 'mockUserId',
      };

      const expectedResult = { ...mockItem, user: 'mockTodoId' };
      todoModel.save.mockResolvedValue(expectedResult);

      const result = await Service.addTodoItem(mockItem);

      expect(result).toEqual(expectedResult);
      expect(todoModel.save).toHaveBeenCalledWith(mockItem);
    });
  });
/*
  describe('getTodoItems', () => {
    it('should get todo items with given criteria', async () => {
      const mockItems = [
        { _id: '1', duedate: new Date(), contents: 'Todo 1', user: 'mockUserId' },
        { _id: '2', duedate: new Date(), contents: 'Todo 2', user: 'mockUserId' },
      ];

      const expectedQuery = { user: 'mockUserId' };
      todoModel.find.mockResolvedValue(mockItems);

      const result = await todoServices.getTodoItems(null, 'mockUserId');

      expect(result).toEqual(mockItems);
      expect(todoModel.find).toHaveBeenCalledWith(expectedQuery);
    });

    it('should get todo items filtered by duedate and user', async () => {
      const mockItems = [
        { _id: '1', duedate: new Date(), contents: 'Todo 1', user: 'mockUserId' },
      ];

      const expectedQuery = { duedate: { $gte: new Date('2024-06-08'), $lt: new Date('2024-06-09') }, user: 'mockUserId' };
      todoModel.find.mockResolvedValue(mockItems);

      const result = await todoServices.getTodoItems(new Date('2024-06-08'), 'mockUserId');

      expect(result).toEqual(mockItems);
      expect(todoModel.find).toHaveBeenCalledWith(expectedQuery);
    });
  });*/
});
