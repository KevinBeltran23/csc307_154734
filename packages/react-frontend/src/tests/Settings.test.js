import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Settings from '../pages/Settings';

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

beforeEach(() => {
    mockFetchUser.mockResolvedValue({
        json: jest.fn().mockResolvedValue({
            result: user
        })
    });
});

describe('Settings Component', () => {
    test('renders Settings component with initial settings', async () => {
        // Render the Settings component
        render(
            <Settings
                fetchUser={mockFetchUser}
                putUser={mockPutUser}
                setUser={mockSetUser}
                setMessage={mockSetMessage}
                user={user}
                userId="123"
            />
        );

        // Verify that the Settings component renders correctly
        expect(screen.getByText('Settings')).toBeInTheDocument();
        expect(screen.getByText('Visual')).toBeInTheDocument();
        expect(screen.getByText('Account')).toBeInTheDocument();
        expect(screen.getByText('Language & Region')).toBeInTheDocument();
        expect(screen.getByText('Misc')).toBeInTheDocument();
    });


});
