// controllers/reviewController.js
import Review from '../Models/ReviewModel.js';

// Get all reviews
export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new review
export const createReview = async (req, res) => {
    const { name, email, rating, reviewText } = req.body;

    try {
        const newReview = new Review({ name, email, rating, reviewText });
        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
