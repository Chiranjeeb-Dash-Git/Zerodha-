import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PortfolioAnalysis.css';

function PortfolioAnalysis() {
    const [portfolio, setPortfolio] = useState(null);
    const [performance, setPerformance] = useState({
        daily: 0,
        weekly: 0,
        monthly: 0
    });

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/portfolio', {
                    headers: { 'x-auth-token': token }
                });
                setPortfolio(response.data);
            } catch (error) {
                console.error('Error fetching portfolio:', error);
            }
        };

        fetchPortfolio();
    }, []);

    return (
        <div className="portfolio-analysis">
            <h2>Portfolio Analysis</h2>
            <div className="performance-metrics">
                <div className="metric-card">
                    <h3>Current Value</h3>
                    <p>₹{portfolio?.currentValue || 0}</p>
                </div>
                <div className="metric-card">
                    <h3>Total Investment</h3>
                    <p>₹{portfolio?.totalInvestment || 0}</p>
                </div>
                <div className="metric-card">
                    <h3>Total Returns</h3>
                    <p className={portfolio?.currentValue - portfolio?.totalInvestment >= 0 ? 'positive' : 'negative'}>
                        ₹{(portfolio?.currentValue - portfolio?.totalInvestment) || 0}
                    </p>
                </div>
            </div>
            
            <div className="holdings">
                <h3>Your Holdings</h3>
                <div className="holdings-grid">
                    {portfolio?.stocks.map(stock => (
                        <div key={stock.symbol} className="holding-card">
                            <h4>{stock.symbol}</h4>
                            <p>Quantity: {stock.quantity}</p>
                            <p>Avg Price: ₹{stock.averagePrice}</p>
                            <p>Current Price: ₹{stock.currentPrice}</p>
                            <p className={stock.currentPrice - stock.averagePrice >= 0 ? 'positive' : 'negative'}>
                                P&L: ₹{((stock.currentPrice - stock.averagePrice) * stock.quantity).toFixed(2)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PortfolioAnalysis;