import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../Navbar/nv";
import Dasb from "../Dashboard/dash";
import './viewopentickets.css';  





const sendEmail = () => {
  const emailData = {
    to: '19410121052.e.abnishmohapatra@gmail.com', //ticket.user.emailId
    subject: 'hello user',
    body: "Your query has been solved."
  };

  axios.post('http://localhost:7000/api/tickets/send-email', emailData)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error sending email: ', error);
    });
};
function ViewOpenTickets() {
    const { ticketId } = useParams();
    const [ticket, setTicket] = useState({});
    const [responseTxt, setResponseTxt] = useState('');
    const [fetchError, setFetchError] = useState(null);
    const [updateError, setUpdateError] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
 
    useEffect(() => {
        fetchTicketDetails();
    }, [ticketId]);
 
    const fetchTicketDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:7000/api/tickets/${ticketId}`)
            setTicket(response.data)

        } catch (error) {
            console.error('Error fetching ticket details:', error);
            setFetchError('Failed to fetch ticket details. Please try again later.');
        }
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:7000/api/tickets/update/${ticketId}`, {
                ...ticket,
                responseTxt
            });
 
            setUpdateSuccess(true);
            setUpdateError(null);
        } catch (error) {
            console.error('Error updating ticket:', error);
            setUpdateError('Failed to update ticket. Please try again later.');
        }
    };
 
    if (fetchError) {
        return (
            <div>
                <Navbar />
                <Dasb />
                <div className="mainbox">
                    <h1 className="heading">Open Ticket</h1>
                    <p>{fetchError}</p>
                </div>
            </div>
        );
    }
 
    return (
        <div>
            <Navbar />
            <Dasb />
            <div className="mainbox">
                <h1 className="heading">Open Ticket</h1>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" className="form-control" value={ticket.title || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input type="text" id="description" className="form-control" value={ticket.description || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="response">Response</label>
                            <input
                                type="text"
                                id="response"
                                className="form-control"
                                value={responseTxt}
                                onChange={(e) => setResponseTxt(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <button onClick={sendEmail} type="submit" className="submit-button">Submit</button>
                        </div>
                        {updateError && <p className="error-message">{updateError}</p>}
                        {updateSuccess && <p className="success-message">Ticket updated successfully!</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default ViewOpenTickets;