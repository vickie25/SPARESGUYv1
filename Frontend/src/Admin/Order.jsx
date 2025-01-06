import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Badge, Modal, Form } from 'react-bootstrap';
import { FaClipboardList, FaSearch, FaEdit, FaTrashAlt, FaPlus, FaRegImage } from 'react-icons/fa';
import styled from 'styled-components';

// This component represents an individual order row in the table

const OrderItem = ({ order, onEdit, onDelete }) => {
  return (
    <tr>
      <td>

        {/* Display order image and order number */}

        <OrderImage src={order.imageUrl} alt={order.orderNumber} />
        {order.orderNumber}
      </td>
      <td>{order.customerName}</td>
      <td>{order.orderDate}</td>
      <td>

        {/* Display the status with different badges based on the order's status */}

        <OrderBadge
          className={`badge ${
            order.status === 'Completed'
              ? 'badge-success'
              : order.status === 'Pending'
              ? 'badge-warning'
              : 'badge-danger'
          }`}
        >
          {order.status}
        </OrderBadge>
      </td>
      <td>

        {/* Action buttons for viewing, editing, and deleting an order */}

        <ActionButton variant="info" onClick={() => onEdit(order)}>
          <FaSearch /> View
        </ActionButton>
        <ActionButton variant="warning" onClick={() => onEdit(order)}>
          <FaEdit /> Edit
        </ActionButton>
        <ActionButton variant="danger" onClick={() => onDelete(order)}>
          <FaTrashAlt /> Delete
        </ActionButton>
      </td>
    </tr>
  );
};

// Main component for managing orders

const OrderPage = () => {

  // State to store orders, modal visibility, and currently selected order

  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  // State for creating or editing an order

  const [newOrder, setNewOrder] = useState({
    orderNumber: '',
    customerName: '',
    orderDate: '',
    status: 'Pending',
    imageUrl: '',
  });

  // State for handling image file uploads

  const [imageFile, setImageFile] = useState(null);

  // Fetch orders from the API when the component loads

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch('/api/orders');
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  // Handler to edit an order

  const handleEdit = (order) => {
    setCurrentOrder(order); // Set the current order to the selected one
    setShowModal(true); // Show the modal for editing
  };

  // Handler to delete an order
  const handleDelete = async (order) => {
    await fetch(`/api/orders/${order.id}`, { method: 'DELETE' }); // Call API to delete the order
    setOrders(orders.filter((o) => o.id !== order.id)); // Remove the deleted order from state
  };

  // Close the modal
  const handleCloseModal = () => setShowModal(false);

  // Save a new or edited order
  const handleSave = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const formData = new FormData(); // FormData to handle file uploads
    formData.append('orderNumber', newOrder.orderNumber);
    formData.append('customerName', newOrder.customerName);
    formData.append('orderDate', newOrder.orderDate);
    formData.append('status', newOrder.status);
    if (imageFile) formData.append('imageUrl', imageFile); // Add the image file if provided

    const method = currentOrder ? 'PUT' : 'POST'; // Decide between updating or creating
    const url = currentOrder ? `/api/orders/${currentOrder.id}` : '/api/orders';

    const response = await fetch(url, {
      method: method,
      body: formData, // Send form data to the server
    });
    const data = await response.json();

    if (currentOrder) {
      // Update an existing order in the state
      setOrders(orders.map((order) => (order.id === currentOrder.id ? data : order)));
    } else {
      // Add the newly created order to the state
      setOrders([...orders, data]);
    }
    handleCloseModal(); // Close the modal after saving
  };

  // Update the newOrder state as the user types in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  // Handle file input changes for the order image
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <Container fluid>
      <Row>
        <Col>

          {/* Page title and button to add a new order */}
        

          <PageTitle>Manage Orders</PageTitle>
          <Button
            variant="success"
            onClick={() => {
              setNewOrder({
                orderNumber: '',
                customerName: '',
                orderDate: '',
                status: 'Pending',
                imageUrl: '',
              });
              setShowModal(true); // Show modal for adding a new order
            }}
          >
            <FaPlus /> Add New Order
          </Button>

          {/* Table displaying all orders */}

          <OrderTable striped bordered hover>
            <thead>
              <tr>
                <th>Order No.</th>
                <th>Customer</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>

              {/* Render each order as a row */}

              {orders.map((order, index) => (
                <OrderItem
                  key={index}
                  order={order}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </OrderTable>

          {/* Modal for adding or editing orders */}

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{currentOrder ? 'Edit Order' : 'Add New Order'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              {/* Form for adding/editing orders */}

              <Form onSubmit={handleSave}>
                <Form.Group controlId="orderNumber">
                  <Form.Label>Order Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="orderNumber"
                    value={newOrder.orderNumber}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="customerName">
                  <Form.Label>Customer Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="customerName"
                    value={newOrder.customerName}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="orderDate">
                  <Form.Label>Order Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="orderDate"
                    value={newOrder.orderDate}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="status">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    name="status"
                    value={newOrder.status}
                    onChange={handleInputChange}
                  >
                    <option>Pending</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="orderImage">
                  <Form.Label>Order Image</Form.Label>
                  <Form.Control type="file" onChange={handleImageChange} />
                </Form.Group>

                <Button variant="primary" type="submit">
                  {currentOrder ? 'Save Changes' : 'Add Order'}
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderPage;


// Styled Components
const PageTitle = styled.h2`
  color: #DAA520;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
`;

const OrderTable = styled(Table)`
  background-color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  .table th, .table td {
    vertical-align: middle;
  }
`;

const OrderBadge = styled(Badge)`
  &.badge-success {
    background-color: #28a745;
  }
  &.badge-warning {
    background-color: #ffc107;
  }
  &.badge-danger {
    background-color: #dc3545;
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

const OrderImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  margin-right: 10px;
`;