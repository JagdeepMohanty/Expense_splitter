import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import GroupList from './components/GroupList';
import GroupDetails from './components/GroupDetails';
import AddExpense from './components/AddExpense';
import History from './components/History';
import SettleDebt from './components/SettleDebt';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const setAuthToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="app">
        {token && <Navbar token={token} setToken={setAuthToken} />}
        <Routes>
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setToken={setAuthToken} />} />
          <Route path="/signup" element={!token ? <Signup setToken={setAuthToken} /> : <Navigate to="/groups" />} />
          <Route path="/groups" element={token ? <GroupList token={token} /> : <Navigate to="/login" />} />
          <Route path="/groups/:id" element={token ? <GroupDetails token={token} /> : <Navigate to="/login" />} />
          <Route path="/groups/:id/expenses" element={token ? <AddExpense token={token} /> : <Navigate to="/login" />} />
          <Route path="/groups/:id/history" element={token ? <History token={token} /> : <Navigate to="/login" />} />
          <Route path="/groups/:id/settle" element={token ? <SettleDebt token={token} /> : <Navigate to="/login" />} />
          <Route 
            path="/" 
            element={token ? <Navigate to="/groups" replace /> : <Navigate to="/login" replace />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;