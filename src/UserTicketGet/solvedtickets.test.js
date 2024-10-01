import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import SolvedTickets from './solvedtickets';

const mockAxios = new MockAdapter(axios);

describe('SolvedTickets Component', () => {
    beforeEach(() => {
        mockAxios.reset();
    });

    test('renders without crashing and displays solved tickets', async () => {
        const tickets = [
            { id: 1, title: 'Ticket 1', description: 'Description 1', responseTxt: 'Response 1', responseAt: '2023-06-23T10:00:00Z' },
            { id: 2, title: 'Ticket 2', description: 'Description 2', responseTxt: 'Response 2', responseAt: '2023-06-24T10:00:00Z' }
        ];

        mockAxios.onGet('http://localhost:7000/api/tickets/solved/1').reply(200, tickets);

        render(
            <MemoryRouter> {/* Wrap your component with MemoryRouter */}
                <SolvedTickets />
            </MemoryRouter>
        );

        await waitFor(() => {
            tickets.forEach(ticket => {
                expect(screen.getByText(ticket.title)).toBeInTheDocument();
                expect(screen.getByText(ticket.description)).toBeInTheDocument();
                expect(screen.getByText(ticket.responseTxt)).toBeInTheDocument();
                expect(screen.getByText(ticket.responseAt)).toBeInTheDocument();
            });
        });
    });

    test('handles errors when fetching tickets', async () => {
        mockAxios.onGet('http://localhost:7000/api/tickets/solved/1').reply(500);

        render(
            <MemoryRouter> {/* Wrap your component with MemoryRouter */}
                <SolvedTickets />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.queryByText('Failed to fetch solved tickets. Status: 500')).toBeInTheDocument();
        });
    });
});
