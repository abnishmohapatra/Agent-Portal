import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import Dasb from './dash';
import axios from 'axios';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

jest.mock('axios');

describe('Dasb Component', () => {
    let mockedNavigate;

    beforeEach(() => {
        mockedNavigate = useNavigate();
        axios.get.mockResolvedValue({ data: { count: 10 } }); // Mocking the Axios GET request
        jest.clearAllMocks();
    });

    test('renders without crashing', () => {
        render(<Dasb />);
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Open Tickets')).toBeInTheDocument();
        expect(screen.getByText('Closed Tickets')).toBeInTheDocument();
    });

    test('navigates to Dashboard when Dashboard is clicked', async () => {
        render(<Dasb />);
        fireEvent.click(screen.getByText('Dashboard'));
        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/dash'));
    });

    test('navigates to Open Tickets when Open Tickets is clicked', async () => {
        render(<Dasb />);
        fireEvent.click(screen.getByText('Open Tickets'));
        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/open-tickets'));
    });

    test('navigates to Closed Tickets when Closed Tickets is clicked', async () => {
        render(<Dasb />);
        fireEvent.click(screen.getByText('Closed Tickets'));
        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/closed-tickets'));
    });
});
