
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/nv';
import sided from './Dashboard/dash';
import fc from './Dashboard/dash';
import Dasb from './Dashboard/dash';
import Help from './UserHelp/help';
import ClosedTicket from './ClosedTickets/closedticket';
import ViewClosedTickets from './ViewClosedTickets/viewclosedtickets';
import ViewOpenTickets from './ViewOpenTickets/viewopentickets';
import OpenTickets from './OpenTickets/opentickets';
import Dashmain from './Dashboard/dashmain'; // Adjust the import path as needed
import SolvedTickets from './UserTicketGet/solvedtickets';

function App() {
  return (
    
    
      <Router>
          <Routes>
              <Route path="/closed-tickets" element={<ClosedTicket />} />
              <Route path="/view-closed-ticket/:ticketId" element={<ViewClosedTickets />} />
              <Route path="/" element={<Dashmain/>} />
              <Route path="/open-tickets" element={<OpenTickets />} />
              
              <Route path="/view-open-ticket/:ticketId" element={<ViewOpenTickets />} />
              {/* <Route path="/" element={<Help />} /> */}
              {/* ////opentickets to opentickets.js///// */}
              <Route path="/open-tickets" element={<OpenTickets />} />
              <Route path="/view-open-ticket/:ticketId" element={<ViewOpenTickets />} />
              
              {/* ////,closedtickets to closedticket.js// */}
             
                <Route path="/open-tickets" element={<OpenTickets />} />
                <Route path="/closed-tickets" element={<ClosedTicket />} />
                <Route path="/view-open-ticket/:ticketId" element={<ViewOpenTickets />} />
                <Route path="/view-closed-ticket/:ticketId" element={<ViewClosedTickets />} />
                {/* ///Dashboard to dashmain.js// */}
                <Route path="/dash" element={<Dashmain />} />
                <Route path="/open-tickets" element={<OpenTickets />} />
                <Route path="/closed-tickets" element={<ClosedTicket />} />
          </Routes>
      </Router>
      
  );
}

export default App;
