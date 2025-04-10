import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './GroupList.css';

function GroupList({ token }) {
  const [groups, setGroups] = useState([]);
  const [name, setName] = useState('');
  const [memberIds, setMemberIds] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:9000/api/groups', { headers: { 'x-auth-token': token } });
        setGroups(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, [token]);

  const isValidObjectId = (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
  };

    const handleCreateGroup = async (e) => {
      e.preventDefault();
      
      const ids = memberIds.split(',').map(id => id.trim());
      const invalidIds = ids.filter(id => !isValidObjectId(id));
      
      if (invalidIds.length > 0) {
        alert(`Invalid member IDs: ${invalidIds.join(', ')}`);
        return;
      }

      setLoading(true);
      try {
      const res = await axios.post('http://localhost:9000/api/groups', 
        { 
          name, 
          members: memberIds.split(',').map(id => id.trim()) 
        }, 
        { 
          headers: { 
            'x-auth-token': token,
            'Content-Type': 'application/json'
          } 
        }
      );
      setGroups([...groups, res.data]);
      setName('');
      setMemberIds('');
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || 'Failed to create group');
    }
  };

  if (loading) return <div className="group-list">Loading groups...</div>;
  if (error) return <div className="group-list error">{error}</div>;

  return (
    <div className="group-list">
      <h2>Your Groups</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleCreateGroup} className="group-form">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Group Name" required />
        <input type="text" value={memberIds} onChange={(e) => setMemberIds(e.target.value)} placeholder="Member IDs (comma-separated)" required />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Group'}
        </button>
      </form>
      <div className="groups-container">
        {groups.map(group => (
          <div key={group._id} className="group-card">
            <h3>{group.name}</h3>
            <Link to={`/groups/${group._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroupList;