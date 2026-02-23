const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const MarketData = require('../models/MarketData');

// Get all market data
router.get('/', auth, async (req, res) => {
    try {
        const marketData = await MarketData.find();
        res.json(marketData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get market data for a specific symbol
router.get('/:symbol', auth, async (req, res) => {
    try {
        const marketData = await MarketData.findOne({ symbol: req.params.symbol.toUpperCase() });
        if (!marketData) {
            return res.status(404).json({ msg: 'Market data not found for this symbol' });
        }
        res.json(marketData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update market data (This would typically be done by an admin or automated system)
router.put('/:symbol', auth, async (req, res) => {
    try {
        const { currentPrice, high, low, volume, change, changePercent } = req.body;
        
        let marketData = await MarketData.findOne({ symbol: req.params.symbol.toUpperCase() });
        
        if (!marketData) {
            return res.status(404).json({ msg: 'Market data not found for this symbol' });
        }

        marketData.currentPrice = currentPrice || marketData.currentPrice;
        marketData.high = high || marketData.high;
        marketData.low = low || marketData.low;
        marketData.volume = volume || marketData.volume;
        marketData.change = change || marketData.change;
        marketData.changePercent = changePercent || marketData.changePercent;
        marketData.lastUpdated = Date.now();

        await marketData.save();
        res.json(marketData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;