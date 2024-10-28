import express from 'express';
import connectDB from './Config/db.js';
import cors from 'cors';
import userRoutes from './routes/UserRoutes.js';
import productRoutes from './routes/productRoutes.js';
import paymentInfoRoutes from './routes/paymentInfoRoutes.js';
import authMiddleware from './Middleware/AuthMiddleware.js';
import cartRoutes from './routes/cartRoutes.js';
import OrderRoutes from './routes/OrderRoutes.js'; // Correct import
import deliveryScheRoutes from './routes/deliveryScheRoutes.js'; // Correct import
import { requireAdmin } from './Middleware/roleMiddleware.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors()); // Enable CORS for all routes
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

// Cart routes
app.use('/api/cart', cartRoutes);

// Payment routes
app.use('/api/payments', paymentInfoRoutes);

// Order routes
app.use('/api/order', OrderRoutes);

// Delivery routes
app.use('/api/delivery', deliveryScheRoutes); // Use the correct route

// Protect the profile route
app.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: `Welcome, ${req.user.userId}!` });
});

// Protect the admin dashboard route
app.get('/admin/dashboard', authMiddleware, requireAdmin, (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
