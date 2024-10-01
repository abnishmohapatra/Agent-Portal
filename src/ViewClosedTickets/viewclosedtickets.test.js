// src/ViewClosedTickets/viewclosedtickets.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ViewClosedTickets from './viewclosedtickets';
import axios from 'axios';

jest.mock('axios');

describe('ViewClosedTickets Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock call history before each test
  });

  test('renders ticket details on successful fetch', async () => {
    const mockTicket = {
      id: 1,
      title: 'Closed Ticket 1',
      description: 'Description of Closed Ticket 1',
      responseTxt: 'Response to Closed Ticket 1',
    };

    axios.get.mockResolvedValueOnce({ data: mockTicket });

    render(
      <MemoryRouter initialEntries={['/view-closed-ticket/1']}>
        <Routes>
          <Route path="/view-closed-ticket/:ticketId" element={<ViewClosedTickets />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the component to render ticket details
    await screen.findByLabelText('Title');

    // Check if ticket details are rendered correctly
    expect(screen.getByLabelText('Title')).toHaveValue(mockTicket.title);
    expect(screen.getByLabelText('Description')).toHaveValue(mockTicket.description);
    expect(screen.getByLabelText('Response')).toHaveValue(mockTicket.responseTxt);
  });

  test('handles fetch error gracefully', async () => {
    const error = new Error('Failed to fetch ticket details');
    axios.get.mockRejectedValueOnce(error);

    render(
      <MemoryRouter initialEntries={['/view-closed-ticket/1']}>
        <Routes>
          <Route path="/view-closed-ticket/:ticketId" element={<ViewClosedTickets />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the component to handle the error
    await screen.findByText('Failed to fetch ticket details. Please try again later.');

    // Check if error message is rendered
    expect(screen.getByText('Failed to fetch ticket details. Please try again later.')).toBeInTheDocument();
  });
});
