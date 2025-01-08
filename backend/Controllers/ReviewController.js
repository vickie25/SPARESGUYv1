import Review from '../Models/ReviewModel.js';

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews); 
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
};

export const createReview = async (req, res) => {
  const { name, email, rating, reviewText } = req.body;

  try {
   
    if (!name || !email || !reviewText || !rating) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newReview = new Review({ name, email, rating, reviewText });
    const savedReview = await newReview.save();

    res.status(201).json(savedReview);
  } catch (error) {
    console.error('Error creating review:', error.message);
    res.status(400).json({ message: error.message }); 
  }
};
