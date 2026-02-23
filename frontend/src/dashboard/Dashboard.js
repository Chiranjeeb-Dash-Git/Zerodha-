import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    // Fetch portfolio and market data
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const portfolioRes = await axios.get('http://localhost:5000/api/portfolio', {
          headers: { 'x-auth-token': token }
        });
        const marketRes = await axios.get('http://localhost:5000/api/market', {
          headers: { 'x-auth-token': token }
        });
        
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