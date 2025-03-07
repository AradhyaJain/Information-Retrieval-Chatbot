import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Analytics() {
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/analytics');
        if (response.data && response.data.analytics) {
          setAnalytics(response.data.analytics);
        }
      } catch (error) {
        console.error("Error fetching analytics", error);
      }
    }
    fetchAnalytics();
  }, []);

  const labels = [
    "Health","Environment","Technology","Economy","Entertainment",
    "Sports","Politics","Education","Travel","Food","Chitchat"
  ];

  return (
    <div style={{ marginTop: '40px', width: '600px' }}>
      <h2>Analytics</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Topic</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Count</th>
          </tr>
        </thead>
        <tbody>
          {labels.map((label, index) => (
            <tr key={label}>
              <td style={{ borderBottom: '1px solid #ccc', padding: '5px' }}>{label}</td>
              <td style={{ borderBottom: '1px solid #ccc', padding: '5px' }}>{analytics[index] || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Analytics;
