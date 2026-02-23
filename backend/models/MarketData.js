const mongoose = require('mongoose');

const marketDataSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true,
        unique: true
    },
    companyName: String,
    currentPrice: Number,
    high: Number,
    low: Number,
    volume: Number,
    change: Number,
    changePercent: Number,
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('MarketData', marketDataSchema);