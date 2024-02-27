import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import {BrowserRouter} from "react-router-dom";
import App from "../../App";


test('testLoginRender', async () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    const title = screen.getByText(/Welcome to your garden/i);
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const loginButton = screen.getByText('Log in');
    const linkToRegister = screen.getByText(/Create account/i);


    expect(title).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(linkToRegister).toBeInTheDocument();
});

test('testLoginRedirectionToRegister', async () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    const linkToRegister = screen.getByText(/Create account/i);
    fireEvent.click(linkToRegister);

    expect(window.location.pathname).toBe('/register');
});


test('login with valid credentials', async () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const loginButton = screen.getByText('Log in');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } }); //TODO: CHANGE TO VALID CREDENTIALS
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
        expect(sessionStorage.getItem('userId')).not.toBeNull();
        expect(window.location.pathname).toBe('/dashboard');
    });
});

test('Login with invalid login', async () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const loginButton = screen.getByText('Log in');

    fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'invalidpassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
        const alertElement = screen.getByText(/'Login failed:  Invalid email or password.'/i);
        expect(alertElement).toBeInTheDocument();
    });
});


test('displays network error message when unable to connect to server', async () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const loginButton = screen.getByText('Log in');

    // Mocking the fetch function to simulate network error
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Network Error'));

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
        const alertElement = screen.getByText('Network error: Failed to fetch');
        expect(alertElement).toBeInTheDocument();
    });

    // Restore the original fetch function
    global.fetch.mockRestore();
});


