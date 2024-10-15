import React, { useState, useEffect } from 'react';
import './HomepageCSS/StatisticsBar.css';

const StatisticItem = ({ number, label }) => {
  const [count, setCount] = useState(0);
  const [showPlus, setShowPlus] = useState(number.includes('K'));

  useEffect(() => {
    const end = parseInt(number.replace('K', '000')); // Convert '34K' to 34000 or '3' to 3
    if (end <= 3) {
      setCount(end); // Directly set the count for small numbers
      return;
    }

    let start = 0;
    let totalDuration = 2000; // Duration of the countdown in milliseconds
    let incrementTime = (totalDuration / end) * 1000; // Time between increments

    let timer = setInterval(() => {
      start += 1000;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
        setCount(end); // Ensure the final count is set correctly
        setShowPlus(false); // Hide the + sign after countdown
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [number]);

  const formatCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toLocaleString();
  };

  const splitLabel = (label) => {
    const words = label.split(' ');
    const midIndex = Math.ceil(words.length / 2);
    return {
      top: words.slice(0, midIndex).join(' '),
      bottom: words.slice(midIndex).join(' '),
    };
  };

  const { top, bottom } = splitLabel(label);

  return (
    <div className="statistic-item">
      <h1>{formatCount(count)}{showPlus && '+'}</h1>
      <p>
        <span>{top}</span>
        <span>{bottom}</span>
      </p>
    </div>
  );
};

const StatisticsBar = () => {
  const stats = [
    { number: '3', label: 'Years Market Lead' },
    { number: '34K', label: 'Product Delivery In The World' },
    { number: '34K', label: 'Satisfied Customers' }
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
