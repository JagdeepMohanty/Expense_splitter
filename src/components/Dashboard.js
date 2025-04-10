import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h3>Recent Groups</h3>
          {/* Groups summary will go here */}
        </div>
        <div className="dashboard-card">
          <h3>Recent Expenses</h3>
          {/* Expenses summary will go here */}
        </div>
        <div className="dashboard-card">
          <h3>Balance Summary</h3>
          {/* Balance summary will go here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
