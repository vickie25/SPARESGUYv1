import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import googleAuth from './routes/googleAuth.js'; // Importing the Google authentication route
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();

// Log Google Client ID and Secret for debugging
console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
console.log("Google Client Secret:", process.env.GOOGLE_CLIENT_SECRET);

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Use the Google authentication route
app.use('/api', googleAuth);

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch(err => console.error(err));
