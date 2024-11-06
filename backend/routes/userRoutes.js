//user routes

import express from 'express';
import { registerUser, loginUser, getUserProfile, getUsers,deleteUser, getUserById } from '../Controllers/userController.js';
import authMiddleware from '../Middleware/AuthMiddleware.js';
import requireAdmin from '../Middleware/roleMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, requireAdmin, getUserProfile);
router.get('/', getUsers)
router.put('/profile', authMiddleware, requireAdmin, getUserProfile);
router.delete('/profile', authMiddleware, requireAdmin, deleteUser);
router.get('/id', authMiddleware, requireAdmin, getUserById);

export default router;

