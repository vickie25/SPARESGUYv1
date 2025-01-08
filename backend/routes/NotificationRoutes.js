import express from 'express';
import NotificationController from '../Controllers/NotificationController.js';

const router = express.Router();
router.post('/notifications', NotificationController.createNotification);
router.get('/notifications/:userId', NotificationController.getNotifications);
router.patch('/notifications/:notificationId/read', NotificationController.markAsRead);

export default router;
