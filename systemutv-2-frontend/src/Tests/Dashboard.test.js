import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/Dashboard';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import {act} from "react-dom/test-utils";

fetchMock.enableMocks();

describe('Dashboard Component', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
        sessionStorage.clear();
        sessionStorage.setItem('userId', 'testUserId');
    });

    it('fetches plants and displays their nicknames on the dashboard', async () => {
        // Mock responses for both plants and a fun fact
        const mockPlantsResponse = [
            {
                "id": 3,
                "commonName": null,
                "scientificName": null,
                "family": null,
                "imageURL": "string",
                "nickname": "HGJGFJG",
                "lastWatered": "1999-01-02",
                "waterFrequency": -1,
                "genus": null,
                "light": 0
            },
        ];

        // const mockFunFactResponse = [{fact:"Plants can communicate."},];
        const mockFunFactResponse = "Plants can communicate.";

        fetchMock.mockResponses(
            [JSON.stringify(mockPlantsResponse), { status: 200 }],
            [JSON.stringify(mockFunFactResponse), { status: 200 }]
        );

        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('HGJGFJG')).toBeInTheDocument();
        });
    });

    // Test for navigating to the search page
    it('Navigates to search page on button click', async() => {
        // This needs to be empty to ensure the button "Go to search" is present
        const mockPlantsResponse = [];

        // Mock responses for fun fact
        const mockFunFactResponse = "Plants can communicate.";

        fetchMock.mockResponses(
          [JSON.stringify(mockPlantsResponse), { status: 200 }],
          [JSON.stringify(mockFunFactResponse), { status: 200 }]
        );

        // This is necessary because we are updating the state.
        await act( async () => {
            render(
              <BrowserRouter>
                  <Dashboard />
              </BrowserRouter>
            );
        });

        // Mock the navigate function
        const navigateButton = screen.getByText(/Go to search/i);
        fireEvent.click(navigateButton);

        // Make sure we actually navigated to the search page
        await waitFor(() => {
            expect(window.location.pathname).toBe('/search');
        });
    });
});