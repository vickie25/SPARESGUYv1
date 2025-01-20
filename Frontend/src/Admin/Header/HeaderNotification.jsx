import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import axios from 'axios';

const HeaderNotification = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!userId) {
      console.error("User ID is required");
      return;
    }

    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`/api/notifications/${userId}`);
        setNotifications(res.data);
        setUnreadCount(res.data.filter((notif) => !notif.read).length);
      } catch (err) {
        console.error('Error fetching notifications', err);
      }
    };

    fetchNotifications();
  }, [userId]);

  const handleClick = async () => {
    // Mark all notifications as read
    try {
      await Promise.all(
        notifications.map((notif) =>
          axios.patch(`/api/notifications/${notif._id}/read`)
        )
      );
      setUnreadCount(0);
    } catch (err) {
      console.error('Error marking notifications as read', err);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>
        <FaBell />
        {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
      </button>
      <div className="notifications-dropdown">
        {notifications.length === 0 ? (
          <div>No notifications</div>
        ) : (
          notifications.map((notif) => (
            <div key={notif._id} className={notif.read ? 'read' : 'unread'}>
              {notif.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HeaderNotification;
