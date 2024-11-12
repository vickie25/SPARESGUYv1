// src/components/Inventory.js
import React, { useState } from 'react';
import { Table, Button, Modal, Form, Container, Card, Row, Col } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaImage } from 'react-icons/fa';
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  }

  td {
    vertical-align: middle;
    color: #000000;
  }

  tbody tr:hover {
    background-color: rgba(218, 165, 32, 0.1);
  }
`;

const ActionButton = styled(Button)`
  margin: 0 0.3rem;
  padding: 0.4rem 1rem;
  
  &.add-button {
    background-color: #DAA520;
    border-color: #DAA520;
    color: #FFFFFF;
    
    &:hover {
      background-color: #B8860B;
      border-color: #B8860B;
    }
  }
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

const ImagePreview = styled.img`
  max-width: 100px;
  height: auto;
  margin: 10px 0;
  border-radius: 5px;
`;

const Inventory = () => {
    const [parts, setParts] = useState([
        { id: 1, name: 'Brake Pads', quantity: 50, price: 30, image: null },
        { id: 2, name: 'Oil Filter', quantity: 100, price: 15, image: null },
        { id: 3, name: 'Air Filter', quantity: 75, price: 20, image: null },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [currentPart, setCurrentPart] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleClose = () => {
        setShowModal(false);
        setCurrentPart(null);
        setPreviewImage(null);
    };

    const handleShow = (part) => {
        setCurrentPart(part);
        setPreviewImage(part?.image || null);
        setShowModal(true);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newPart = {
            id: currentPart ? currentPart.id : Date.now(),
            name: formData.get('name'),
            quantity: Number(formData.get('quantity')),
            price: Number(formData.get('price')),
            image: previewImage
        };

        if (currentPart) {
            setParts(parts.map(part => part.id === currentPart.id ? newPart : part));
        } else {
            setParts([...parts, newPart]);
        }
        
        handleClose();
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            setParts(parts.filter(part => part.id !== id));
        }
    };

    return (
        <StyledContainer fluid>
            <StyledCard>
                <Card.Body>
                    <Row className="align-items-center mb-4">
                        <Col>
                            <StyledHeader>Inventory Management</StyledHeader>
                        </Col>
                        <Col xs="auto">
                            <ActionButton 
                                className="add-button"
                                onClick={() => handleShow(null)}
                            >
                                <FaPlus /> Add New Part
                            </ActionButton>
                        </Col>
                    </Row>

                    <StyledTable responsive hover>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parts.map(part => (
                                <tr key={part.id}>
                                    <td>
                                        {part.image ? (
                                            <ImagePreview src={part.image} alt={part.name} />
                                        ) : (
                                            <FaImage size={30} color="#DAA520" />
                                        )}
                                    </td>
                                    <td>{part.name}</td>
                                    <td>{part.quantity}</td>
                                    <td>${part.price.toFixed(2)}</td>
                                    <td>
                                        <ActionButton 
                                            variant="warning" 
                                            onClick={() => handleShow(part)}
                                            style={{ backgroundColor: '#DAA520', borderColor: '#DAA520' }}
                                        >
                                            <FaEdit /> Edit
                                        </ActionButton>
                                        <ActionButton 
                                            variant="danger" 
                                            onClick={() => handleDelete(part.id)}
                                        >
                                            <FaTrash /> Delete
                                        </ActionButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </StyledTable>
                </Card.Body>
            </StyledCard>

            <StyledModal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentPart ? 'Edit Part' : 'Add New Part'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSave}>
                        <Form.Group className="mb-3">
                            <Form.Label>Part Image</Form.Label>
                            <Form.Control 
                                type="file" 
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            {previewImage && (
                                <ImagePreview src={previewImage} alt="Preview" />
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="name" 
                                defaultValue={currentPart ? currentPart.name : ''} 
                                required 
                                placeholder="Enter part name"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control 
                                type="number" 
                                name="quantity" 
                                defaultValue={currentPart ? currentPart.quantity : ''} 
                                required 
                                min="0"
                                placeholder="Enter quantity"
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Price ($)</Form.Label>
                            <Form.Control 
                                type="number" 
                                name="price" 
                                step="0.01"
                                defaultValue={currentPart ? currentPart.price : ''} 
                                required 
                                min="0"
                                placeholder="Enter price"
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
                                {currentPart ? 'Update' : 'Add'} Part
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </StyledModal>
        </StyledContainer>
    );
};

export default Inventory;