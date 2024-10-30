import express from 'express';
import connectDB from './Config/db.js';

import userRoutes from './routes/userRoutes.js';

import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

import productRoutes from './routes/productRoutes.js'
import paymentInfoRoutes from './routes/paymentInfoRoutes.js'
import authMiddleware from './Middleware/AuthMiddleware.js';
import cartRoutes from './routes/cartRoutes.js'
import deliveryInfoRoutes from './routes/deliveryInfoRoute.js'
import { requireAdmin } from './Middleware/roleMiddleware.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Middleware
app.use(express.json());

// Serve files in the uploads directory
app.use('/uploads', express.static('uploads'));

// Connect to the database
connectDB();

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// User routes
app.use('/api/users', userRoutes);


// Product routes
app.use('/api/products', productRoutes);

//Cart routes
app.use('/api/cart', cartRoutes);


// payment routes

app.use('/api/payments', paymentInfoRoutes);
// deliveryInfo routes

app.use('/api/deliveryInfo', deliveryInfoRoutes);

// Protect the profile route
app.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: `Welcome, ${req.user.userId}!` });
});

// Protect the admin dashboard route
app.get('/admin/dashboard', authMiddleware, requireAdmin, (req, res) => {
    res.json({ message: "Welcome to the admin dashboard" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

