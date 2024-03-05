import {fireEvent, render, screen} from '@testing-library/react';
import App from '../App';
import {BrowserRouter} from "react-router-dom";
import Navbar from "../Navbar";

// Requirement: Which requirement ID does this test case cover?
// TODO
test('renders app', () => {
    render(
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    );

    const loginPage = screen.getByText(/Welcome to your garden/i);
    expect(loginPage).toBeInTheDocument();
});

test('renders navbar', () => {
    render(
        <BrowserRouter>
            <Navbar/>
        </BrowserRouter>
    );

    const dashboardLink = screen.getByText(/Dashboard/i);
    const searchLink = screen.getByText(/Search/i);
    const settingsLink = screen.getByText(/Settings/i);

    expect(dashboardLink).toBeInTheDocument();
    expect(searchLink).toBeInTheDocument();
    expect(settingsLink).toBeInTheDocument();
});

test('Dashboard link in Navbar test', () => {
    render(
        <BrowserRouter>
            <Navbar/>
        </BrowserRouter>
    );

    const dashboardLink = screen.getByText(/Dashboard/i);
    fireEvent.click(dashboardLink);

    expect(window.location.pathname).toBe('/dashboard');
});

test('Search link in Navbar test', () => {
    render(
        <BrowserRouter>
            <Navbar/>
        </BrowserRouter>
    );

    const searchLink = screen.getByText(/Search/i);
    fireEvent.click(searchLink);

    expect(window.location.pathname).toBe('/search');
});

test('Settings link in Navbar test', () => {
    render(
        <BrowserRouter>
            <Navbar/>
        </BrowserRouter>
    );

    const dashboardLink = screen.getByText(/Settings/i);
    fireEvent.click(dashboardLink);

    expect(window.location.pathname).toBe('/settings');
});
