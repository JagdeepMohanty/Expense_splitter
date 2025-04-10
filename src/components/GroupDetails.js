import React, { useState, useEffect } from 'react';
import './GroupDetails.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SettleDebt from './SettleDebt';
import History from './History';

function GroupDetails({ token }) {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [debts, setDebts] = useState({});

  useEffect(() => {
    const fetchGroup = async () => {
      const groupRes = await axios.get(`http://localhost:9000/api/groups/${id}`, { headers: { 'x-auth-token': token } });
      const debtsRes = await axios.get(`http://localhost:9000/api/expenses/debts/${id}`, { headers: { 'x-auth-token': token } });
      setGroup(groupRes.data);
      setDebts(debtsRes.data);
    };
    fetchGroup();
  }, [id, token]);

  if (!group) return <div>Loading...</div>;

  return (
    <div className="group-details">
      <h2>{group.name}</h2>
      
      <div className="group-info">
        <h3>Members</h3>
        <div className="members-list">
          {group.members.map(member => (
            <div key={member._id} className="member-card">
              <h4>{member.name}</h4>
              <p>{member.email}</p>
            </div>
          ))}
        </div>

        <h3>Debts</h3>
        <div className="members-list">
          {Object.entries(debts).map(([userId, amount]) => (
            <div key={userId} className="member-card">
              <h4>{userId}</h4>
              <p>{amount > 0 ? `Owes $${amount}` : `Owed $${-amount}`}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="group-actions">
        <Link to={`/groups/${id}`} className="action-button">View Group</Link>
        <Link to={`/groups/${id}/expenses`} className="action-button">Add Expense</Link>
        <Link to={`/groups/${id}/history`} className="action-button">View History</Link>
        <Link to={`/groups/${id}/settle`} className="action-button">Settle Debt</Link>
      </div>
    </div>
  );
}

export default GroupDetails;