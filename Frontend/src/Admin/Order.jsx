import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Badge, Modal, Form } from 'react-bootstrap';
import { FaClipboardList, FaSearch, FaEdit, FaTrashAlt, FaPlus, FaRegImage } from 'react-icons/fa';
import styled from 'styled-components';

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

const OrderItem = ({ order, onEdit, onDelete }) => {
  return (
    <tr>
      <td>
        <OrderImage src={order.imageUrl} alt={order.orderNumber} />
        {order.orderNumber}
      </td>
      <td>{order.customerName}</td>
      <td>{order.orderDate}</td>
      <td>
        <OrderBadge className={`badge ${order.status === 'Completed' ? 'badge-success' : order.status === 'Pending' ? 'badge-warning' : 'badge-danger'}`}>
          {order.status}
        </OrderBadge>
      </td>
      <td>
        <ActionButton variant="info" onClick={() => onEdit(order)}><FaSearch /> View</ActionButton>
        <ActionButton variant="warning" onClick={() => onEdit(order)}><FaEdit /> Edit</ActionButton>
        <ActionButton variant="danger" onClick={() => onDelete(order)}><FaTrashAlt /> Delete</ActionButton>
      </td>
    </tr>
  );
};

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [newOrder, setNewOrder] = useState({
    orderNumber: '',
    customerName: '',
    orderDate: '',
    status: 'Pending',
    imageUrl: '',
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch('/api/orders');
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  const handleEdit = (order) => {
    setCurrentOrder(order);
    setShowModal(true);
  };

  const handleDelete = async (order) => {
    await fetch(`/api/orders/${order.id}`, { method: 'DELETE' });
    setOrders(orders.filter(o => o.id !== order.id));
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('orderNumber', newOrder.orderNumber);
    formData.append('customerName', newOrder.customerName);
    formData.append('orderDate', newOrder.orderDate);
    formData.append('status', newOrder.status);
    if (imageFile) formData.append('imageUrl', imageFile);

    const method = currentOrder ? 'PUT' : 'POST';
    const url = currentOrder ? `/api/orders/${currentOrder.id}` : '/api/orders';

    const response = await fetch(url, {
      method: method,
      body: formData,
    });
    const data = await response.json();

    if (currentOrder) {
      setOrders(orders.map(order => (order.id === currentOrder.id ? data : order)));
    } else {
      setOrders([...orders, data]);
    }
    handleCloseModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <PageTitle>Manage Orders</PageTitle>
          <Button variant="success" onClick={() => { setNewOrder({ orderNumber: '', customerName: '', orderDate: '', status: 'Pending', imageUrl: '' }); setShowModal(true); }}>
            <FaPlus /> Add New Order
          </Button>
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
              {orders.map((order, index) => (
                <OrderItem key={index} order={order} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
            </tbody>
          </OrderTable>

          {/* Edit/Add Modal */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{currentOrder ? 'Edit Order' : 'Add New Order'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                  <Form.Control as="select" name="status" value={newOrder.status} onChange={handleInputChange}>
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
