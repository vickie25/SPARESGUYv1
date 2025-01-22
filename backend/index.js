
import express from 'express';
import connectDB from './Config/db.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import productRoutes from './routes/productRoutes.js';
import relatedProductsRoutes from './routes/relatedProductsRoutes.js'
import CategoryRoutes from './routes/CategoryRoutes.js';
import paymentInfoRoutes from './routes/paymentInfoRoutes.js';
import AuthMiddleware from './Middleware/AuthMiddleware.js';
import authMiddleware from './Middleware/AuthMiddleware.js';
import cartRoutes from './routes/cartRoutes.js';
import ReviewRoutes from './routes/ReviewRoutes.js';
import OrderRoutes from './routes/OrderRoutes.js';
import CheckoutRoutes from './routes/CheckoutRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import deliveryScheRoutes from './routes/deliveryScheRoutes.js';
import { requireAdmin } from './Middleware/roleMiddleware.js';
import NotificationRoutes from './routes/NotificationRoutes.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config();


const app = express();
const PORT = process.env.PORT || 8000;


// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(cookieParser()); // To parse cookies from the request
app.use(express.json()); // Make sure body data can be parsed


// Serve files in the uploads directory
app.use('/uploads', express.static('uploads'));


// Connect to the database
connectDB();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendPath = path.join(__dirname, '../Frontend/dist'); // Adjust the path if needed
app.use(express.static(frontendPath));

// Fallback for React SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// User routes
app.use('/api/users', userRoutes);

// Product routes
app.use('/api/products', productRoutes);


// related Product routes
app.use('/api/', relatedProductsRoutes);

// ContactUs routes
app.use('/api/contact', contactRoutes);

// Cart routes
app.use('/api/cart', cartRoutes);

// Payment routes
app.use('/api/payments', paymentInfoRoutes);

// Order routes
app.use('/api/orders', OrderRoutes);

// Review routes
app.use('/api/review', ReviewRoutes);

// Checkout routes
app.use('/api/checkout', CheckoutRoutes);

// Delivery routes
app.use('/api/delivery', deliveryScheRoutes);

// Category routes
app.use('/api/categories', CategoryRoutes);

// Protect the profile route
app.get('/profile', AuthMiddleware, (req, res) => {
    res.json({ message: `Welcome, ${req.user.userId}!` });
});


// Notification routes
app.use('/api/notifications', NotificationRoutes);


// // Protect the profile route (example for a protected route)
// app.get('/profile', authMiddleware, (req, res) => {
//     res.json({ message: `Welcome, ${req.user.userId}!` });
// });


// Protect the admin dashboard route (example for an admin route)
app.get('/admin/dashboard', authMiddleware, requireAdmin, (req, res) => {


    res.json({ message: 'Welcome to the admin dashboard' });
});


// PayPal configuration endpoint
app.get('/api/config/paypal', (req, res) => res.send({
    clientId: process.env.PAYPAL_CLIENT_ID
}));


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


