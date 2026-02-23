import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';

function Dashboard() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    // Fetch portfolio and market data
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const portfolioRes = await axios.get(`${API_BASE}/api/portfolio`, { headers });
        const marketRes = await axios.get(`${API_BASE}/api/market`, { headers });
        
        setPortfolioData(portfolioRes.data);
        setMarketData(marketRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Your Portfolio</h1>
      {/* Add portfolio display components */}
      <h2>Market Overview</h2>
      {/* Add market data components */}
    </div>
  );
}

export default Dashboard;
