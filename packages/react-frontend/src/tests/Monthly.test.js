import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import Monthly from '../pages/Monthly';

const mockFetchUser = jest.fn();
const mockPutUser = jest.fn();
const mockSetUser = jest.fn();
const mockSetMessage = jest.fn();

const user = {
    userId: '123',
    bold: false,
    default_view: 'Monthly',
    language: 'en',
    secret_setting1: true,
    secret_setting2: false
};

// Mock user data and functions

describe('Monthly Component', () => {
    test('renders Monthly component with initial features', async () => {
        // Render the Monthly component wrapped in Router
        render(
            <Router>
                <Monthly
                    fetchUser={mockFetchUser}
                    putUser={mockPutUser}
                    setUser={mockSetUser}
                    setMessage={mockSetMessage}
                    user={user}
                    userId="123"
                />
            </Router>
        );

        // Verify that the Monthly component renders correctly
        expect(screen.getByText('June 2024')).toBeInTheDocument();
    });
});
