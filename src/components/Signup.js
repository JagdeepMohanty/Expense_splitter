import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';

function Signup({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:9000/api/auth/signup', { email, password, name });
      setToken(res.data.token);
    } catch (err) {
      setError(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Name" 
          required 
        />
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        <button type="submit">Signup</button>
        {error && <p className="error">{error}</p>}
        <div className="login-link">
          Already have an account? <a href="/login">Log in</a>
        </div>
      </form>
    </div>
  );
}

export default Signup;