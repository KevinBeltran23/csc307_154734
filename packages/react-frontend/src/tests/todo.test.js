// ToDo.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // Import userEvent for simulating user interactions
import { MemoryRouter } from 'react-router-dom';
import ToDo from '../pages/ToDo'; // Adjust the path as necessary
import Dropdown from '../pages/Dropdown';
import Popup from '../pages/Popup';


const mockFetchItems = jest.fn().mockResolvedValue([]);
const mockSetItems = jest.fn();
const mockPostItem = jest.fn().mockResolvedValue({});
const mockPutItem = jest.fn().mockResolvedValue({});
const mockDeleteItem = jest.fn().mockResolvedValue({});
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

        // Simulate clicking on the "Add Todo" button to open the dropdown
        fireEvent.click(screen.getByText('Add Todo'));

        // Check if the dropdown options are rendered
        expect(screen.getByText('Event')).toBeInTheDocument();
        expect(screen.getByText('Calendar')).toBeInTheDocument();
        expect(screen.getByText('To Do Item')).toBeInTheDocument();
        expect(screen.getByText('Class')).toBeInTheDocument();

        // Simulate selecting "To Do Item" from the dropdown
        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'To Do Item' } });

        // Check if the input fields for creating a to-do item are rendered
        expect(screen.getByLabelText('Due Date')).toBeInTheDocument();
        expect(screen.getByLabelText('Contents')).toBeInTheDocument();

        // Simulate typing in the input fields
        userEvent.type(screen.getByLabelText('Due Date'), '2023-06-03');
        userEvent.type(screen.getByLabelText('Contents'), 'New Todo Item');

        // Simulate submitting the form
        fireEvent.submit(screen.getByRole('form'));

        // Check if the correct function is called with the correct arguments
        expect(mockPostItem).toHaveBeenCalledWith({
            duedate: '2023-06-03',
            contents: 'New Todo Item',
            checked: false,
            user: '123'
        });
    });
});
