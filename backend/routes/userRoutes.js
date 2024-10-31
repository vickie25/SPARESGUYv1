//user routes

import express from 'express';
import { registerUser, loginUser, getUserProfile, getUsers } from '../Controllers/userController.js';
import authMiddleware from '../Middleware/AuthMiddleware.js';
import requireAdmin from '../Middleware/roleMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, requireAdmin, getUserProfile);
router.get('/', getUsers)
router.put('/profile', authMiddleware, requireAdmin, getUserProfile);

export default router;

