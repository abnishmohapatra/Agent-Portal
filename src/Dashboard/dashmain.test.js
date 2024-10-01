// src/Dashboard/dashmain.test.js

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import Dashmain from './dashmain';

jest.mock('axios'); // Mocking Axios

describe('Dashmain Component', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  test('handles errors while fetching open tickets count', async () => {
    const errorMessage = 'Error fetching open tickets count';
    axios.get.mockRejectedValueOnce(new Error(errorMessage)); // Mock error when fetching open tickets count

    render(
      <MemoryRouter>
        <Dashmain />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      // Ensure open tickets section is not rendered due to error
      expect(screen.queryByText('Open Tickets')).not.toBeInTheDocument();
    });
  });
});
