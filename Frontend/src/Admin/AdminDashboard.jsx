import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import {
  FaChartLine, FaUsers, FaShoppingCart, FaBox, FaArrowUp
} from 'react-icons/fa';
import styled from 'styled-components';



const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchRecentOrders();
  }, []);

  const fetchStats = async () => {
    const fetchedStats = await fetch('/api/stats').then(res => res.json());
    setStats(fetchedStats);
  };

  const fetchRecentOrders = async () => {
    const fetchedOrders = await fetch('/api/recentOrders').then(res => res.json());
    setRecentOrders(fetchedOrders);
  };

  return (
    <Container fluid>
    {/* Dashboard Header */}
    <h2 className="mb-4">Dashboard Overview</h2>
  
    {/* Row for Statistics Cards */}
    <Row className="g-4 mb-4">
      <Col xs={12} sm={6} lg={3}>
        {/* Revenue Stat Card */}
        <DashboardCard>
          <Row>
            {/* Icon Section */}
            <Col>
              <FaChartLine color="#DAA520" size="2rem" />
            </Col>
            {/* Statistic Section */}
            <Col xs="auto">
              <StatLabel>Revenue</StatLabel>
              <StatNumber>Ksh{stats?.revenue.toLocaleString()}</StatNumber>
              <span style={{ color: '#28A745' }}>
                <FaArrowUp /> {stats?.revenueChange}%
              </span>
            </Col>
          </Row>
        </DashboardCard>
      </Col>
      {/* Add more Stat Cards here for other metrics like Orders, Customers, etc. */}
    </Row>
  
    {/* Row for Revenue Overview Chart and Recent Activity */}
    <Row className="mb-4">
      {/* Revenue Overview Section */}
      <Col xs={12} lg={8}>
        <DashboardCard className="h-100">
          <h5 className="mb-4">Revenue Overview</h5>
          {/* Placeholder for Revenue Chart */}
        </DashboardCard>
      </Col>
  
      {/* Recent Activity Section */}
      <Col xs={12} lg={4}>
        <DashboardCard className="h-100">
          <h5 className="mb-4">Recent Activity</h5>
          {/* Placeholder for Activity Feed */}
        </DashboardCard>
      </Col>
    </Row>
  
    {/* Row for Recent Orders Table */}
    <Row>
      <Col xs={12}>
        <DashboardCard>
          <h5 className="mb-4">Recent Orders</h5>
          {/* Responsive Table for Orders */}
          <Table responsive hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through recent orders to display them in the table */}
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.date}</td>
                  <td>{order.status}</td>
                  <td>{order.amount}</td>
                  <td>
                    {/* Action Button to View Order Details */}
                    <Button variant="outline-primary" size="sm">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </DashboardCard>
      </Col>
    </Row>
  </Container>
  )
}  

export default Dashboard;


const DashboardCard = styled(motion.div)`
  background: #FFFFFF;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 100%;
  border: 1px solid rgba(218, 165, 32, 0.2);
`;

const StatNumber = styled.h2`
  color: #000000;
  font-weight: bold;
  margin: 0.5rem 0;
`;

const StatLabel = styled.p`
  color: #666;
  margin: 0;
`; 