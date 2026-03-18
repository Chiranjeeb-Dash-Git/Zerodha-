import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './TradingView.css';
import TradeModal from './TradeModal';

// Remove unused imports
// import Portfolio from './Portfolio';
// import OrderHistory from './OrderHistory';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function TradingView() {
    const navigate = useNavigate();  // Add this line
    const [selectedStock, setSelectedStock] = useState(null);
    const [tradeModal, setTradeModal] = useState({ isOpen: false, stock: null, action: null });
    const [portfolio, setPortfolio] = useState([]);
    const [orders, setOrders] = useState([]);
    const [stocks, setStocks] = useState([
        { id: 1, symbol: 'TCS', name: 'Tata Consultancy Services', price: 3500, change: '+2.5%', volume: '1.2M' },
        { id: 2, symbol: 'INFY', name: 'Infosys Limited', price: 1800, change: '-1.2%', volume: '980K' },
        { id: 3, symbol: 'RELIANCE', name: 'Reliance Industries', price: 2400, change: '+1.8%', volume: '2.1M' },
        { id: 4, symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1600, change: '+0.5%', volume: '1.5M' },
        { id: 5, symbol: 'WIPRO', name: 'Wipro Limited', price: 420, change: '-0.8%', volume: '750K' },
        { id: 6, symbol: 'ITC', name: 'ITC Limited', price: 380, change: '+1.5%', volume: '3.2M' },
        { id: 7, symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 780, change: '-1.0%', volume: '890K' },
        { id: 8, symbol: 'HINDUNILVR', name: 'Hindustan Unilever', price: 2600, change: '+0.7%', volume: '450K' },
        { id: 9, symbol: 'SBIN', name: 'State Bank of India', price: 550, change: '+1.2%', volume: '4.1M' },
        { id: 10, symbol: 'ASIANPAINT', name: 'Asian Paints', price: 3200, change: '-0.5%', volume: '320K' }
    ]);

    const [chartData, setChartData] = useState({
        labels: Array.from({length: 20}, (_, i) => `${9 + Math.floor(i/2)}:${i%2 ? '30' : '00'}`),
        datasets: [{
            label: 'Stock Price',
            data: Array.from({length: 20}, () => Math.random() * 1000 + 2000),
            tension: 0.1,
            backgroundColor: (context) => {
                const chart = context.chart;
                const { chartArea } = chart; // Remove unused 'ctx'
                if (!chartArea) return null;

                const dataPoint = context.dataset.data[context.dataIndex];
                const prevDataPoint = context.dataset.data[context.dataIndex - 1];
                
                return dataPoint >= prevDataPoint 
                    ? 'rgba(40, 167, 69, 0.6)'
                    : 'rgba(220, 53, 69, 0.6)';
            },
            // Remove duplicate borderColor and combine into single function
            borderColor: (context) => {
                const dataPoint = context.dataset.data[context.dataIndex];
                const prevDataPoint = context.dataset.data[context.dataIndex - 1];
                return dataPoint >= prevDataPoint 
                    ? 'rgb(40, 167, 69)'
                    : 'rgb(220, 53, 69)';
            },
            borderWidth: 2
        }]
    });

    // Load data from localStorage on component mount
    useEffect(() => {
        const savedPortfolio = localStorage.getItem('portfolio');
        if (savedPortfolio) {
            setPortfolio(JSON.parse(savedPortfolio));
        }
        
        const savedOrders = localStorage.getItem('orders');
        if (savedOrders) {
            setOrders(JSON.parse(savedOrders));
        }
    }, []);

    // Save portfolio to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('portfolio', JSON.stringify(portfolio));
    }, [portfolio]);

    // Save orders to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    useEffect(() => {
        // Simulate real-time updates
        const interval = setInterval(() => {
            setStocks(prevStocks => 
                prevStocks.map(stock => ({
                    ...stock,
                    price: stock.price * (1 + (Math.random() - 0.5) * 0.02),
                    change: `${(Math.random() - 0.5) > 0 ? '+' : '-'}${(Math.random() * 2).toFixed(1)}%`
                }))
            );

            // Update chart data
            setChartData(prevData => ({
                ...prevData,
                datasets: [{
                    ...prevData.datasets[0],
                    data: [...prevData.datasets[0].data.slice(1), 
                           prevData.datasets[0].data[prevData.datasets[0].data.length - 1] * 
                           (1 + (Math.random() - 0.5) * 0.02)]
                }]
            }));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const handleTrade = (stockId, action) => {
        // For sell action, we need to find the current market price
        const stock = stocks.find(s => s.id === stockId);
        if (!stock && action === 'SELL') {
            // If selling from portfolio, find the stock by symbol
            const portfolioStock = stocks.find(s => s.symbol === stockId);
            if (portfolioStock) {
                setTradeModal({ isOpen: true, stock: portfolioStock, action });
                return;
            }
        }
        setTradeModal({ isOpen: true, stock, action });
    };

    const handleTradeConfirm = (tradeDetails) => {
        if (tradeDetails.type === 'BUY') {
            // Update portfolio
            const existingPosition = portfolio.find(p => p.symbol === tradeDetails.symbol);
            if (existingPosition) {
                const newQuantity = existingPosition.quantity + tradeDetails.quantity;
                const newAvgPrice = ((existingPosition.avgPrice * existingPosition.quantity) + 
                                   (tradeDetails.price * tradeDetails.quantity)) / newQuantity;
                setPortfolio(portfolio.map(p => 
                    p.symbol === tradeDetails.symbol 
                        ? { ...p, quantity: newQuantity, avgPrice: newAvgPrice }
                        : p
                ));
            } else {
                setPortfolio([...portfolio, {
                    symbol: tradeDetails.symbol,
                    quantity: tradeDetails.quantity,
                    avgPrice: tradeDetails.price,
                    priceHistory: {
                        labels: [new Date().toLocaleTimeString()],
                        datasets: [{
                            data: [tradeDetails.price],
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        }]
                    }
                }]);
            }
        } else {
            // Handle SELL
            const position = portfolio.find(p => p.symbol === tradeDetails.symbol);
            if (position) {
                const profitLoss = (tradeDetails.price - position.avgPrice) * tradeDetails.quantity;
                tradeDetails.profitLoss = profitLoss;

                if (position.quantity === tradeDetails.quantity) {
                    setPortfolio(portfolio.filter(p => p.symbol !== tradeDetails.symbol));
                } else {
                    setPortfolio(portfolio.map(p =>
                        p.symbol === tradeDetails.symbol
                            ? { ...p, quantity: p.quantity - tradeDetails.quantity }
                            : p
                    ));
                }
            }
        }

        // Add to order history
        setOrders([tradeDetails, ...orders]);
    };

    return (
        <div className="trading-view-container">
            {/* ── Top Stats Bar ── */}
            <div className="trading-stats-bar">
                <div className="stat-item">
                    <span className="stat-label">SENSEX</span>
                    <span className="stat-value up">74,339 <small>+0.62%</small></span>
                </div>
                <div className="stat-sep" />
                <div className="stat-item">
                    <span className="stat-label">NIFTY 50</span>
                    <span className="stat-value up">22,519 <small>+0.58%</small></span>
                </div>
                <div className="stat-sep" />
                <div className="stat-item">
                    <span className="stat-label">BANK NIFTY</span>
                    <span className="stat-value down">48,012 <small>-0.21%</small></span>
                </div>
                <div className="stat-sep" />
                <div className="stat-item">
                    <span className="stat-label">INDIA VIX</span>
                    <span className="stat-value">14.32</span>
                </div>
                <div className="stat-sep" />
                <div className="stat-item">
                    <span className="stat-label">USD/INR</span>
                    <span className="stat-value down">83.72 <small>-0.09%</small></span>
                </div>
            </div>

            {/* ── Two-Column Body ── */}
            <div className="trading-body">
                {/* Chart Panel */}
                <div className="chart-section">
                    <div className="chart-section-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {selectedStock ? (
                                <span className="selected-stock-tag">
                                    <i className="fas fa-chart-line" />
                                    {selectedStock.symbol} — {selectedStock.name}
                                </span>
                            ) : (
                                <h3>Market Overview</h3>
                            )}
                        </div>
                        <span className="live-badge">● Live</span>
                    </div>
                    <div className="chart-container">
                        <Line 
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { display: false },
                                    title: { display: false }
                                },
                                scales: {
                                    y: {
                                        beginAtZero: false,
                                        grid: { color: 'rgba(255,255,255,0.04)' },
                                        ticks: { color: '#4a5568', font: { size: 11 } },
                                        border: { color: 'transparent' }
                                    },
                                    x: {
                                        grid: { display: false },
                                        ticks: { color: '#4a5568', font: { size: 11 } },
                                        border: { color: 'rgba(255,255,255,0.04)' }
                                    }
                                },
                                elements: {
                                    line: { tension: 0.4, borderWidth: 2 },
                                    point: { radius: 0, hoverRadius: 5 }
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Market Watch Panel */}
                <div className="market-watch">
                    <div className="market-watch-header">
                        <div>
                            <h2>Market Watch</h2>
                            <span className="stocks-count">{stocks.length} stocks</span>
                        </div>
                        <button className="my-orders-btn" onClick={() => navigate('/my-orders')}>
                            <i className="fas fa-clipboard-list" /> My Orders
                        </button>
                    </div>
                    <div className="stocks-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Symbol</th>
                                    <th>Price</th>
                                    <th>Chg%</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stocks.map(stock => (
                                    <tr key={stock.id} onClick={() => setSelectedStock(stock)}>
                                        <td>
                                            <div className="stock-symbol-cell">{stock.symbol}</div>
                                            <div className="stock-name-cell">{stock.name}</div>
                                        </td>
                                        <td className="stock-price-cell">₹{stock.price.toFixed(2)}</td>
                                        <td className={stock.change.startsWith('+') ? 'positive' : 'negative'}>
                                            {stock.change}
                                        </td>
                                        <td>
                                            <div className="actions-cell">
                                                <button 
                                                    className="buy-btn"
                                                    onClick={(e) => { e.stopPropagation(); handleTrade(stock.id, 'BUY'); }}
                                                >
                                                    <i className="fas fa-arrow-up" /> B
                                                </button>
                                                <button 
                                                    className="sell-btn"
                                                    onClick={(e) => { e.stopPropagation(); handleTrade(stock.id, 'SELL'); }}
                                                >
                                                    <i className="fas fa-arrow-down" /> S
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <TradeModal
                isOpen={tradeModal.isOpen}
                onClose={() => setTradeModal({ isOpen: false, stock: null, action: null })}
                stock={tradeModal.stock}
                action={tradeModal.action}
                onConfirm={handleTradeConfirm}
                portfolio={portfolio}
            />
        </div>
    );
}

export default TradingView;