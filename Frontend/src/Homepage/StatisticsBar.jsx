import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaChartLine, FaShippingFast, FaSmile } from 'react-icons/fa';

const StatisticItem = ({ number, label, icon: Icon }) => {
  const [count, setCount] = useState(0);
  const [showPlus, setShowPlus] = useState(number.includes('K'));

  useEffect(() => {
    const end = parseInt(number.replace('K', '000'));
    if (end <= 3) {
      setCount(end);
      return;
    }

    let start = 0;
    let totalDuration = 2000;
    let incrementTime = (totalDuration / end) * 1000;

    let timer = setInterval(() => {
      start += 1000;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
        setShowPlus(false);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [number]);

  const formatCount = (count) => (count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count.toLocaleString());

  return (
    <Col xs={12} md={4} className="text-center my-3">
      <div className="d-flex align-items-center justify-content-center">
        <Icon size={40} color="#DAA520" className="me-3" />
        <div>
          <h1 style={{ color: '#FFFFFF' }}>{formatCount(count)}{showPlus && '+'}</h1>
          <p style={{ color: '#DAA520' }}>{label}</p>
        </div>
      </div>
    </Col>
  );
};

const StatisticsBar = () => {
  const stats = [
    { number: '3', label: 'Years Market Lead', icon: FaChartLine },
    { number: '34K', label: 'Product Delivery Nationwide', icon: FaShippingFast },
    { number: '34K', label: 'Satisfied Customers', icon: FaSmile }
  ];

  return (
    <Container fluid style={{ backgroundColor: '#000000', padding: '20px' }}>
      <Row className="justify-content-center">
        {stats.map((stat, index) => (
          <StatisticItem key={index} number={stat.number} label={stat.label} icon={stat.icon} />
        ))}
      </Row>
    </Container>
  );
};
// At the end of StatisticsBar.jsx
export default StatisticsBar;

