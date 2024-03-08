import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import Search from '..//Pages/Search/Search';
import { fireEvent, waitFor } from '@testing-library/react';
import {act} from "react-dom/test-utils";
test('renders Search component correctly', () => {
    render(
        <BrowserRouter>
            <Search />
        </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/Search plant here/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
});

// Test for successful search
test('fetches flowers and updates UI on successful search', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
            data: [{ id: 1, common_name: 'Rose', image_url: 'rose.jpg', scientific_name: 'Rosa' }]
        }),
    });

    render(
        <BrowserRouter>
            <Search />
        </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Search plant here/i), { target: { value: 'rose' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
        expect(screen.getByText(/Rose/i)).toBeInTheDocument();
    });

    global.fetch.mockRestore();
});

test('opens nickname modal and submits nickname', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
            data: [{ id: 1, common_name: 'Rose', image_url: 'rose.jpg', scientific_name: 'Rosa' }]
        }),
    });

    render(
        <BrowserRouter>
            <Search />
        </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Search plant here/i), {target: {value: 'rose'}});
    fireEvent.click(screen.getByRole('button', {name: /search/i}));

    await waitFor(() => {
        expect(screen.getByText(/Rose/i)).toBeInTheDocument();
    });

    await act(async () => {
        fireEvent.click(screen.getByText(/Add/i));
    });

    await waitFor(() => {
        expect(screen.getByText(/Enter a Nickname/i)).toBeInTheDocument();
    });

    await act(async () => {
        fireEvent.change(screen.getByPlaceholderText(/Nickname/i), { target: { value: 'My Rose' } });
        fireEvent.click(screen.getByText(/Submit/i));
    });

    global.fetch.mockRestore();
});
