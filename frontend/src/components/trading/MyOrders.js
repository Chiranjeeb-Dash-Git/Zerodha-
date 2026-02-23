import React, { useState, useEffect } from 'react';
import Portfolio from './Portfolio';
import './MyOrders.css';

function MyOrders() {
    const [portfolio, setPortfolio] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);
    const [currentPrices, setCurrentPrices] = useState({});

    useEffect(() => {
        // Load portfolio from localStorage
        const savedPortfolio = JSON.parse(localStorage.getItem('portfolio')) || [];
        setPortfolio(savedPortfolio);

        // Load order history from localStorage
        const savedHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
        setOrderHistory(savedHistory);

        // Set up interval to simulate price updates
        const interval = setInterval(() => {
            const prices = {};
            savedPortfolio.forEach(holding => {
                // Simulate price movement within ±5% of avg price
                const avgPrice = holding.avgPrice;
                const minPrice = avgPrice * 0.95;
                const maxPrice = avgPrice * 1.05;
                prices[holding.symbol] = +(minPrice + Math.random() * (maxPrice - minPrice)).toFixed(2);
            });
            setCurrentPrices(prices);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const handleSell = (holding) => {
        const currentPrice = currentPrices[holding.symbol] || holding.avgPrice;
        const profitLoss = (currentPrice - holding.avgPrice) * holding.quantity;
        
        // Create sell order record with profit/loss
        const sellOrder = {
            symbol: holding.symbol,
            type: 'SELL',
            quantity: holding.quantity,
            price: currentPrice,
            profitLoss: profitLoss,
            timestamp: new Date().toISOString()
        };

        // Update order history
        const updatedHistory = [...orderHistory, sellOrder];
        setOrderHistory(updatedHistory);
        localStorage.setItem('orderHistory', JSON.stringify(updatedHistory));

        // Remove from portfolio
        const updatedPortfolio = portfolio.filter(item => item.symbol !== holding.symbol);
        setPortfolio(updatedPortfolio);
        localStorage.setItem('portfolio', JSON.stringify(updatedPortfolio));
    };

    return (
        <div className="my-orders-container">
            <div className="portfolio-section">
                <h2>Portfolio</h2>
                <Portfolio 
                    portfolio={portfolio}
                    currentPrices={currentPrices}
                    onSell={handleSell}
                />
            </div>

            <div className="order-history-section">
                <h2>Order History</h2>
                <div className="orders-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Symbol</th>
                                <th>Type</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Profit/Loss</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderHistory.map((order, index) => (
                                <tr key={index}>
                                    <td>{order.symbol}</td>
                                    <td>{order.type}</td>
                                    <td>{order.quantity}</td>
                                    <td>₹{order.price?.toFixed(2)}</td>
                                    <td className={order.profitLoss >= 0 ? 'profit' : 'loss'}>
                                        {order.profitLoss >= 0 ? '+' : ''}₹{order.profitLoss?.toFixed(2)}
                                    </td>
                                    <td>{new Date(order.timestamp).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default MyOrders;