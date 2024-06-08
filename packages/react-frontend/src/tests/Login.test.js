import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import Login from '../pages/Login';

mockHandleSubmit = jest.fn();

describe('Login Component', () => {

    test('renders Login component', async () => {
        // render the login component
        render(
            <MemoryRouter>
                <Login

                />
            </MemoryRouter>
        );

        // Verify that the Login component renders correctly
        expect(screen.getByText('Username')).toBeInTheDocument();
        expect(screen.getByText('Password')).toBeInTheDocument();
        expect(screen.getByText('Poly Planner')).toBeInTheDocument();
        expect(screen.getByText('Create Account')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
    });
});
