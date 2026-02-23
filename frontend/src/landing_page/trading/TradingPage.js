import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TradingPage = () => {
  const [stocks, setStocks] = useState([
    { id: 1, name: 'TCS', price: 3500, change: '+2.5%' },
    { id: 2, name: 'Infosys', price: 1800, change: '-1.2%' },
    { id: 3, name: 'Reliance', price: 2400, change: '+1.8%' },
    { id: 4, name: 'HDFC Bank', price: 1600, change: '+0.5%' },
    { id: 5, name: 'Wipro', price: 420, change: '-0.8%' },
    { id: 6, name: 'ITC', price: 380, change: '+1.5%' },
    { id: 7, name: 'Bharti Airtel', price: 780, change: '-1.0%' },
    { id: 8, name: 'HUL', price: 2600, change: '+0.7%' },
    { id: 9, name: 'SBI', price: 550, change: '+1.2%' },
    { id: 10, name: 'Asian Paints', price: 3200, change: '-0.5%' }
  ]);

  const [chartData, setChartData] = useState({
    labels: ['9:15', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '15:30'],
    datasets: [{
      label: 'Stock Price',
      data: [3500, 3520, 3480, 3510, 3540, 3530, 3550, 3560],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Update stock prices randomly
      setStocks(prevStocks => 
        prevStocks.map(stock => ({
          ...stock,
          price: stock.price + (Math.random() - 0.5) * 10,
          change: `${(Math.random() - 0.5) > 0 ? '+' : '-'}${(Math.random() * 2).toFixed(1)}%`
        }))
      );

      // Update chart data
      setChartData(prevData => ({
        ...prevData,
        datasets: [{
          ...prevData.datasets[0],
          data: [...prevData.datasets[0].data.slice(1), prevData.datasets[0].data[prevData.datasets[0].data.length - 1] + (Math.random() - 0.5) * 20]
        }]
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleTrade = (stockId, action) => {
    // Implement buy/sell logic here
    alert(`${action} order placed for stock ID: ${stockId}`);
  };

  return (
    <div className="container-fluid">
      <div className="row p-4">
        <div className="col-md-8">
          <div className="chart-container" style={{ height: '400px' }}>
            <Line 
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: false
                  }
                }
              }}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="stock-list">
            {stocks.map(stock => (
              <div key={stock.id} className="card mb-2">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="card-title mb-0">{stock.name}</h5>
                    <p className="card-text">
                      ₹{stock.price.toFixed(2)}
                      <span className={`ms-2 ${stock.change.startsWith('+') ? 'text-success' : 'text-danger'}`}>
                        {stock.change}
                      </span>
                    </p>
                  </div>
                  <div>
                    <button 
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleTrade(stock.id, 'BUY')}
                    >
                      Buy
                    </button>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => handleTrade(stock.id, 'SELL')}
                    >
                      Sell
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingPage;