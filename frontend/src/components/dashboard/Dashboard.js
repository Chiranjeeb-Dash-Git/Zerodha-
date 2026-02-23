import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
    const [portfolio, setPortfolio] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [watchlist, setWatchlist] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const config = {
                headers: { 'x-auth-token': token }
            };

            try {
                const [portfolioRes, ordersRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/portfolio', config),
                    axios.get('http://localhost:5000/api/orders', config)
                ]);

                setPortfolio(portfolioRes.data);
                setOrders(ordersRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="dashboard-container">
            <div className="portfolio-section">
                <h2>Portfolio Overview</h2>
                {portfolio && (
                    <div className="portfolio-stats">
                        <div className="stat-card">
                            <h3>Total Value</h3>
                            <p>₹{portfolio.currentValue}</p>
                        </div>
                        <div className="stat-card">
                            <h3>Total Investment</h3>
                            <p>₹{portfolio.totalInvestment}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="orders-section">
                <h2>Recent Orders</h2>
                <div className="orders-list">
                    {orders.map(order => (
                        <div key={order._id} className="order-card">
                            <h3>{order.symbol}</h3>
                            <p>Type: {order.type}</p>
                            <p>Quantity: {order.quantity}</p>
                            <p>Status: {order.status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;