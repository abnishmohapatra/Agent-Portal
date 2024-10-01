import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App Routing', () => {
  test('renders SolvedTickets component for default route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Solved Tickets')).toBeInTheDocument();
  });

  test('renders OpenTickets component for /open-tickets route', () => {
    render(
      <MemoryRouter initialEntries={['/open-tickets']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Open Tickets')).toBeInTheDocument();
  });

  test('renders ClosedTicket component for /closed-tickets route', () => {
    render(
      <MemoryRouter initialEntries={['/closed-tickets']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Closed Tickets')).toBeInTheDocument();
  });

  // Add more tests for other routes as needed
});
