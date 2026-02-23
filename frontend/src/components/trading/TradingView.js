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
            <div className="chart-section">
                <h3>{selectedStock ? selectedStock.name : 'Market Overview'}</h3>
                <div className="chart-container">
                    <Line 
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: 'Stock Price Movement'
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: false,
                                    grid: {
                                        color: 'rgba(0, 0, 0, 0.1)'
                                    }
                                },
                                x: {
                                    grid: {
                                        display: false
                                    }
                                }
                            },
                            elements: {
                                line: {
                                    tension: 0.4
                                },
                                point: {
                                    radius: 3,
                                    hoverRadius: 6
                                }
                            }
                        }}
                    />
                </div>
            </div>
            
            <div className="market-watch">
                <h2>Market Watch</h2>
                <div className="stocks-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Symbol</th>
                                <th>Company</th>
                                <th>Price</th>
                                <th>Change</th>
                                <th>Volume</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stocks.map(stock => (
                                <tr key={stock.id} onClick={() => setSelectedStock(stock)}>
                                    <td>{stock.symbol}</td>
                                    <td>{stock.name}</td>
                                    <td>₹{stock.price.toFixed(2)}</td>
                                    <td className={stock.change.startsWith('+') ? 'positive' : 'negative'}>
                                        {stock.change}
                                    </td>
                                    <td>{stock.volume}</td>
                                    <td>
                                        <button 
                                            className="buy-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleTrade(stock.id, 'BUY');
                                            }}
                                        >
                                            Buy
                                        </button>
                                        <button 
                                            className="sell-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleTrade(stock.id, 'SELL');
                                            }}
                                        >
                                            Sell
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button className="my-orders-btn" onClick={() => navigate('/my-orders')}>My Orders</button>
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