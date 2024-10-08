import express from 'express';
import connectDB from './Config/db.js';
import userRoutes from './Routes/UserRoutes.js';
import { authMiddleware } from './Middleware/AuthMiddleware.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

// Middleware
app.use(express.json());

// Connect to the database
connectDB();

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// Use routes
app.use('/api/users', userRoutes);

// // Product Routes 
// app.use('/api/products', productRoutes);

// Protect the profile route
app.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: `Welcome, ${req.user.userId}!` });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
