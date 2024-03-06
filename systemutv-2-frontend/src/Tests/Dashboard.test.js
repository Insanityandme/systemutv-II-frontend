import { render, screen, fireEvent} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/Dashboard';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';


fetchMock.enableMocks();

beforeEach(() => {
    fetchMock.resetMocks();
});

// Test for initial render and fetching plants
test('renders Dashboard and fetches plants', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: [] }));

    render(
        <BrowserRouter>
            <Dashboard />
        </BrowserRouter>
    );
    expect(screen.getByText(/Water all plants/i)).toBeInTheDocument();

});

// Test for navigating to the search page
test('navigates to search page on button click', async () => {
    render(
        <BrowserRouter>
            <Dashboard />
        </BrowserRouter>
    );

    // Mock the navigate function
    const navigateButton = screen.getByText(/press me/i);
    fireEvent.click(navigateButton);

});
