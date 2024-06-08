import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import ToDo from '../pages/ToDo';

describe('ToDo Component', () => {
    test('renders ToDo component', async () => {
        render(
            <MemoryRouter>
                <ToDo />
            </MemoryRouter>
        );
        // Verify that the ToDo component renders correctly
        expect(screen.getByText('Contents')).toBeInTheDocument();
        expect(screen.getByText('Add Todo')).toBeInTheDocument();
        // Add more assertions as needed
    });

    // Add more tests for specific functionality
});
