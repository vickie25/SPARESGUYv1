import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../Models/User.js'; // Import the User model

const router = express.Router();

// Google authentication route
router.post('/auth/google', passport.authenticate('google-token'), async (req, res) => {
    if (req.user) {
        // User is authenticated, create a JWT token
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: req.user });
    } else {
        res.status(401).json({ message: 'User not authenticated' });
    }
});

// Passport Google strategy configuration
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        // Check if the user already exists
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            // If not, create a new user
            user = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
                picture: profile.photos[0].value,
            });
        }

        done(null, user);
    } catch (error) {
        done(error, null);
    }
}));

export default router;
