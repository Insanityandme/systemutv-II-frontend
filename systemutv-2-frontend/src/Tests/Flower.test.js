import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Flower } from '../Pages/Dashboard/Flower';

describe('Flower Component', () => {
    const mockDeletePlant = jest.fn();
    const mockAddPlantToUser = jest.fn();
    const baseProps = {
        image: 'test-image.jpg',
        nickname: 'Rose',
        lastWatered: '2023-03-01',
        info: 'This is a test flower.',
        id: '123',
        showDeleteButton: false,
        deletePlant: mockDeletePlant,
        addPlantToUser: mockAddPlantToUser,
    };

    it('renders correctly', () => {
        render(<Flower {...baseProps} />);
        expect(screen.getByText(/rose/i)).toBeInTheDocument();
        expect(screen.getByText(/2023-03-01/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /info/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /\+ Add/i })).toBeInTheDocument();
    });

    it('toggles modal on Info button click', () => {
        render(<Flower {...baseProps} />);
        fireEvent.click(screen.getByRole('button', { name: /info/i }));
        expect(screen.getByText(/this is a test flower./i)).toBeInTheDocument();
        fireEvent.click(screen.getByText(/×/i));
        expect(screen.queryByText(/this is a test flower./i)).not.toBeInTheDocument();
    });

    it('renders Delete button when showDeleteButton is true', () => {
        render(<Flower {...baseProps} showDeleteButton={true} />);
        expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
    });

    it('calls deletePlant when Delete button is clicked', () => {
        render(<Flower {...baseProps} showDeleteButton={true} />);
        fireEvent.click(screen.getByRole('button', { name: /delete/i }));
        expect(mockDeletePlant).toHaveBeenCalledWith(baseProps.id);
    });

    it('calls addPlantToUser when Add button is clicked', () => {
        render(<Flower {...baseProps} />);
        fireEvent.click(screen.getByRole('button', { name: /\+ Add/i }));
        expect(mockAddPlantToUser).toHaveBeenCalledTimes(1);
    });
});
