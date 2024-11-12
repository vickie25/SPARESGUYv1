import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form, Card } from 'react-bootstrap';
import { FaChartBar, FaFileExport, FaFileAlt, FaSearch } from 'react-icons/fa';
import styled from 'styled-components';

// Styled Components
const PageTitle = styled.h2`
  color: #DAA520;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
`;

const ReportTable = styled(Table)`
  background-color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  .table th, .table td {
    vertical-align: middle;
  }
`;

const ActionButton = styled(Button)`
  background-color: #DAA520;
  border: none;
  color: #FFFFFF;
  &:hover {
    background-color: #c7911f;
    color: #FFFFFF;
  }
  margin-right: 8px;
`;

const CardContainer = styled(Card)`
  background-color: #FFFFFF;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const ReportFilters = styled(Form)`
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const ReportItem = ({ report }) => {
  return (
    <tr>
      <td>{report.date}</td>
      <td>{report.category}</td>
      <td>{report.totalSales}</td>
      <td>{report.orders}</td>
      <td>{report.inventory}</td>
    </tr>
  );
};

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    category: 'All',
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      const response = await fetch('/api/reports', {
        method: 'POST',
        body: JSON.stringify(filters),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setReports(data);
    };

    fetchReports();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleExport = () => {
    // Implement export logic, e.g., generating CSV or PDF reports
    alert('Export functionality is not implemented yet!');
  };

  const handleSearch = () => {
    // Trigger search based on filters
    const filteredReports = reports.filter(report => {
      const matchStartDate = filters.startDate ? report.date >= filters.startDate : true;
      const matchEndDate = filters.endDate ? report.date <= filters.endDate : true;
      const matchCategory = filters.category !== 'All' ? report.category === filters.category : true;
      return matchStartDate && matchEndDate && matchCategory;
    });
    setReports(filteredReports);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <PageTitle>Reports</PageTitle>
          
          {/* Report Filters */}
          <CardContainer>
            <Card.Body>
              <ReportFilters>
                <Row>
                  <Col md={4}>
                    <Form.Group controlId="startDate">
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="startDate"
                        value={filters.startDate}
                        onChange={handleFilterChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="endDate">
                      <Form.Label>End Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="endDate"
                        value={filters.endDate}
                        onChange={handleFilterChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="category">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        as="select"
                        name="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                      >
                        <option>All</option>
                        <option>Electronics</option>
                        <option>Engine Parts</option>
                        <option>Brakes</option>
                        <option>Suspension</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <ActionButton variant="primary" onClick={handleSearch}>
                      <FaSearch /> Search
                    </ActionButton>
                    <ActionButton variant="success" onClick={handleExport}>
                      <FaFileExport /> Export Report
                    </ActionButton>
                  </Col>
                </Row>
              </ReportFilters>
            </Card.Body>
          </CardContainer>

          {/* Report Table */}
          <CardContainer>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Total Sales</th>
                    <th>Orders</th>
                    <th>Inventory</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.length > 0 ? (
                    reports.map((report, index) => (
                      <ReportItem key={index} report={report} />
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">No reports found.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </CardContainer>

        </Col>
      </Row>
    </Container>
  );
};

export default ReportsPage;
