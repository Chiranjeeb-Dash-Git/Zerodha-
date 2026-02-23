const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Portfolio = require('../models/Portfolio');

// Get user portfolio
router.get('/', auth, async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({ user: req.user.id });
        if (!portfolio) {
            return res.status(404).json({ msg: 'Portfolio not found' });
        }
        res.json(portfolio);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Add stock to portfolio
router.post('/add-stock', auth, async (req, res) => {
    try {
        const { symbol, quantity, price } = req.body;
        let portfolio = await Portfolio.findOne({ user: req.user.id });
        
        if (!portfolio) {
            portfolio = new Portfolio({
                user: req.user.id,
                stocks: [],
                totalInvestment: 0,
                currentValue: 0
            });
        }

        portfolio.stocks.push({
            symbol,
            quantity,
            averagePrice: price,
            currentPrice: price
        });

        await portfolio.save();
        res.json(portfolio);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;