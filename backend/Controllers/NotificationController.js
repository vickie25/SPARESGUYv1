import NotificationModel from '../Models/NotificationModel.js';

export const createNotification = async (req, res) => {
  try {
    const { userId, message, type } = req.body;
    if (!userId || !message || !type) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newNotification = new NotificationModel({
      user: userId,
      message,
      type,
    });

    await newNotification.save();
    res.status(201).json({ message: 'Notification created successfully', newNotification });
  } catch (err) {
    console.error('Error creating notification:', err);
    res.status(500).json({ message: 'Error creating notification', error: err });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const notifications = await NotificationModel.find({ user: req.params.userId });

    if (!notifications || notifications.length === 0) {
      return res.status(404).json({ message: 'No notifications found' });
    }

    res.status(200).json(notifications);
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ message: 'Error fetching notifications' });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const notification = await NotificationModel.findById(req.params.notificationId);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.read = true;
    await notification.save();

    res.status(200).json({ message: 'Notification marked as read' });
  } catch (err) {
    console.error('Error marking notification as read:', err);
    res.status(500).json({ message: 'Error marking notification as read' });
  }
};

export default {
  createNotification,
  getNotifications,
  markAsRead,
};
