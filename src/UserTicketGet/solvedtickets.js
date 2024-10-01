import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/nv';
import Dasb from '../Dashboard/dash';
import axios from 'axios';

function SolvedTickets() {
    const [tickets, setTickets] = useState([]);
    const userId = 1; // Replace with actual user ID or fetch from context/auth

    useEffect(() => {
        fetchSolvedTickets();
    }, []);

    const fetchSolvedTickets = async () => {
        try {
            const response = await axios.get(`http://localhost:7000/api/tickets/solved/${userId}`);
            setTickets(response.data);
        } catch (error) {
            console.error('Error fetching solved tickets:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <Dasb />
            <div className="mainbox">
                <h1 className="heading">Solved Tickets</h1>
                <table className="tickets-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Response</th>
                            <th>Response At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => (
                            <tr key={ticket.id}>
                                <td>{ticket.id}</td>
                                <td>{ticket.title}</td>
                                <td>{ticket.description}</td>
                                <td>{ticket.responseTxt}</td>
                                <td>{ticket.responseAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SolvedTickets;
