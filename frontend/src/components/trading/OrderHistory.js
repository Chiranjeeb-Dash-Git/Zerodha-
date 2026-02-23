import React from 'react';
import './OrderHistory.css';

function OrderHistory({ orders }) {
    const handleDelete = (index) => {
        // Get current orders from localStorage
        const currentOrders = JSON.parse(localStorage.getItem('orders')) || [];
        // Remove the order at the specified index
        currentOrders.splice(index, 1);
        // Save back to localStorage
        localStorage.setItem('orders', JSON.stringify(currentOrders));
        // Refresh the page to show updated data
        window.location.reload();
    };

    return (
        <div className="orders-table">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Symbol</th>
                        <th>Type</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>P/L</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => {
                        const profitLoss = order.type === 'SELL' && order.avgBuyPrice 
                            ? (order.price - order.avgBuyPrice) * order.quantity
                            : null;
                            
                        return (
                            <tr key={index}>
                                <td>{new Date(order.date).toLocaleDateString()}</td>
                                <td>{order.symbol}</td>
                                <td className={order.type.toLowerCase()}>{order.type}</td>
                                <td>{order.quantity}</td>
                                <td>₹{order.price?.toFixed(2) || '0.00'}</td>
                                <td>₹{order.total?.toFixed(2) || '0.00'}</td>
                                <td className={profitLoss > 0 ? 'profit' : 'loss'}>
                                    {profitLoss !== null ? `₹${profitLoss.toFixed(2)}` : '-'}
                                </td>
                                <td>
                                    <span className={`status-badge status-${order.status?.toLowerCase()}`}>
                                        {order.status || 'Pending'}
                                    </span>
                                </td>
                                <td>
                                    <button 
                                        className="delete-btn" 
                                        onClick={() => handleDelete(index)}
                                        title="Delete order"
                                    >
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default OrderHistory;