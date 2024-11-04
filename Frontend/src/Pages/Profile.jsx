// Profile.jsx
import React from 'react';
import { useUser } from './UserContext';

const Profile = () => {
  const { user } = useUser();

  return (
    <div className="profile">
      {user && <h2>Welcome, {user.name}!</h2>}
    </div>
  );
};

export default Profile;
