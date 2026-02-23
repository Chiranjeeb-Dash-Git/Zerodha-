const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    portfolio: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Portfolio'
    }],
    watchlist: [{
        symbol: String,
        addedAt: Date
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    orders: [{
        symbol: String,
        quantity: Number,
        type: {
            type: String,
            enum: ['buy', 'sell'],
            required: true
        },
        price: Number,
        status: {
            type: String,
            enum: ['pending', 'completed', 'cancelled'],
            default: 'pending'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = mongoose.model('User', userSchema);