import React, { useState, useEffect } from 'react';
import './SettleDebt.css';
import axios from 'axios';

function SettleDebt({ token, groupId }) {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState({ text: '', isError: false });

  useEffect(() => {
    const fetchGroupMembers = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/groups/${groupId}`, {
          headers: { 'x-auth-token': token }
        });
        setUsers(res.data.members);
      } catch (err) {
        setMessage({ text: 'Failed to load group members', isError: true });
      }
    };
    fetchGroupMembers();
  }, [groupId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9000/api/expenses/settle', { to, amount: parseFloat(amount), groupId, description }, { headers: { 'x-auth-token': token } });
      setTo('');
      setAmount('');
      setDescription('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="settle-debt-container">
      <h3>Settle Debt</h3>
      <form onSubmit={handleSubmit} className="settle-form">
        <select 
          value={to} 
          onChange={(e) => setTo(e.target.value)} 
          required
        >
          <option value="">Select User</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          placeholder="Amount" 
          required 
          min="0.01"
          step="0.01"
        />
        <input 
          type="text" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Description (e.g., Paid via PhonePe)" 
        />
        <button type="submit">Settle Debt</button>
      </form>
    </div>
  );
}

export default SettleDebt;