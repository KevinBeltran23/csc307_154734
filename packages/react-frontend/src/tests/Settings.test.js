import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Settings from '../pages/Settings';

const mockFetchUser = jest.fn();
const mockPutUser = jest.fn().mockResolvedValue({});
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

    test('Visual settings', async () => {
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
    
        // Simulate a click on the Visual section
        fireEvent.click(screen.getByText('Visual'));
    
        // Simulate a click on the 'polytime' checkbox
        fireEvent.click(screen.getByText('polytime'));
    
        // Ensure that the putUser function is called with updated user data
        await waitFor(() => {
            expect(mockPutUser).toHaveBeenCalledWith('123', { ...user, polytime: true });
        });
    
        // Simulate a change in the default view setting
        fireEvent.change(screen.getByLabelText('default_view:'), { target: { value: 'Weekly' } });
    
        // Ensure that the putUser function is called with updated user data
        await waitFor(() => {
            expect(mockPutUser).toHaveBeenCalledWith('123', { ...user, default_view: 'Weekly' });
        });
    });
    
    
    test('selects language from dropdown', async () => {
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
    
        // Simulate a click on the "Language & Region" button
        fireEvent.click(screen.getByText('Language & Region'));
    
        // Simulate a change in the language setting
        fireEvent.change(screen.getByLabelText('language:'), { target: { value: 'es' } });
    
        // Ensure that the putUser function is called with updated user data
        await waitFor(() => {
            expect(mockPutUser).toHaveBeenCalledWith('123', { ...user, language: 'es' });
        });
    });

    test('changes username', async () => {
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
    
        // Simulate a click on the "Account" button
        fireEvent.click(screen.getByText('Account'));
    
        // Ensure that the "New Username:" text and input field are rendered
        expect(screen.getByText('New Username:')).toBeInTheDocument();
        
        // Find the input field by its class name
        const usernameInput = screen.getByDisplayValue('');
    
        // Simulate entering a new username in the input field
        fireEvent.change(usernameInput, { target: { value: 'newusername' } });
    
        // Simulate clicking the "Change Username" button
        fireEvent.click(screen.getByText('Change Username'));
    
        // Ensure that the putUser function is called with updated user data
        await waitFor(() => {
            expect(mockPutUser).toHaveBeenCalledWith('123', { ...user, username: 'newusername' });
        });

        // Simulate an error in the API call
        const errorMessage = 'Error updating username';
        mockPutUser.mockRejectedValue(new Error(errorMessage));

        // Simulate clicking the "Change Username" button again
        fireEvent.click(screen.getByText('Change Username'));

        // Ensure that the error message is displayed
        await waitFor(() => {
            expect(mockSetMessage).toHaveBeenCalledWith(`Update Error: ${errorMessage}`);
        });
    });
    
    
    

});
