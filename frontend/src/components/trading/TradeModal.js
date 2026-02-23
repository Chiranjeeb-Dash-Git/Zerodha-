import React, { useState } from 'react';
import './TradeModal.css';

function TradeModal({ isOpen, onClose, stock, action, onConfirm, portfolio }) {  // Added portfolio prop
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(stock?.price || 0);
    const [error, setError] = useState('');

    // Update price when stock changes
    React.useEffect(() => {
        if (stock?.price) {
            setPrice(stock.price);
        }
    }, [stock]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        
        // Guard clause to prevent undefined stock access
        if (!stock) {
            setError('No stock selected for trade');
            return;
        }

        // For sell orders, check if user has enough quantity
        if (action === 'SELL') {
            const position = portfolio?.find(p => p.symbol === stock.symbol);
            if (!position) {
                setError('You don\'t own this stock');
                return;
            }
            if (position.quantity < parseInt(quantity)) {
                setError(`You only have ${position.quantity} shares to sell`);
                return;
            }
        }

        onConfirm({
            stockId: stock.id,
            symbol: stock.symbol,
            quantity: parseInt(quantity),
            price: parseFloat(price),
            timestamp: new Date().toISOString(),
            type: action
        });
        
        // Reset form
        setQuantity(1);
        setPrice(stock.price);
        setError('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{action} {stock?.symbol || 'Stock'}</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Quantity</label>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Price (₹)</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="modal-actions">
                        <button 
                            type="submit" 
                            className="confirm-btn"
                            disabled={!stock}
                        >
                            Confirm {action}
                        </button>
                        <button 
                            type="button" 
                            className="cancel-btn" 
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TradeModal;