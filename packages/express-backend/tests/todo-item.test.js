// __tests__/todo-model.test.js

import ToDo from '../todo-item'; // Adjust the path as per your project structure
import mongoose from 'mongoose';

describe('ToDo Model', () => {
  // Test case to check if the model can be instantiated
  it('should create a new ToDo model', () => {
    // Create a mock ToDo object
    const mockToDo = {
      duedate: new Date(),
      contents: 'Test ToDo item',
      checked: false,
      user: new mongoose.Types.ObjectId(), // Generate a new ObjectId for the user
    };

    // Attempt to create a new ToDo model instance
    const todoInstance = new ToDo(mockToDo);

    // Ensure that the instance is created successfully
    expect(todoInstance).toBeInstanceOf(ToDo);
    expect(todoInstance.duedate).toEqual(mockToDo.duedate);
    expect(todoInstance.contents).toEqual(mockToDo.contents);
    expect(todoInstance.checked).toEqual(mockToDo.checked);
    expect(todoInstance.user).toEqual(mockToDo.user);
  });
});
