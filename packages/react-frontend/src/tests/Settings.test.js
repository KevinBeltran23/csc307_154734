import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Settings from '../pages/Settings'; // Update this path if necessary

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
  test('renders Settings component', () => {
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

    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Visual')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByText('Language & Region')).toBeInTheDocument();
    expect(screen.getByText('Misc')).toBeInTheDocument();
  });

  // Additional tests...
});


// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import Settings from '../pages/Settings'; // Update this path if necessary

// const mockFetchUser = jest.fn();
// const mockPutUser = jest.fn();
// const mockSetUser = jest.fn();
// const mockSetMessage = jest.fn();

// const user = {
//   userId: '123',
//   bold: false,
//   default_view: 'Monthly',
//   language: 'en',
//   secret_setting1: true,
//   secret_setting2: false
// };

// beforeEach(() => {
//   mockFetchUser.mockResolvedValue({
//     json: jest.fn().mockResolvedValue({
//       result: user
//     })
//   });
// });

// describe('Settings Component', () => {
//   test('renders Settings component', () => {
//     render(
//       <Settings
//         fetchUser={mockFetchUser}
//         putUser={mockPutUser}
//         setUser={mockSetUser}
//         setMessage={mockSetMessage}
//         user={user}
//         userId="123"
//       />
//     );

//     expect(screen.getByText('Settings')).toBeInTheDocument();
//     expect(screen.getByText('Visual')).toBeInTheDocument();
//     expect(screen.getByText('Account')).toBeInTheDocument();
//     expect(screen.getByText('Language & Region')).toBeInTheDocument();
//     expect(screen.getByText('Misc')).toBeInTheDocument();
//   });

//   test('fetches and sets user data on mount', async () => {
//     render(
//       <Settings
//         fetchUser={mockFetchUser}
//         putUser={mockPutUser}
//         setUser={mockSetUser}
//         setMessage={mockSetMessage}
//         user={user}
//         userId="123"
//       />
//     );

//     expect(mockFetchUser).toHaveBeenCalledWith('123');
//     expect(await screen.findByText('default_view:')).toBeInTheDocument();
//   });

//   test('handles section switching', () => {
//     render(
//       <Settings
//         fetchUser={mockFetchUser}
//         putUser={mockPutUser}
//         setUser={mockSetUser}
//         setMessage={mockSetMessage}
//         user={user}
//         userId="123"
//       />
//     );

//     fireEvent.click(screen.getByText('Account'));
//     expect(screen.getByLabelText('New Username:')).toBeInTheDocument();

//     fireEvent.click(screen.getByText('Visual'));
//     expect(screen.getByText('default_view:')).toBeInTheDocument();
//   });

//   test('toggles bold setting', () => {
//     const updatedUser = { ...user, bold: true };

//     mockPutUser.mockResolvedValue(updatedUser);

//     render(
//       <Settings
//         fetchUser={mockFetchUser}
//         putUser={mockPutUser}
//         setUser={mockSetUser}
//         setMessage={mockSetMessage}
//         user={user}
//         userId="123"
//       />
//     );

//     fireEvent.click(screen.getByLabelText('bold'));
//     expect(mockPutUser).toHaveBeenCalledWith('123', updatedUser);
//   });

//   test('changes default view', () => {
//     const updatedUser = { ...user, default_view: 'Weekly' };

//     mockPutUser.mockResolvedValue(updatedUser);

//     render(
//       <Settings
//         fetchUser={mockFetchUser}
//         putUser={mockPutUser}
//         setUser={mockSetUser}
//         setMessage={mockSetMessage}
//         user={user}
//         userId="123"
//       />
//     );

//     fireEvent.change(screen.getByDisplayValue('Monthly'), {
//       target: { value: 'Weekly' }
//     });
//     expect(mockPutUser).toHaveBeenCalledWith('123', updatedUser);
//   });

//   test('handles language change', () => {
//     const updatedUser = { ...user, language: 'es' };

//     mockPutUser.mockResolvedValue(updatedUser);

//     render(
//       <Settings
//         fetchUser={mockFetchUser}
//         putUser={mockPutUser}
//         setUser={mockSetUser}
//         setMessage={mockSetMessage}
//         user={user}
//         userId="123"
//       />
//     );

//     fireEvent.change(screen.getByDisplayValue('English'), {
//       target: { value: 'es' }
//     });
//     expect(mockPutUser).toHaveBeenCalledWith('123', updatedUser);
//   });

//   test('handles username change', () => {
//     const updatedUser = { ...user, username: 'newUsername' };

//     mockPutUser.mockResolvedValue(updatedUser);

//     render(
//       <Settings
//         fetchUser={mockFetchUser}
//         putUser={mockPutUser}
//         setUser={mockSetUser}
//         setMessage={mockSetMessage}
//         user={user}
//         userId="123"
//       />
//     );

//     fireEvent.change(screen.getByPlaceholderText('New Username'), {
//       target: { value: 'newUsername' }
//     });
//     fireEvent.click(screen.getByText('Change Username'));
//     expect(mockPutUser).toHaveBeenCalledWith('123', updatedUser);
//   });
// });
