import React from 'react';
import { render, screen, userEvent, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import Login from '../pages/Login';

const mockedOnChange = jest.fn();

const user = {
    username: "",
    pwd: "",
    language: "en",
    bold: false,
    default_view: 'Monthly',
    polytime: true,
    language: 'en',
    secret_setting1: true,
    secret_setting2: false
};

describe('Login Component', () => {
    test('renders Login component', async () => {
        // render the login component
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        // Verify that the Login component renders correctly
        expect(screen.getByText('Username')).toBeInTheDocument();
        expect(screen.getByText('Password')).toBeInTheDocument();
        expect(screen.getByText('Poly Planner')).toBeInTheDocument();
        expect(screen.getByText('Create Account')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
    });
/*
    test('submits login form with valid credentials', async () => {
        // render the login component
        render(
            <MemoryRouter>
                <Login handleSubmit={mockHandleSubmit} />
            </MemoryRouter>
        );

        // Simulate entering username and password
        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'testpassword' } });

        // Simulate clicking the login button
        fireEvent.click(screen.getByText('Login'));

        // Ensure that handleSubmit function is called with correct credentials
        await waitFor(() => {
            expect(mockHandleSubmit).toHaveBeenCalledWith({ username: 'testuser', pwd: 'testpassword' });
        });
    });*/
});
