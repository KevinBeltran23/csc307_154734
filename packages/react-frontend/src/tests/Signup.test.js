import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import SignUp from '../pages/SignUp';

const mockSetMessage = jest.fn();

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


describe('SignUp component', () => {
    test('renders Signup component with initial Login', async () => {
        // Render the Signup component
        render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
        );

        // Verify that the Login component renders correctly
        expect(screen.getByText('Poly Planner')).toBeInTheDocument();
        expect(screen.getByText('Username')).toBeInTheDocument();
        expect(screen.getByText('Password')).toBeInTheDocument();
        expect(screen.getByText('Confirm Password')).toBeInTheDocument();
        expect(screen.getByText('Sign Up')).toBeInTheDocument();
        expect(screen.getByText('Return To Login')).toBeInTheDocument();
    });
});
