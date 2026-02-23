const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    holdings: [{
        symbol: String,
        quantity: Number,
        averagePrice: Number,
        currentPrice: Number,
        lastUpdated: Date
    }],
    totalValue: {
        type: Number,
        default: 0
    },
    profitLoss: {
        type: Number,
        default: 0
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);