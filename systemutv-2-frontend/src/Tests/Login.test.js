import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../Pages/Login/Login';
import {BrowserRouter} from "react-router-dom";

/*
Tests if Login.js renders properly
Requirements ID: F.UI.3
 */
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

/*
Test redirection to Register.js
 */
test('test redirection to register', async () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    const linkToRegister = screen.getByText(/Create account/i);
    fireEvent.click(linkToRegister);

    expect(window.location.pathname).toBe('/register');
});


/*
Test login function and redirection to Dashboard.js
Requirements ID: F.A.1
Requirements ID: F.SI.2
 */
test('login with valid credentials - redirection', async () => {
    render(
      <BrowserRouter>
          <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const loginButton = screen.getByText('Log in');

    // DONT FORGET TO CREATE THIS USER
    fireEvent.change(emailInput, { target: { value: 'example@example.org' } });
    fireEvent.change(passwordInput, { target: { value: 'example' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
        expect(window.location.pathname).toBe('/dashboard');
    });
});

/*
Test user token when logged in
Requirements ID: F.A.1
 */
test('login with valid credentials - user token', async () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const loginButton = screen.getByText('Log in');

    fireEvent.change(emailInput, { target: { value: 'example@example.org' } });
    fireEvent.change(passwordInput, { target: { value: 'example' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
        expect(sessionStorage.getItem('userId')).not.toBeNull();
    });
});

test('login with invalid credentials', async () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const loginButton = screen.getByText('Log in');

    fireEvent.change(emailInput, { target: { value: 'invalid@example.org' } });
    fireEvent.change(passwordInput, { target: { value: 'invalid' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
        const alertElement = screen.getByText('Login failed: Invalid email or password');
        expect(alertElement).toBeInTheDocument();
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

    fireEvent.change(emailInput, { target: { value: 'invalid@example.org' } });
    fireEvent.change(passwordInput, { target: { value: 'example' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
        const alertElement = screen.getByText('Login failed: Invalid email or password');
        expect(alertElement).toBeInTheDocument();
    });
});

test('Login with invalid password', async () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const loginButton = screen.getByText('Log in');

    fireEvent.change(emailInput, { target: { value: 'example@example.org' } });
    fireEvent.change(passwordInput, { target: { value: 'invalid' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
        const alertElement = screen.getByText('Login failed: Invalid email or password'); //todo: fix alert
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

    fireEvent.change(emailInput, { target: { value: 'example@example.org' } });
    fireEvent.change(passwordInput, { target: { value: 'example' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
        const alertElement = screen.getByText('Failed to fetch');
        expect(alertElement).toBeInTheDocument();
    });

    // Restore the original fetch function
    global.fetch.mockRestore();
});

test('displays network error message when no network connection', async () => {
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

    fireEvent.change(emailInput, { target: { value: 'example@example.org' } });
    fireEvent.change(passwordInput, { target: { value: 'example' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
        const alertElement = screen.getByText('Failed to fetch');
        expect(alertElement).toBeInTheDocument();
    });

    // Restore the original fetch function
    global.fetch.mockRestore();
});