// src/components/Customers.js
import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Modal, Form, Row, Col, InputGroup, Badge,Pagination,Dropdown,Alert} from 'react-bootstrap';
import { FaUserPlus, FaEdit, FaTrash, FaSearch, FaSort, FaFilter,FaFileExport,FaPhoneAlt,FaEnvelope,FaMapMarkerAlt,FaHistory} from 'react-icons/fa';
import styled from 'styled-components';



const Customers = () => {
    // State Management
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'customer',
    });

    // Handle Modal
    const handleClose = () => {
        setShowModal(false);
        setCurrentUser(null);
        resetForm();
    };

    const handleShow = (user = null) => {
        if (user) {
            setCurrentUser(user);
            setFormData(user);
        }
        setShowModal(true);
    };

    // Form Handlers
    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            password: '',
            role: 'customer',
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
            const newUser = {
                id: currentUser ? currentUser.id : Date.now(),
                ...formData,
            };

            if (currentUser) {
                setUsers(users.map((u) => (u.id === currentUser.id ? newUser : u)));
                showAlert('User updated successfully!', 'success');
            } else {
                setUsers([...users, newUser]);
                showAlert('User added successfully!', 'success');
            }
            handleClose();
        } catch (error) {
            showAlert('Error processing user data!', 'danger');
        }
    };

    // Alert Handler
    const showAlert = (message, type) => {
        setAlert({ show: true, message, type });
        setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
    };

    // Delete Handler
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                setUsers(users.filter((user) => user.id !== id));
                showAlert('User deleted successfully!', 'success');
            } catch (error) {
                showAlert('Error deleting user!', 'danger');
            }
        }
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

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
                            <StyledHeader>User Management</StyledHeader>
                        </Col>
                        <Col xs="auto">
                            <ActionButton
                                className="primary-button"
                                onClick={() => handleShow()}
                            >
                                <FaUserPlus /> Add New User
                            </ActionButton>
                        </Col>
                    </Row>

                    {/* User Table */}
                    <StyledTable responsive hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <CustomerBadge bg={user.role === 'admin' ? 'primary' : 'info'}>
                                            {user.role}
                                        </CustomerBadge>
                                    </td>
                                    <td>
                                        <ActionButton
                                            variant="warning"
                                            onClick={() => handleShow(user)}
                                            style={{ backgroundColor: '#DAA520', borderColor: '#DAA520' }}
                                        >
                                            <FaEdit /> Edit
                                        </ActionButton>
                                        <ActionButton
                                            variant="danger"
                                            onClick={() => handleDelete(user.id)}
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
                            {[...Array(Math.ceil(users.length / itemsPerPage))].map((_, index) => (
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
                                    Math.ceil(users.length / itemsPerPage),
                                    currentPage + 1
                                ))}
                            />
                            <Pagination.Last
                                onClick={() => paginate(Math.ceil(users.length / itemsPerPage))}
                            />
                        </Pagination>
                    </div>
                </Card.Body>
            </StyledCard>

            {/* Add/Edit User Modal */}
            <StyledModal show={showModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {currentUser ? 'Edit User' : 'Add New User'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                            >
                                <option value="customer">Customer</option>
                                <option value="admin">Admin</option>
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
                                {currentUser ? 'Update' : 'Add'} User
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </StyledModal>
        </StyledContainer>
    );
};

export default Customers;



// Styled Components
const StyledContainer = styled(Container)`
    padding: 2rem;
    background: #FFFFFF;
    min-height: 100vh;`;

const StyledCard = styled(Card)`
    border: none;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
    background: #FFFFFF;`; 

const StyledHeader = styled.h2`
    color: #DAA520;
    font-weight: bold;
    margin-bottom: 1.5rem;
    font-size: 2.5rem;`;

const StyledTable = styled(Table)`
    background: #FFFFFF;
    
    th {
        background: #DAA520;
        color: #FFFFFF;
        font-weight: 600;
        border: none;
        padding: 1rem;
    }

    td {
        vertical-align: middle;
        color: #000000;
        padding: 1rem;
    }

    tbody tr:hover {
        background-color: rgba(218, 165, 32, 0.1);
    }`;

const ActionButton = styled(Button)`
    margin: 0 0.3rem;
    padding: 0.4rem 1rem;
    
    &.primary-button {
        background-color: #DAA520;
        border-color: #DAA520;
        color: #FFFFFF;
        
        &:hover {
            background-color: #B8860B;
            border-color: #B8860B;
        }
    }
`;

const SearchBar = styled(InputGroup)`
    max-width: 400px;
    margin-bottom: 1rem;`;

const CustomerBadge = styled(Badge)`
    font-size: 0.9em;
    padding: 0.5em 1em;`;

const StyledModal = styled(Modal)`
    .modal-header {
        background-color: #DAA520;
        color: #FFFFFF;
        border-bottom: none;
    }

    .modal-title {
        font-weight: bold;
    }

    .modal-content {
        border-radius: 15px;
    }
`;

const FilterSection = styled.div`
    margin-bottom: 1rem;
    padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 8px;`;