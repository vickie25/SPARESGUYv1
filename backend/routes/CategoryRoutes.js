import express from 'express';
import { createCategory, getCategories, updateCategory } from '../Controllers/CategoryController.js';
import authMiddleware from '../Middleware/AuthMiddleware.js';
import requireAdmin from '../Middleware/roleMiddleware.js';

const router = express.Router();

// Route to create a category (Admin only)
router.post('/', authMiddleware, requireAdmin, createCategory);

// Route to get all categories (Public access)
router.get('/', getCategories);

// Route to update a category (Admin only)
router.put('/:categoryId', authMiddleware, requireAdmin, updateCategory);

export default router;
