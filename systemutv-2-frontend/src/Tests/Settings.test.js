import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {BrowserRouter} from "react-router-dom";
import Settings from "../Pages/Settings/Settings";
import '@testing-library/jest-dom';
import {act} from "react-dom/test-utils";

/*
Tests rendering of Settings.js
Requirements ID: F.UI.8
 */
test('test settings render', async () => {
    // This is necessary because we are updating the state.
    await act( async () => {
        render(
          <BrowserRouter>
              <Settings/>
          </BrowserRouter>
        );
    });

    const name = screen.getByText('Your name');
    const logoutButton = screen.getByText('Log out');
    const notifications = screen.getByText('Notifications on');
    const facts = screen.getByText('Facts on');
    const deleteButton = screen.getByText('Delete account');

    expect(name).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
    expect(notifications).toBeInTheDocument();
    expect(facts).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    const deleteAccount = screen.getByText(/Delete account/i);
    fireEvent.click(deleteAccount);

    const sure = screen.getByText('Are you sure?');
    const sureInput = screen.getByPlaceholderText('Enter your password to confirm');
    const deleteAcc = screen.getByText('Delete Account');
    const changedMind = screen.getByText('Changed your mind?');
    const close = screen.getByText(/Close/i);

    expect(sure).toBeInTheDocument();
    expect(sureInput).toBeInTheDocument();
    expect(deleteAcc).toBeInTheDocument();
    expect(changedMind).toBeInTheDocument();
    expect(close).toBeInTheDocument();
});

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate,
}));

// Mock fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ isNotificationsActivated: true, funFactsActivated: true }),
    })
);

beforeEach(() => {
    sessionStorage.clear();
});

describe('Settings Component', () => {
    test('renders and fetches user data correctly', async () => {
        sessionStorage.setItem('userId', 'testUserId');

        render(
          <BrowserRouter>
              <Settings/>
          </BrowserRouter>
        );

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
        });

        expect(screen.getByText('Log out')).toBeInTheDocument();
        expect(screen.getByText('Notifications on')).toBeInTheDocument();
        expect(screen.getByText('Facts on')).toBeInTheDocument();
    });


    test('toggle notifications functionality', async () => {
        sessionStorage.setItem('userId', 'testUserId');
        sessionStorage.setItem('notifications', 'true');

        // This is necessary because we are updating the state.
        await act( async () => {
            render(
              <BrowserRouter>
                  <Settings/>
              </BrowserRouter>
            );
        });

        const notificationsButton = screen.getByText('Notifications off');
        fireEvent.click(notificationsButton);

        await waitFor(() => {
            expect(notificationsButton).toHaveTextContent('Notifications off');
        });
    });


    test('toggle facts functionality', async () => {
        sessionStorage.setItem('userId', 'testUserId');
        sessionStorage.setItem('funFacts', 'true');

        // This is necessary because we are updating the state.
        await act( async () => {
            render(
              <BrowserRouter>
                  <Settings/>
              </BrowserRouter>
            );
        });

        const factsButton = screen.getByText('Facts off');
        fireEvent.click(factsButton);

        await waitFor(() => {
            expect(factsButton).toHaveTextContent('Facts off');
        });
    });


    test('navigates user on logout', async () => {
        // This is necessary because we are updating the state.
        await act(async () => {
            render(
              <BrowserRouter>
                  <Settings/>
              </BrowserRouter>
            );
        });

        fireEvent.click(screen.getByText('Log out'));

        expect(mockedNavigate).toHaveBeenCalledWith('/');
    });
});



