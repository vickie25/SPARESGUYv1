// src/components/Notifications.jsx
import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Modal, Form, Row, Col, Pagination, Alert } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaBell } from 'react-icons/fa';
import styled from 'styled-components';

const Notifications = () => {
    // State Management
    const [notifications, setNotifications] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentNotification, setCurrentNotification] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        message: '',
        audience: 'all', // Target audience: 'all', 'admins', 'customers'
    });

    // Handle Modal
    const handleClose = () => {
        setShowModal(false);
        setCurrentNotification(null);
        resetForm();
    };

    const handleShow = (notification = null) => {
        if (notification) {
            setCurrentNotification(notification);
            setFormData(notification);
        }
        setShowModal(true);
    };

    // Form Handlers
    const resetForm = () => {
        setFormData({
            title: '',
            message: '',
            audience: 'all',
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newNotification = {
                id: currentNotification ? currentNotification.id : Date.now(),
                ...formData,
                date: new Date().toLocaleString(),
            };

            if (currentNotification) {
                setNotifications(notifications.map((n) => (n.id === currentNotification.id ? newNotification : n)));
                showAlert('Notification updated successfully!', 'success');
            } else {
                setNotifications([...notifications, newNotification]);
                showAlert('Notification added successfully!', 'success');
            }
            handleClose();
        } catch (error) {
            showAlert('Error processing notification data!', 'danger');
        }
    };

    // Alert Handler
    const showAlert = (message, type) => {
        setAlert({ show: true, message, type });
        setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
    };

    // Delete Handler
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this notification?')) {
            try {
                setNotifications(notifications.filter((notification) => notification.id !== id));
                showAlert('Notification deleted successfully!', 'success');
            } catch (error) {
                showAlert('Error deleting notification!', 'danger');
            }
        }
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = notifications.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <StyledContainer fluid>
            {alert.show && (
                <Alert variant={alert.type} onClose={() => setAlert({ show: false })} dismissible>
                    {alert.message}
                </Alert>
            )}

            <StyledCard>
                <Card.Body>
                    <Row className="align-items-center mb-4">
                        <Col>
                            <StyledHeader>Notification Management</StyledHeader>
                        </Col>
                        <Col xs="auto">
                            <ActionButton
                                className="primary-button"
                                onClick={() => handleShow()}
                            >
                                <FaPlus /> Add Notification
                            </ActionButton>
                        </Col>
                    </Row>

                    {/* Notifications Table */}
                    <StyledTable responsive hover>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Message</th>
                                <th>Audience</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((notification) => (
                                <tr key={notification.id}>
                                    <td>{notification.title}</td>
                                    <td>{notification.message}</td>
                                    <td>{notification.audience}</td>
                                    <td>{notification.date}</td>
                                    <td>
                                        <ActionButton
                                            variant="warning"
                                            onClick={() => handleShow(notification)}
                                            style={{ backgroundColor: '#DAA520', borderColor: '#DAA520' }}
                                        >
                                            <FaEdit /> Edit
                                        </ActionButton>
                                        <ActionButton
                                            variant="danger"
                                            onClick={() => handleDelete(notification.id)}
                                        >
                                            <FaTrash /> Delete
                                        </ActionButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </StyledTable>

                    {/* Pagination */}
                    <div className="d-flex justify-content-center">
                        <Pagination>
                            <Pagination.First onClick={() => paginate(1)} />
                            <Pagination.Prev
                                onClick={() => paginate(Math.max(1, currentPage - 1))}
                            />
                            {[...Array(Math.ceil(notifications.length / itemsPerPage))].map((_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    active={index + 1 === currentPage}
                                    onClick={() => paginate(index + 1)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next
                                onClick={() => paginate(Math.min(
                                    Math.ceil(notifications.length / itemsPerPage),
                                    currentPage + 1
                                ))} />
                            <Pagination.Last
                                onClick={() => paginate(Math.ceil(notifications.length / itemsPerPage))} />
                        </Pagination>
                    </div>
                </Card.Body>
            </StyledCard>

            {/* Add/Edit Notification Modal */}
            <StyledModal show={showModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {currentNotification ? 'Edit Notification' : 'Add New Notification'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Audience</Form.Label>
                            <Form.Select
                                name="audience"
                                value={formData.audience}
                                onChange={handleInputChange}
                            >
                                <option value="all">All Users</option>
                                <option value="admins">Admins</option>
                                <option value="customers">Customers</option>
                            </Form.Select>
                        </Form.Group>
                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                style={{ backgroundColor: '#DAA520', borderColor: '#DAA520' }}
                            >
                                {currentNotification ? 'Update' : 'Add'} Notification
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </StyledModal>
        </StyledContainer>
    );
};

// Styled Components
const StyledContainer = styled(Container)`
    margin-top: 20px;
`;

const StyledCard = styled(Card)`
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledHeader = styled.h3`
    color: #333;
`;

const StyledTable = styled(Table)`
    margin-top: 20px;
`;

const ActionButton = styled(Button)`
    margin-right: 5px;
`;

const StyledModal = styled(Modal)`
    .modal-header {
        background-color: #f8f9fa;
    }
`;

export default Notifications;
