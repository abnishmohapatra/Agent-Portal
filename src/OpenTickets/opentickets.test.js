import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import OpenTickets from './opentickets';


jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('axios');

describe('OpenTickets Component', () => {
  test('fetches and displays tickets', async () => {
    const mockTickets = [
      { id: 1, user: { userId: 'user1' }, title: 'Ticket 1' },
      { id: 2, user: { userId: 'user2' }, title: 'Ticket 2' },
    ];

    axios.get.mockResolvedValueOnce({ data: mockTickets });

    render(<OpenTickets />);

    await waitFor(() => {
      expect(screen.getByText('Ticket 1')).toBeInTheDocument();
      expect(screen.getByText('Ticket 2')).toBeInTheDocument();
    });
  });

  test('displays an error message on fetch failure', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<OpenTickets />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch tickets summary. Please try again later.')).toBeInTheDocument();
    });
  });

  test('navigates to ticket details on button click', async () => {
    const mockTickets = [
      { id: 1, user: { userId: 'user1' }, title: 'Ticket 1' },
    ];

    const mockedNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      useNavigate: () => mockedNavigate,
    }));

    axios.get.mockResolvedValueOnce({ data: mockTickets });

    render(<OpenTickets />);

    await waitFor(() => {
      expect(screen.getByText('Ticket 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('View'));

    expect(mockedNavigate).toHaveBeenCalledWith('/view-open-ticket/1');
  });
});


