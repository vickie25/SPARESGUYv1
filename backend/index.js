import express from 'express';
import connectDB from './Config/db.js';
import userRoutes from './routes/userRoutes.js';
// import paymentInfoRoutes from './routes/paymentInfoRoutes.js'
import cors from 'cors';
import bodyParser from 'body-parser';
// import contactRoutes from './routes/contactRoutes.js';
import productRoutes from './routes/productRoutes.js';
import CategoryRoutes from './routes/CategoryRoutes.js';
import paymentInfoRoutes from './routes/paymentInfoRoutes.js';

import authMiddleware from './Middleware/AuthMiddleware.js';
import cartRoutes from './routes/cartRoutes.js';
import ReviewRoutes from './routes/ReviewRoutes.js';
import OrderRoutes from './routes/OrderRoutes.js';
import CheckoutRoutes from './routes/CheckoutRoutes.js'
import contactRoutes from './routes/contactRoutes.js';
import deliveryScheRoutes from './routes/deliveryScheRoutes.js';
import { requireAdmin } from './Middleware/roleMiddleware.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(express.json());
app.use(express.json());
app.use(cookieParser()); // To parse cookies from the request

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

// ContactUs routes
app.use('/api/contact', contactRoutes);

// Cart routes
app.use('/api/cart', cartRoutes);

// Payment routes
app.use('/api/payments', paymentInfoRoutes);

// Order routes
app.use('/api/order', OrderRoutes);

// Review routes
app.use('/api/review', ReviewRoutes);

// app.use('/api/contact', contactRoutes);
app.use('/api/chexckout', CheckoutRoutes)

// Delivery routes
app.use('/api/delivery', deliveryScheRoutes); // Use the correct route

// Category routes
app.use('/api/categories', CategoryRoutes);

// Protect the profile route
app.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: `Welcome, ${req.user.userId}!` });
});

// Protect the admin dashboard route
app.get('/admin/dashboard', authMiddleware, requireAdmin, (req, res) => {
    res.json({ message: 'Welcome to the admin dashboard' });
});
console.log(process.env.PAYPAL_CLIENT_ID);

app.get('/api/config/paypal', (req, res) => res.send({
    clientId: process.env.PAYPAL_CLIENT_ID}));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
