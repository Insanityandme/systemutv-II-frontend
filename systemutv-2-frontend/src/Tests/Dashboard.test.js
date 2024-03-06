import { render, screen, fireEvent} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/Dashboard';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import {act} from "react-dom/test-utils";

fetchMock.enableMocks();

beforeEach(() => {
    fetchMock.resetMocks();
});

// const unmockedFetch = global.fetch;
//
// beforeAll(() => {
//     global.fetch = () =>
//       Promise.resolve({
//           json: () =>
//             Promise.resolve({
//                 name: "The Octocat",
//                 followers: "100",
//                 following: "200",
//             }),
//       } as Response);
// });

// afterAll(() => {
//     global.fetch = unmockedFetch;
// });

// Test for initial render and fetching plants
test('renders Dashboard and fetches plants', async () => {
    sessionStorage.setItem('userId', '-1');

    render(
      <BrowserRouter>
          <Dashboard />
      </BrowserRouter>
    );

    fetchMock.mockResponseOnce(JSON.stringify(
      [{
          "id": 24,
          "commonName": null,
          "scientificName": null,
          "family": null,
          "imageURL": "https://bs.plantnet.org/image/o/38d4346034e89f4e5917357f2bc62cdcd150a3af",
          "nickname": "tarovine",
          "lastWatered": "2024-03-06",
          "waterFrequency": -1,
          "genus": null,
          "light": 0
      }]
    ));

    // expect(screen.getByText(/Water all plants/i)).toBeInTheDocument();
    // expect(screen.getByText(/Last watered/i)).toBeInTheDocument();
    // expect(screen.getByText(/Name/i)).toBeInTheDocument();
});

// Test for navigating to the search page
test('navigates to search page on button click', async () => {
    render(
        <BrowserRouter>
            <Dashboard />
        </BrowserRouter>
    );

    // Mock the navigate function
    const navigateButton = screen.getByText(/Go to search/i);
    fireEvent.click(navigateButton);
});
