import React from 'react';
import './Navbar.css';
import logo from "../InsuranceImages/logosfolder/applogo.png"
import userlogo from "../InsuranceImages/logosfolder/userlogo.png"
function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-left">
               
                <img src={logo} alt='userlogo' className='logo' />
                <span className="greeting">Inssure</span>
            </div>
            <div className="navbar-middle"></div>
            <div className="navbar-right">
            <img src={userlogo} alt='userloginlogo' className='profile-image' />
                <h1>Name</h1>
                <button className="action-button">Logout</button>
            </div>
        </div>
    );
}
 
export default Navbar;