const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });
const app = express();

app.use(cors());
app.use(express.json());

// Check required environment variables
const requiredEnv = ['MONGODB_URI', 'JWT_SECRET'];
requiredEnv.forEach(envVar => {
    if (!process.env[envVar]) {
        console.warn(`WARNING: Environment variable ${envVar} is missing!`);
    } else {
        console.log(`Environment variable ${envVar} is set.`);
    }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zerodha')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        // Do not exit process, let the server start so it can respond to health checks
    });

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Zerodha Clone API is running' });
});

app.get('/healthz', (req, res) => {
    res.status(200).send('ok');
});

app.get('/api/debug', (req, res) => {
    res.json({
        env: process.env.NODE_ENV,
        hasJwtSecret: !!process.env.JWT_SECRET,
        mongoConnected: mongoose.connection.readyState === 1,
        mongoUriExists: !!process.env.MONGODB_URI
    });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api/market', require('./routes/market'));
app.use('/api/orders', require('./routes/orders'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
