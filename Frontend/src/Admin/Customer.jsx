// src/components/Customers.js
import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Card, 
    Table, 
    Button, 
    Modal, 
    Form, 
    Row, 
    Col,
    InputGroup,
    Badge,
    Pagination,
    Dropdown,
    Alert
} from 'react-bootstrap';
import { 
    FaUserPlus, 
    FaEdit, 
    FaTrash, 
    FaSearch, 
    FaSort, 
    FaFilter,
    FaFileExport,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaHistory
} from 'react-icons/fa';
import styled from 'styled-components';

// Styled Components
const StyledContainer = styled(Container)`
    padding: 2rem;
    background: #FFFFFF;
    min-height: 100vh;
`;

const StyledCard = styled(Card)`
    border: none;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
    background: #FFFFFF;
`;

const StyledHeader = styled.h2`
    color: #DAA520;
    font-weight: bold;
    margin-bottom: 1.5rem;
    font-size: 2.5rem;
`;

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
    }
`;

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
    margin-bottom: 1rem;
`;

const CustomerBadge = styled(Badge)`
    font-size: 0.9em;
    padding: 0.5em 1em;
`;

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
    border-radius: 8px;
`;

const Customers = () => {
    // State Management
    const [customers, setCustomers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentCustomer, setCurrentCustomer] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [filters, setFilters] = useState({
        status: 'all',
        type: 'all'
    });
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        customerType: 'individual',
        status: 'active',
        notes: ''
    });

    // Handle Modal
    const handleClose = () => {
        setShowModal(false);
        setCurrentCustomer(null);
        resetForm();
    };

    const handleShow = (customer = null) => {
        if (customer) {
            setCurrentCustomer(customer);
            setFormData(customer);
        }
        setShowModal(true);
    };

    // Form Handlers
    const resetForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            customerType: 'individual',
            status: 'active',
            notes: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // API call would go here
            const newCustomer = {
                id: currentCustomer ? currentCustomer.id : Date.now(),
                ...formData,
                createdAt: currentCustomer ? currentCustomer.createdAt : new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            if (currentCustomer) {
                setCustomers(customers.map(c => 
                    c.id === currentCustomer.id ? newCustomer : c
                ));
                showAlert('Customer updated successfully!', 'success');
            } else {
                setCustomers([...customers, newCustomer]);
                showAlert('Customer added successfully!', 'success');
            }
            handleClose();
        } catch (error) {
            showAlert('Error processing customer data!', 'danger');
        }
    };

    // Alert Handler
    const showAlert = (message, type) => {
        setAlert({ show: true, message, type });
        setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
    };

    // Delete Handler
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                // API call would go here
                setCustomers(customers.filter(customer => customer.id !== id));
                showAlert('Customer deleted successfully!', 'success');
            } catch (error) {
                showAlert('Error deleting customer!', 'danger');
            }
        }
    };

    // Sorting Handler
    const handleSort = (field) => {
        setSortDirection(current => current === 'asc' ? 'desc' : 'asc');
        setSortField(field);
    };

    // Filter Handler
    const handleFilter = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
        setCurrentPage(1);
    };

    // Export Handler
    const handleExport = () => {
        // Implementation for exporting customer data
        console.log('Exporting customer data...');
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = customers.slice(indexOfFirstItem, indexOfLastItem);

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
                            <StyledHeader>Customer Management</StyledHeader>
                        </Col>
                        <Col xs="auto">
                            <ActionButton 
                                className="primary-button"
                                onClick={() => handleShow()}
                            >
                                <FaUserPlus /> Add New Customer
                            </ActionButton>
                            <ActionButton 
                                variant="outline-secondary"
                                onClick={handleExport}
                            >
                                <FaFileExport /> Export
                            </ActionButton>
                        </Col>
                    </Row>

                    {/* Search and Filter Section */}
                    <Row className="mb-4">
                        <Col md={4}>
                            <SearchBar>
                                <InputGroup.Text>
                                    <FaSearch />
                                </InputGroup.Text>
                                <Form.Control
                                    placeholder="Search customers..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </SearchBar>
                        </Col>
                        <Col md={8}>
                            <FilterSection>
                                <Row>
                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label><FaFilter /> Status</Form.Label>
                                            <Form.Select
                                                value={filters.status}
                                                onChange={(e) => handleFilter('status', e.target.value)}
                                            >
                                                <option value="all">All</option>
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                                <option value="pending">Pending</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label><FaFilter /> Customer Type</Form.Label>
                                            <Form.Select
                                                value={filters.type}
                                                onChange={(e) => handleFilter('type', e.target.value)}
                                            >
                                                <option value="all">All</option>
                                                <option value="individual">Individual</option>
                                                <option value="business">Business</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </FilterSection>
                        </Col>
                    </Row>

                    {/* Customer Table */}
                    <StyledTable responsive hover>
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                                    Name <FaSort />
                                </th>
                                <th>Contact</th>
                                <th>Location</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map(customer => (
                                <tr key={customer.id}>
                                    <td>{`${customer.firstName} ${customer.lastName}`}</td>
                                    <td>
                                        <div><FaPhoneAlt /> {customer.phone}</div>
                                        <div><FaEnvelope /> {customer.email}</div>
                                    </td>
                                    <td>
                                        <div><FaMapMarkerAlt /> {customer.city}, {customer.state}</div>
                                    </td>
                                    <td>
                                        <CustomerBadge bg={customer.customerType === 'individual' ? 'info' : 'primary'}>
                                            {customer.customerType}
                                        </CustomerBadge>
                                    </td>
                                    <td>
                                        <CustomerBadge bg={
                                            customer.status === 'active' ? 'success' :
                                            customer.status === 'inactive' ? 'danger' : 'warning'
                                        }>
                                            {customer.status}
                                        </CustomerBadge>
                                    </td>
                                    <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <ActionButton 
                                            variant="warning" 
                                            onClick={() => handleShow(customer)}
                                            style={{ backgroundColor: '#DAA520', borderColor: '#DAA520' }}
                                        >
                                            <FaEdit /> Edit
                                        </ActionButton>
                                        <ActionButton 
                                            variant="danger" 
                                            onClick={() => handleDelete(customer.id)}
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
                            {[...Array(Math.ceil(customers.length / itemsPerPage))].map((_, index) => (
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
                                    Math.ceil(customers.length / itemsPerPage),
                                    currentPage + 1
                                ))}
                            />
                            <Pagination.Last 
                                onClick={() => paginate(Math.ceil(customers.length / itemsPerPage))}
                            />
                        </Pagination>
                    </div>
                </Card.Body>
            </StyledCard>

            {/* Add/Edit Customer Modal */}
            <StyledModal show={showModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {currentCustomer ? 'Edit Customer' : 'Add New Customer'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
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
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Zip Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Customer Type</Form.Label>
                                    <Form.Select
                                        name="customerType"
                                        value={formData.customerType}
                                        onChange={handleInputChange}
                                    >
                                        <option value="individual">Individual</option>
                                        <option value="business">Business</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="pending">Pending</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="notes"
                                value={formData.notes}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button 
                                type="submit"
                                style={{ backgroundColor: '#DAA520', borderColor: '#DAA520' }}
                            >
                                {currentCustomer ? 'Update' : 'Add'} Customer
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </StyledModal>
        </StyledContainer>
    );
};

export default Customers;