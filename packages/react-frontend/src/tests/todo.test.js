// ToDo.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import ToDo from '../pages/ToDo'; // Adjust the path as necessary

const mockFetchItems = jest.fn();
const mockSetItems = jest.fn();
const mockPostItem = jest.fn();
const mockPutItem = jest.fn();
const mockDeleteItem = jest.fn();
const mockLogout = jest.fn();

const props = {
    userId: '123',
    items: [
        {
            _id: '1',
            duedate: '2023-06-01',
            contents: 'Test Todo 1',
            checked: false,
            user: '123'
        },
        {
            _id: '2',
            duedate: '2023-06-02',
            contents: 'Test Todo 2',
            checked: true,
            user: '123'
        }
    ],
    fetchItems: mockFetchItems,
    setItems: mockSetItems,
    postItem: mockPostItem,
    putItem: mockPutItem,
    deleteItem: mockDeleteItem,
    logout: mockLogout
};

describe('ToDo Component', () => {
    test('renders ToDo component with initial items and text', async () => {
        // Wrap the ToDo component with MemoryRouter
        render(
            <MemoryRouter>
                <ToDo {...props} />
            </MemoryRouter>
        );

        // Check if the static texts are rendered
        expect(screen.getByText('Log Out')).toBeInTheDocument();
        expect(screen.getByText('Add Todo')).toBeInTheDocument();
        expect(screen.getByText('Weekly View')).toBeInTheDocument();
        expect(screen.getByText('Monthly View')).toBeInTheDocument();
        expect(screen.getByText('Contents')).toBeInTheDocument();
        expect(screen.getByText('Calendars')).toBeInTheDocument();
        expect(screen.getByText('To Do')).toBeInTheDocument();
        expect(screen.getByText('Create')).toBeInTheDocument();

        // Check if the todo items are rendered
        expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
        expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
        expect(screen.getByText('2023-06-01')).toBeInTheDocument();
        expect(screen.getByText('2023-06-02')).toBeInTheDocument();
    });
});
