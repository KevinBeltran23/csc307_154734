import React from 'react';
import { render, screen, userEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import Login from '../pages/Login';

const mockFetchUser = jest.fn();
const mockPutUser = jest.fn();
const mockSetUser = jest.fn();
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

beforeEach(() => {
    mockFetchUser.mockResolvedValue({
        json: jest.fn().mockResolvedValue({
            result: user
        })
    });
});

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

    test('updates username value when input changes', async () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const usernameInput = screen.getByRole('textbox', { name: /username/i });

        await userEvent.type(usernameInput, 'testuser');

        expect(usernameInput.value).toBe('testuser');
    });
});
