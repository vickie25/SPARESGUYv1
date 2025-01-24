import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Models/User.js'; // Corrected casing for import
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body; // Updated to use name and email

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email }); // Check by email
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body; // Updated to use email

    try {
        // Find the user
        const user = await User.findOne({ email }); // Check by email
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Use environment variable

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
});

export default router;
