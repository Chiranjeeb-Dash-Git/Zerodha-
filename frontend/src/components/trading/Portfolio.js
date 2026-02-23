import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './Portfolio.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Portfolio({ portfolio, currentPrices, onSell }) {
    const [updatedPortfolio, setUpdatedPortfolio] = useState([]);
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const interval = setInterval(() => {
            if (!portfolio?.length || !currentPrices) return;

            const updated = portfolio.map(holding => {
                const symbol = holding.symbol;
                const marketPrice = parseFloat(currentPrices[symbol]);
                const currentPrice = !isNaN(marketPrice) ? marketPrice : holding.currentPrice;
                const avgPrice = parseFloat(holding.avgPrice) || 0;
                const quantity = parseInt(holding.quantity) || 0;
                
                const totalValue = currentPrice * quantity;
                const profitLoss = (currentPrice - avgPrice) * quantity;
                const profitLossPercentage = ((currentPrice - avgPrice) / avgPrice) * 100;

                const newDataPoint = {
                    time: new Date(),
                    price: currentPrice,
                    profitLoss
                };

                const historicalData = [...(holding.historicalData || []), newDataPoint].slice(-10);

                return {
                    ...holding,
                    currentPrice,
                    totalValue,
                    profitLoss,
                    profitLossPercentage,
                    historicalData
                };
            });

            setUpdatedPortfolio(updated);

            const chartDataUpdated = {};
            updated.forEach(holding => {
                chartDataUpdated[holding.symbol] = {
                    labels: holding.historicalData.map(d => d.time.toLocaleTimeString()),
                    datasets: [{
                        label: `${holding.symbol} Price Movement`,
                        data: holding.historicalData.map(d => d.price),
                        backgroundColor: holding.profitLoss >= 0 ? 'rgba(40, 167, 69, 0.6)' : 'rgba(220, 53, 69, 0.6)',
                        borderColor: holding.profitLoss >= 0 ? 'rgb(40, 167, 69)' : 'rgb(220, 53, 69)',
                        borderWidth: 1
                    }]
                };
            });
            setChartData(chartDataUpdated);
        }, 1000);

        return () => clearInterval(interval);
    }, [portfolio, currentPrices]);

    return (
        <div className="portfolio-grid">
            {updatedPortfolio.map((holding) => (
                <div key={holding.symbol} className="portfolio-card">
                    <h3>{holding.symbol}</h3>
                    <div className="holding-details">
                        <div>Quantity: {holding.quantity}</div>
                        <div>Avg. Buy Price: ₹{holding.avgPrice?.toFixed(2) || '0.00'}</div>
                        <div>Current Price: ₹{holding.currentPrice?.toFixed(2) || '0.00'}</div>
                        <div className={`profit-loss ${holding.profitLoss >= 0 ? 'positive' : 'negative'}`}>
                            P/L: ₹{holding.profitLoss?.toFixed(2) || '0.00'} 
                            ({holding.profitLossPercentage?.toFixed(2) || '0.00'}%)
                        </div>
                    </div>
                    <div className="chart-container">
                        {chartData[holding.symbol] && (
                            <Bar 
                                data={chartData[holding.symbol]}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    animation: {
                                        duration: 300
                                    },
                                    scales: {
                                        y: {
                                            beginAtZero: false,
                                            grid: {
                                                color: 'rgba(0, 0, 0, 0.1)'
                                            }
                                        }
                                    },
                                    plugins: {
                                        legend: {
                                            display: true,
                                            position: 'top'
                                        }
                                    }
                                }}
                            />
                        )}
                    </div>
                    <button 
                        className="sell-btn" 
                        onClick={() => onSell(holding)}
                    >
                        Sell
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Portfolio;