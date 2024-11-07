import React from 'react';
import cat from './AboutUsImages/cat.webp';
import dog from './AboutUsImages/dog.webp';
import goat from './AboutUsImages/goat.webp';
import mouse from './AboutUsImages/mouse.webp';
import rabbit from './AboutUsImages/rabbit.webp';
import './AboutUsCSS/Team.css'; // Ensure this path is correct

const teamMembers = [
  { name: 'Cat', role: 'Developer', image: cat },
  { name: 'Dog', role: 'Designer', image: dog },
  { name: 'Goat', role: 'Project Manager', image: goat },
  { name: 'Mouse', role: 'QA Engineer', image: mouse },
  { name: 'Rabbit', role: 'Marketing Specialist', image: rabbit },
];

const Team = () => {
  return (
    <div>
      <h2 className="h2">The Team Behind the Business</h2><br />
      <div className="image-container">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member-card">
            <img src={member.image} alt={member.name} className="team-member-image" />
            <div className="team-member-info">
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;