import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    // Fetch orders from localStorage or API
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
    
    // Separate active and completed orders
    setActiveOrders(savedOrders.filter(order => !order.soldAt));
    setOrderHistory(savedOrders.filter(order => order.soldAt));
  }, []);

  const handleSell = async (order) => {
    const currentPrice = order.stock.price + (Math.random() * 100 - 50); // Simulate price change
    const profit = ((currentPrice - order.amount) * order.quantity).toFixed(2);
    
    const updatedOrder = {
      ...order,
      soldAt: currentPrice,
      soldTimestamp: new Date().toISOString(),
      profit: Number(profit)
    };

    const updatedOrders = orders.map(o => 
      o.id === order.id ? updatedOrder : o
    );

    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    alert(`Order sold! ${profit >= 0 ? 'Profit' : 'Loss'}: ₹${Math.abs(profit)}`);
  };

  return (
    <div className="orders-container">
      <h2>Active Orders</h2>
      <div className="orders-grid">
        {activeOrders.map(order => (
          <div key={order.id} className="order-card">
            <h3>{order.stockName}</h3>
            <div className="order-details">
              <p>Quantity: {order.quantity}</p>
              <p>Buy Price: ₹{order.amount}</p>
              <p>Total: ₹{order.totalAmount}</p>
            </div>
            <div className="order-chart">
              <Line 
                data={order.chartData}
                options={{
                  responsive: true,
                  plugins: { legend: { display: false } }
                }}
              />
            </div>
            <button 
              className="sell-btn"
              onClick={() => handleSell(order)}
            >
              SELL
            </button>
          </div>
        ))}
      </div>

      <h2>Order History</h2>
      <div className="order-history">
        {orderHistory.map(order => (
          <div key={order.id} className="history-card">
            <div className="history-details">
              <h4>{order.stockName}</h4>
              <p>Buy: ₹{order.amount} | Sell: ₹{order.soldAt}</p>
              <p>Quantity: {order.quantity}</p>
              <p className={order.profit >= 0 ? 'profit' : 'loss'}>
                {order.profit >= 0 ? 'Profit' : 'Loss'}: ₹{Math.abs(order.profit)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;