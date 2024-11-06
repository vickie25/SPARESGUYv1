// routes/reviewRoutes.js
import express from 'express';
import { getReviews, createReview } from '../Controllers/ReviewController.js';

const router = express.Router();

// Route to get all reviews
router.get('/', getReviews);

// Route to create a new review
router.post('/', createReview);

export default router;
