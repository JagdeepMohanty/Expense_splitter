import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';

const Navbar = ({ token, setToken }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:9000/api/auth/logout', {}, {
        headers: { 'x-auth-token': token }
      });
      localStorage.removeItem('token');
      setToken('');
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">SplitEase</div>
      <ul className="navbar-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/groups">Groups</Link></li>
        <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
