import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import Login from '../Pages/Login/Login';
import {BrowserRouter} from "react-router-dom";
import Settings from "../Pages/Settings/Settings";
import Navbar from "../Navbar";


test('test settings render', async () => {
    render(
        <BrowserRouter>
            <Settings/>
        </BrowserRouter>
    );

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

    const sure = screen.getByText('Are you sure?');
    const sureInput = screen.getByPlaceholderText('Enter your password to confirm');
    const deleteAcc = screen.getByText(/Delete Account/i);
    const changedMind = screen.getByText('Changed your mind?');
    const close = screen.getByText(/Close/i);

    expect(sure).toBeInTheDocument();
    expect(sureInput).toBeInTheDocument();
    expect(deleteAcc).toBeInTheDocument();
    expect(changedMind).toBeInTheDocument();
    expect(close).toBeInTheDocument();
});