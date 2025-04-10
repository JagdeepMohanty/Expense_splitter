  import React, { useState, useEffect } from 'react';
import './History.css';
import axios from 'axios';

function History({ token, groupId }) {
  const [history, setHistory] = useState({ expenses: [], payments: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:9000/api/expenses/history/${groupId}`, { 
          headers: { 'x-auth-token': token } 
        });
        setHistory(res.data);
      } catch (err) {
        setError(err.response?.data?.msg || 'Failed to load history');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [groupId, token]);

  if (loading) return <div className="history-container">Loading history...</div>;
  if (error) return <div className="history-container error">{error}</div>;

  return (
    <div className="history-container">
      <h2>Transaction History</h2>
      
      <div className="expenses-list">
        <h3>Expenses</h3>
        {history.expenses.length === 0 ? (
          <p>No expenses recorded yet</p>
        ) : (
          history.expenses.map(exp => (
            <div key={exp._id} className="expense-card">
              <h4>{exp.description}</h4>
              <p className="amount">${exp.amount}</p>
              <p className="paid-by">Paid by: {exp.payer.name}</p>
              <p className="date">{new Date(exp.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>

      <div className="expenses-list">
        <h3>Payments</h3>
        {history.payments.length === 0 ? (
          <p>No payments recorded yet</p>
        ) : (
          history.payments.map(pay => (
            <div key={pay._id} className="expense-card">
              <h4>{pay.description}</h4>
              <p className="amount">${pay.amount}</p>
              <p>{pay.from.name} → {pay.to.name}</p>
              <p className="date">{new Date(pay.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default History;