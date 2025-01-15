import React, { useState } from "react";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
//import './PagesCSS/Description.css';

const description = () => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <Container>
      {/* Tabs Navigation */}
      <Nav variant="tabs" activeKey={activeTab} onSelect={(selectedTab) => setActiveTab(selectedTab)}>
        <Nav.Item>
          <Nav.Link eventKey="description">Description</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="reviews">Reviews</Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Tab Content */}
      {/* <Tab.Content className="mt-3">
        <Tab.Pane eventKey="description">
          <Row>
            <Col>
              <h2>Description</h2>
            </Col>
          </Row>
        </Tab.Pane>
        <Tab.Pane eventKey="additionalInfo">
          <Row>
            <Col>
              <h2>Additional Information</h2>
            </Col>
          </Row>
        </Tab.Pane>
        <Tab.Pane eventKey="reviews">
          <Row>
            <Col>
              <h2>Reviews</h2>
              <p>We cherish what you think about our products</p>
            </Col>
          </Row>
        </Tab.Pane>
      </Tab.Content> */}
    </Container>
  );
};

export default description;
