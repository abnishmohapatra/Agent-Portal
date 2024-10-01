// src/UserHelp/help.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Help from './help';

jest.mock('axios');

describe('Help Component', () => {
  test('submits the form successfully', async () => {
    // Mock successful response from axios
    axios.post.mockResolvedValueOnce({ data: { ticketId: 1 } });

    render(<Help />);

    
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Help needed' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Description of issue' } });

    
    fireEvent.click(screen.getByText(/submit/i));

    
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('http://localhost:7000/api/tickets/create', {
        title: 'Help needed',
        description: 'Description of issue',
        user: { userId: 1 } 
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
    });

    
    expect(console.log).toHaveBeenCalledWith('Ticket created successfully:', { ticketId: 1 });
  });

  test('handles form submission failure', async () => {
    
    axios.post.mockRejectedValueOnce(new Error('Failed to create ticket'));

    render(<Help />);

    
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Help needed' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Description of issue' } });

    
    fireEvent.click(screen.getByText(/submit/i));

    
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    
    expect(console.error).toHaveBeenCalledWith('Error creating ticket:', expect.any(Error));
  });
});
