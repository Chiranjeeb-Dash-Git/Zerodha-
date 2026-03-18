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
    const navigate = useNavigate();
    const [selectedStock, setSelectedStock] = useState(null);
    const [tradeModal, setTradeModal] = useState({ isOpen: false, stock: null, action: null });
    const [portfolio, setPortfolio] = useState([]);
    const [orders, setOrders] = useState([]);

    // Generate time labels for today's session
    const sessionLabels = Array.from({ length: 20 }, (_, i) =>
        `${9 + Math.floor(i / 2)}:${i % 2 ? '30' : '00'}`
    );

    // Stock list with per-stock price history
    const [stocks, setStocks] = useState(() => {
        const initialStocks = [
            { id: 1, symbol: 'TCS',         name: 'Tata Consultancy Services', price: 3500, change: '+2.5%', volume: '1.2M' },
            { id: 2, symbol: 'INFY',        name: 'Infosys Limited',           price: 1800, change: '-1.2%', volume: '980K' },
            { id: 3, symbol: 'RELIANCE',    name: 'Reliance Industries',        price: 2400, change: '+1.8%', volume: '2.1M' },
            { id: 4, symbol: 'HDFCBANK',    name: 'HDFC Bank',                 price: 1600, change: '+0.5%', volume: '1.5M' },
            { id: 5, symbol: 'WIPRO',       name: 'Wipro Limited',              price: 420,  change: '-0.8%', volume: '750K' },
            { id: 6, symbol: 'ITC',         name: 'ITC Limited',               price: 380,  change: '+1.5%', volume: '3.2M' },
            { id: 7, symbol: 'BHARTIARTL',  name: 'Bharti Airtel',             price: 780,  change: '-1.0%', volume: '890K' },
            { id: 8, symbol: 'HINDUNILVR',  name: 'Hindustan Unilever',        price: 2600, change: '+0.7%', volume: '450K' },
            { id: 9, symbol: 'SBIN',        name: 'State Bank of India',       price: 550,  change: '+1.2%', volume: '4.1M' },
            { id: 10, symbol: 'ASIANPAINT', name: 'Asian Paints',              price: 3200, change: '-0.5%', volume: '320K' },
        ];
        // Seed 20 historical price points per stock
        return initialStocks.map(s => ({
            ...s,
            history: Array.from({ length: 20 }, (_, i) =>
                +(s.price * (1 + (Math.random() - 0.5) * 0.06 * (i / 20))).toFixed(2)
            )
        }));
    });

    // Build chartData from the selected stock's history (or a default "market" view)
    const buildChartData = (stockList, selected) => {
        const src = selected
            ? stockList.find(s => s.id === selected.id)
            : stockList[0]; // default to first stock
        const data = src ? src.history : [];
        const isUp = data.length > 1 && data[data.length - 1] >= data[0];
        const lineColor = isUp ? '#00e5a0' : '#ff5f7e';
        const fillColor = isUp ? 'rgba(0,229,160,0.08)' : 'rgba(255,95,126,0.08)';

        return {
            labels: sessionLabels,
            datasets: [{
                label: src ? src.symbol : 'Market',
                data,
                borderColor: lineColor,
                backgroundColor: fillColor,
                borderWidth: 2.5,
                tension: 0.4,
                fill: true,
                pointRadius: 0,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: lineColor,
            }]
        };
    };

    const [chartData, setChartData] = useState(() => buildChartData(stocks, null));

    // When user clicks a stock row, update chart immediately
    const handleSelectStock = (stock) => {
        setSelectedStock(stock);
        setChartData(buildChartData(stocks, stock));
    };

    // Load data from localStorage on component mount
    useEffect(() => {
        const savedPortfolio = localStorage.getItem('portfolio');
        if (savedPortfolio) setPortfolio(JSON.parse(savedPortfolio));
        const savedOrders = localStorage.getItem('orders');
        if (savedOrders) setOrders(JSON.parse(savedOrders));
    }, []);

    // Save portfolio & orders to localStorage whenever they change
    useEffect(() => { localStorage.setItem('portfolio', JSON.stringify(portfolio)); }, [portfolio]);
    useEffect(() => { localStorage.setItem('orders', JSON.stringify(orders)); }, [orders]);

    // Real-time price updates — also append to history & refresh chart
    useEffect(() => {
        const interval = setInterval(() => {
            setStocks(prevStocks => {
                const updated = prevStocks.map(stock => {
                    const newPrice = +(stock.price * (1 + (Math.random() - 0.5) * 0.02)).toFixed(2);
                    const diff = newPrice - stock.price;
                    const flashStatus = diff > 0 ? 'flash-up' : diff < 0 ? 'flash-down' : '';
                    const changePct = ((diff / stock.price) * 100).toFixed(1);
                    const newHistory = [...stock.history.slice(1), newPrice];
                    return {
                        ...stock,
                        price: newPrice,
                        change: `${diff >= 0 ? '+' : ''}${changePct}%`,
                        history: newHistory,
                        flashStatus: flashStatus
                    };
                });

                // Also refresh chart for the currently selected stock
                setChartData(prev => {
                    const sel = updated.find(s => s.symbol === prev.datasets[0]?.label);
                    return buildChartData(updated, sel || null);
                });

                return updated;
            });

            // Clear flash status after animation completes (1s in CSS)
            setTimeout(() => {
                setStocks(prevStocks => prevStocks.map(s => ({ ...s, flashStatus: '' })));
            }, 1000);
        }, 3000); // Slightly slower intervals for better visual clarity of flashes

        return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                            data={{
                                ...chartData,
                                datasets: chartData.datasets.map(ds => ({
                                    ...ds,
                                    fill: true,
                                    backgroundColor: (context) => {
                                        const ctx = context.chart.ctx;
                                        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                                        const color = ds.borderColor;
                                        gradient.addColorStop(0, color.replace(')', ', 0.2)').replace('rgb', 'rgba'));
                                        gradient.addColorStop(1, 'rgba(0,0,0,0)');
                                        return gradient;
                                    },
                                    shadowBlur: 15,
                                    shadowColor: ds.borderColor,
                                }))
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                animation: { duration: 1000, easing: 'easeInOutQuart' },
                                plugins: {
                                    legend: { display: false },
                                    tooltip: {
                                        enabled: true,
                                        backgroundColor: 'rgba(13, 17, 23, 0.95)',
                                        titleFont: { family: "'Outfit', sans-serif", size: 13, weight: '700' },
                                        bodyFont: { family: "'JetBrains Mono', monospace", size: 12 },
                                        padding: 12,
                                        borderColor: 'rgba(255,255,255,0.1)',
                                        borderWidth: 1,
                                        displayColors: false,
                                        callbacks: {
                                            label: (context) => ` ₹${context.parsed.y.toLocaleString('en-IN')}`
                                        }
                                    }
                                },
                                scales: {
                                    y: {
                                        beginAtZero: false,
                                        grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false },
                                        ticks: { 
                                            color: '#8e9aaf', 
                                            font: { family: "'JetBrains Mono', monospace", size: 10 },
                                            callback: (value) => '₹' + value.toLocaleString('en-IN')
                                        }
                                    },
                                    x: {
                                        grid: { display: false },
                                        ticks: { 
                                            color: '#8e9aaf', 
                                            font: { family: "'Outfit', sans-serif", size: 10 } 
                                        }
                                    }
                                },
                                elements: {
                                    line: { tension: 0.4, borderWidth: 3, capBezierPoints: true },
                                    point: { radius: 0, hoverRadius: 6, hoverBorderWidth: 2, hoverBackgroundColor: '#fff' }
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
                                    <tr
                                        key={stock.id}
                                        onClick={() => handleSelectStock(stock)}
                                        className={selectedStock?.id === stock.id ? 'active-row' : ''}
                                        style={selectedStock?.id === stock.id ? { background: 'rgba(0, 210, 255, 0.08)', borderLeft: '4px solid #00d2ff' } : {}}
                                    >
                                        <td>
                                            <div className="stock-symbol-cell">{stock.symbol}</div>
                                            <div className="stock-name-cell">{stock.name}</div>
                                        </td>
                                        <td className={`stock-price-cell ${stock.flashStatus || ''}`}>
                                            ₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </td>
                                        <td className={stock.change.startsWith('+') ? 'positive' : 'negative'}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <span>{stock.change}</span>
                                                {/* P&L Visual Bar */}
                                                <div style={{ width: '40px', height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                                                    <div style={{ 
                                                        width: `${Math.min(Math.abs(parseFloat(stock.change)) * 20, 100)}%`, 
                                                        height: '100%', 
                                                        background: stock.change.startsWith('+') ? 'var(--accent-green)' : 'var(--accent-red)',
                                                        boxShadow: `0 0 5px ${stock.change.startsWith('+') ? 'var(--accent-green)' : 'var(--accent-red)'}`
                                                    }} />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="actions-cell">
                                                <button
                                                    className="buy-btn"
                                                    onClick={(e) => { e.stopPropagation(); handleTrade(stock.id, 'BUY'); }}
                                                >
                                                    <i className="fas fa-long-arrow-alt-up" /> BUY
                                                </button>
                                                <button
                                                    className="sell-btn"
                                                    onClick={(e) => { e.stopPropagation(); handleTrade(stock.id, 'SELL'); }}
                                                >
                                                    <i className="fas fa-long-arrow-alt-down" /> SELL
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