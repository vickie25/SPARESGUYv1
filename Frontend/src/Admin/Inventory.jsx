import React, { useState } from 'react';
import { Table, Button, Modal, Form, Container, Card, Row, Col } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaImage } from 'react-icons/fa';
import styled from 'styled-components';
import {
    useCreateProductMutation,
    useGetProductsQuery
} from '../slices/productApiSlice';

const Inventory = () => {
    const { data: parts, isLoading } = useGetProductsQuery();
    const [createProduct] = useCreateProductMutation();

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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const newProduct = {
            name: formData.get('name'),
            image: previewImage || 'https://example.com/images/default.jpg',
            price: Number(formData.get('price')),
            description: formData.get('description'),
            additionalInfo: formData.get('additionalInfo') || '',
            make: formData.get('make'),
            model: formData.get('model'),
            year: Number(formData.get('year')),
            transmission: formData.get('transmission'),
            condition: formData.get('condition'),
            fuelType: formData.get('fuelType'),
        };

        try {
            await createProduct(newProduct).unwrap();
            alert("Product successfully created!");
            handleClose();
        } catch (error) {
            alert(`Failed to create product: ${error?.data?.error || "Unknown error"}`);
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
                            <ActionButton className="add-button" onClick={() => handleShow(null)}>
                                <FaPlus /> Add New Part
                            </ActionButton>
                        </Col>
                    </Row>
                    <StyledTable responsive hover>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parts?.map((part) => (
                                <tr key={part.id}>
                                    <td>
                                        {part.image ? (
                                            <ImagePreview src={part.image} alt={part.name} />
                                        ) : (
                                            <FaImage size={30} color="#DAA520" />
                                        )}
                                    </td>
                                    <td>{part.name}</td>
                                    <td>${part.price.toFixed(2)}</td>
                                    <td>
                                        <ActionButton variant="warning" onClick={() => handleShow(part)}>
                                            <FaEdit /> Edit
                                        </ActionButton>
                                        <ActionButton variant="danger">
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
                        {[
                            { label: 'Part Image', type: 'file', name: 'image', handler: handleImageChange },
                            { label: 'Name', type: 'text', name: 'name', required: true },
                            { label: 'Description', as: 'textarea', name: 'description', required: true },
                            { label: 'Additional Info', type: 'text', name: 'additionalInfo' },
                            { label: 'Make', type: 'text', name: 'make', required: true },
                            { label: 'Model', type: 'text', name: 'model', required: true },
                            { label: 'Year', type: 'number', name: 'year', min: 1900, max: new Date().getFullYear(), required: true },
                            { label: 'Price ($)', type: 'number', name: 'price', step: 0.01, required: true },
                        ].map(({ label, ...props }) => (
                            <Form.Group className="mb-3" key={props.name}>
                                <Form.Label>{label}</Form.Label>
                                <Form.Control {...props} defaultValue={currentPart?.[props.name]} />
                                {props.name === 'image' && previewImage && <ImagePreview src={previewImage} />}
                            </Form.Group>
                        ))}
                        {[
                            { label: 'Transmission', name: 'transmission', options: ['Automatic', 'Manual'] },
                            { label: 'Condition', name: 'condition', options: ['New', 'Used'] },
                            { label: 'Fuel Type', name: 'fuelType', options: ['Petrol', 'Diesel'] },
                        ].map(({ label, name, options }) => (
                            <Form.Group className="mb-3" key={name}>
                                <Form.Label>{label}</Form.Label>
                                <Form.Control as="select" name={name} defaultValue={currentPart?.[name]} required>
                                    {options.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        ))}
                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                            <Button type="submit" style={{ backgroundColor: '#DAA520', borderColor: '#DAA520' }}>
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

// Styled Components
const StyledContainer = styled(Container)`padding: 2rem; background: #FFF; min-height: 100vh;`;
const StyledCard = styled(Card)`border: none; border-radius: 15px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);`;
const StyledHeader = styled.h2`color: #DAA520; font-weight: bold;`;
const StyledTable = styled(Table)`
    th { background: #DAA520; color: #FFF; font-weight: 600; }
    tbody tr:hover { background-color: rgba(218, 165, 32, 0.1); }
`;
const ActionButton = styled(Button)`margin: 0 0.3rem; padding: 0.4rem 1rem;`;
const StyledModal = styled(Modal)``;
const ImagePreview = styled.img`max-width: 100px; height: auto; margin: 10px 0; border-radius: 5px;`;
