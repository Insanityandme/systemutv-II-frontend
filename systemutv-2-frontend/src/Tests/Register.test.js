import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {BrowserRouter} from "react-router-dom";
import Register from "../Pages/Login/Register";

test('test register page rendering', async () => {
    render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );

    const title = screen.getByText(/Create your garden/i);
    const nameInput = screen.getByPlaceholderText('Enter your username');
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const confirmInput = screen.getByPlaceholderText('Confirm your password');
    const registerButton = screen.getByText('Register');
    const linkToLogin = screen.getByText(/Login here/i);

    expect(title).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
    expect(linkToLogin).toBeInTheDocument();
});

test('test redirection to login', async () => {
    render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );

    const linkToLogin = screen.getByText(/Login here/i);
    fireEvent.click(linkToLogin);

    expect(window.location.pathname).toBe('/');
});


test('test to register an account', async () => {
    render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );

    const nameInput = screen.getByPlaceholderText('Enter your username');
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const confirmInput = screen.getByPlaceholderText('Confirm your password');
    const registerButton = screen.getByText('Register');

    fireEvent.change(nameInput, { target: { value: 'testRegisterPage' } });
    fireEvent.change(emailInput, { target: { value: 'register@register.reg' } });
    fireEvent.change(passwordInput, { target: { value: 'register' } });
    fireEvent.change(confirmInput, { target: { value: 'register' } })
    fireEvent.click(registerButton);

    await waitFor(() => {
        expect(window.location.pathname).toBe('/');
    });
});