const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get all orders
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Place a new order
router.post('/', auth, async (req, res) => {
    try {
        const { symbol, quantity, type, price } = req.body;
        
        // Basic validation
        if (!symbol || !quantity || !type) {
            return res.status(400).json({ msg: 'Please provide all required fields' });
        }

        const order = {
            symbol,
            quantity,
            type,
            price,
            status: 'pending',
            createdAt: new Date()
        };

        // Add order to user's orders
        const user = await User.findById(req.user.id);
        if (!user.orders) {
            user.orders = [];
        }
        user.orders.push(order);
        await user.save();

        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Cancel an order
router.delete('/:orderId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const orderIndex = user.orders.findIndex(order => order._id.toString() === req.params.orderId);
        
        if (orderIndex === -1) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        // Only allow cancellation of pending orders
        if (user.orders[orderIndex].status !== 'pending') {
            return res.status(400).json({ msg: 'Can only cancel pending orders' });
        }

        user.orders[orderIndex].status = 'cancelled';
        await user.save();

        res.json({ msg: 'Order cancelled successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;