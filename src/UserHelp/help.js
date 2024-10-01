import React, { useState } from "react";
import axios from 'axios';
import './help.css';
import logo from "../InsuranceImages/logosfolder/applogo.png";
import Navbar from "../Navbar/nv";
import Dasb from "../Dashboard/dash";
import helpme from "../InsuranceImages/userimages/helpme.png";
 
function Help() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
 
    const handleSubmit = async (e) => {
        e.preventDefault();
 
        const ticket = {
            title: title,
            description: description,
            user: { userId: 1 } // assuming userId is 1 for this example
        };
 
        try {
            const response = await axios.post('http://localhost:7000/api/tickets/create', ticket, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
 
            console.log('Ticket created successfully:', response.data);
        } catch (error) {
            console.error('Error creating ticket:', error);
        }
    };
 
    return (
        <div className="background">
            <div className="main-body">
                <h1 className="upperhead">Having Issues, User? Raise Ticket.</h1>
                <div className="white-box">
                    <h2 className="box-heading">Raise a Support Ticket</h2>
                    <form className="ticket-form" onSubmit={handleSubmit}>
                        <div className="form-left">
                            <div className="form-group">
                                <label htmlFor="title">Title:</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="text-box"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="form-groupp">
                                <label htmlFor="description">Description:</label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    className="text-boxx"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="submittt-button">Submit</button>
                        </div>
                        <div className="form-right">
                            <img src={helpme} alt='userloginlogo' className='ag-image' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default Help;