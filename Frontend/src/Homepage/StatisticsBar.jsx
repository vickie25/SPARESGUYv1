import React from 'react';
import './HomepageCSS/StatisticsBar.css'

const StatisticItem = ({ number, label }) => {
  return (
    <div className="statistic-item">
      <h1>{number}</h1>
      <p>{label}</p>
    </div>
  );
};

const StatisticsBar = () => {
  const stats = [
    { number: '3', label: 'Wishlist Users' },
    { number: '34K', label: 'Product Views' },
    { number: '34K', label: 'Social Shares' }
  ];

  return (
    <div className="statistics-bar">
      {stats.map((stat, index) => (
        <StatisticItem key={index} number={stat.number} label={stat.label} />
      ))}
    </div>
  );
};

export default StatisticsBar;