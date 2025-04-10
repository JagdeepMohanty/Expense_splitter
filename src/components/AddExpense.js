import React, { useState } from 'react';
import axios from 'axios';
import './AddExpense.css';

function AddExpense({ token, groupId }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [participants, setParticipants] = useState('');
  const [splitType, setSplitType] = useState('equal');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const participantData = splitType === 'equal'
      ? participants.split(',')
      : participants.split(',').map(p => {
          const [user, share] = p.split(':');
          return { user, share: parseFloat(share) };
        });

    try {
      await axios.post('http://localhost:9000/api/expenses', {
        groupId,
        description,
        amount: parseFloat(amount),
        participants: participantData,
        splitType,
      }, { headers: { 'x-auth-token': token } });
      setDescription('');
      setAmount('');
      setParticipants('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="add-expense">
      <h3>Add Expense</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
        <input type="text" value={participants} onChange={(e) => setParticipants(e.target.value)} placeholder={splitType === 'equal' ? 'User IDs (comma-separated)' : 'userId:share (e.g., id1:60,id2:40)'} required />
        <select value={splitType} onChange={(e) => setSplitType(e.target.value)}>
          <option value="equal">Equal Split</option>
          <option value="percentage">Percentage Split</option>
        </select>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default AddExpense;