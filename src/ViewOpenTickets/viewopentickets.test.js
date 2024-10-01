import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom'; 
import axios from 'axios';
import ViewOpenTickets from './viewopentickets';

jest.mock('axios');

describe('ViewOpenTickets Component', () => {
  test('renders ticket details on successful fetch', async () => {
    const mockTicket = {
      id: 1,
      title: 'Open Ticket 1',
      description: 'Description of Open Ticket 1',
    };

    axios.get.mockResolvedValueOnce({ data: mockTicket });

    render(
      <MemoryRouter initialEntries={['/view-open-ticket/1']}>
        <Routes>
          <Route path="/view-open-ticket/:ticketId" element={<ViewOpenTickets />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText('Title')).toHaveValue(mockTicket.title);
      expect(screen.getByLabelText('Description')).toHaveValue(mockTicket.description);
    });
  });

  test('handles fetch error gracefully', async () => {
    const errorMessage = 'Failed to fetch ticket details. Please try again later.';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    render(
      <MemoryRouter initialEntries={['/view-open-ticket/1']}>
        <Routes>
          <Route path="/view-open-ticket/:ticketId" element={<ViewOpenTickets />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  test('updates ticket details successfully', async () => {
    const mockTicket = {
      id: 1,
      title: 'Open Ticket 1',
      description: 'Description of Open Ticket 1',
    };

    const updatedResponse = 'Response to Open Ticket 1';
    axios.get.mockResolvedValueOnce({ data: mockTicket });
    axios.put.mockResolvedValueOnce({ data: { ...mockTicket, responseTxt: updatedResponse } });

    render(
      <MemoryRouter initialEntries={['/view-open-ticket/1']}>
        <Routes>
          <Route path="/view-open-ticket/:ticketId" element={<ViewOpenTickets />} />
        </Routes>
      </MemoryRouter>
    );


    fireEvent.change(screen.getByLabelText('Response'), { target: { value: updatedResponse } });
    fireEvent.submit(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(screen.getByText('Ticket updated successfully!')).toBeInTheDocument();
    });
  });

  test('handles update error gracefully', async () => {
    const mockTicket = {
      id: 1,
      title: 'Open Ticket 1',
      description: 'Description of Open Ticket 1',
    };

    const errorMessage = 'Failed to update ticket. Please try again later.';
    axios.get.mockResolvedValueOnce({ data: mockTicket });
    axios.put.mockRejectedValueOnce(new Error(errorMessage));

    render(
      <MemoryRouter initialEntries={['/view-open-ticket/1']}>
        <Routes>
          <Route path="/view-open-ticket/:ticketId" element={<ViewOpenTickets />} />
        </Routes>
      </MemoryRouter>
    );

    // Simulate entering response and submitting form
    fireEvent.change(screen.getByLabelText('Response'), { target: { value: 'Response to Open Ticket 1' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
