import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ClosedTickets from './closedticket';

let mockNavigate;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('ClosedTickets Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate = jest.fn();
  });

  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <ClosedTickets />
      </MemoryRouter>
    );
    expect(container).toBeInTheDocument();
  });
});
