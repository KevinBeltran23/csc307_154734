// __tests__/services.test.js

import Service from '../services'; // Adjust the path as per your project structure
import mongoose from 'mongoose';

// Mocked database operations
const mockedDatabase = {
  users: [],
  events: [],
  calendars: [],
  classes: [],
  todoItems: [],
};

// Mock the mongoose model methods
const mockModelMethods = {
  find: jest.fn().mockImplementation((query) => {
    if (query.user) {
      return mockedDatabase[query.user];
    } else {
      return [];
    }
  }),
  findById: jest.fn().mockImplementation((id) => {
    return mockedDatabase.find((item) => item.id === id);
  }),
  save: jest.fn().mockImplementation((item) => {
    mockedDatabase[item.constructor.modelName.toLowerCase()].push(item);
    return item;
  }),
  findByIdAndUpdate: jest.fn().mockImplementation((id, updatedItem) => {
    const index = mockedDatabase.findIndex((item) => item.id === id);
    if (index !== -1) {
      mockedDatabase[index] = updatedItem;
    }
    return updatedItem;
  }),
  findByIdAndDelete: jest.fn().mockImplementation((id) => {
    const index = mockedDatabase.findIndex((item) => item.id === id);
    if (index !== -1) {
      const deletedItem = mockedDatabase.splice(index, 1);
      return deletedItem;
    }
  }),
};

// Mock the mongoose model
const mockModel = {
  model: jest.fn().mockReturnValue(mockModelMethods),
};

// Mock mongoose module
jest.mock('mongoose', () => ({
  model: jest.fn().mockReturnValue(mockModel),
}));

describe('Services', () => {
  // Test case for addUser service function
  it('should add a new user', async () => {
    const mockUser = {
        username: 'testuser',
        password: 'password123',
        language: 'en',
        bold: true,
        default_view: 'monthly',
        polytime: false,
        secret_setting1: true,
        secret_setting2: false,
      };

    // Call the addUser service function
    const addedUser = await Service.addUser(mockUser);

    // Assert that the user is added successfully
    expect(addedUser).toEqual(expect.objectContaining(mockUser));
  });

  // Add more test cases for other service functions as needed
});
