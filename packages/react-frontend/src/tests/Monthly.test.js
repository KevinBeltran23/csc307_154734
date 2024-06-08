// Import necessary libraries
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Monthly from '../pages/Monthly';

// Mock functions
const mockFetchUser = jest.fn();
const mockPutUser = jest.fn().mockResolvedValue({});
const mockSetUser = jest.fn();
const mockSetMessage = jest.fn();

// Mock user data
const user = {
    userId: '123',
    bold: false,
    default_view: 'Monthly',
    language: 'en',
    secret_setting1: true,
    secret_setting2: false
};

// Mock calendars data
const calendars = [
    { name: 'Calendar 1' },
    { name: 'Calendar 2' }
];

describe('Monthly component', () => {
    test('renders Monthly component with initial Login', async () => {
        // Render the Monthly component with mock props
        render(
            <MemoryRouter>
                <Monthly
                    fetchUser={mockFetchUser}
                    putUser={mockPutUser}
                    setUser={mockSetUser}
                    setMessage={mockSetMessage}
                    user={user}
                    calendars={calendars}
                />
            </MemoryRouter>
        );

        // Verify that the component renders correctly
        expect(screen.getByText('June 2024')).toBeInTheDocument();
    });
});
