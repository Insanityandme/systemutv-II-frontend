import {fireEvent, render, screen} from '@testing-library/react';
import App from '../App';
import {BrowserRouter} from "react-router-dom";
import Navbar from "../Navbar";

// Requirement: Which requirement ID does this test case cover?
// TODO

/*
Tests if App rendering
Requirements ID: F.UI.2
 */
test('renders app', () => {
    render(
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    );

    const loginPage = screen.getByText(/Welcome to your garden/i);
    expect(loginPage).toBeInTheDocument();
});


/*
Tests if Navbar.js rendering
Requirements ID: F.UI.5
 */
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

/*
Tests redirection to Dashboard.js
 */
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

/*
Tests redirection to Search.js
 */
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

/*
Tests redirection to Navbar.js
 */
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
