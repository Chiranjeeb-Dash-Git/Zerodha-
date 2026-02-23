import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const OrderModal = ({ show, onHide, stock, action, onSubmit }) => {
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState(stock?.price || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      stockId: stock?.id,
      stockName: stock?.name,
      quantity,
      amount,
      action,
      totalAmount: quantity * amount,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{action} {stock?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Current Market Price</Form.Label>
            <Form.Control type="text" value={`₹${stock?.price}`} disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control 
              type="number" 
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Total Amount</Form.Label>
            <Form.Control 
              type="text" 
              value={`₹${(quantity * stock?.price).toFixed(2)}`} 
              disabled 
            />
          </Form.Group>
          <div className="d-grid">
            <Button variant={action === 'BUY' ? 'success' : 'danger'} type="submit">
              Confirm {action}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default OrderModal;