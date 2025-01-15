import React, { useState } from 'react';
import { Table, Button, Modal, Form, Container, Card, Row, Col } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaImage } from 'react-icons/fa';
import styled from 'styled-components';
import {
    useCreateProductMutation,
    useGetProductsQuery,
    useGetProductByIdQuery,
    useUpdateProductMutation,
    useDeleteProductMutation
} from '../slices/productApiSlice';

const Inventory = () => {
    const { data: parts, isLoading, refetch } = useGetProductsQuery();
    console.log(parts, "Make sure the parts exixts with ID"); // Add this line to inspect the parts data
    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();
    const [showModal, setShowModal] = useState(false);
    const [currentPart, setCurrentPart] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleClose = () => {
        setShowModal(false);
        setCurrentPart(null);
        setPreviewImage(null);
    };

    const handleShow = (partId) => {
        if (partId) {
            const { data: fetchedPart, isFetching, error } = useGetProductByIdQuery(partId, {
                skip: !partId,
            });

            if (!isFetching && fetchedPart) {
                setCurrentPart(fetchedPart);
                setPreviewImage(fetchedPart.image || null);
            } else if (error) {
                console.error("Error fetching product by ID:", error);
                alert(`Failed to fetch product: ${error?.data?.error || "Unknown error"}`);
            }
        } else {
            setCurrentPart(null);
            setPreviewImage(null);
        }

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

    const handleSave = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newProduct = {
            name: formData.get('name'),
            image: 'https://example.com/images/toyota-corolla-engine.jpg',
            price: Number(formData.get('price')),
            description: formData.get('description'),
            additionalInfo: formData.get('additionalInfo') || '',
            make: formData.get('make'),
            model: formData.get('model'),
            year: Number(formData.get('year')),
            transmission: formData.get('transmission'),
            condition: formData.get('condition'),
            fuelType: formData.get('fuelType'),
            category: formData.get('category'),
        };

        try {
            if (currentPart) {
                await updateProduct({ ...newProduct, id: currentPart.id }).unwrap();
                alert('Product successfully updated!');
            } else {
                await createProduct(newProduct).unwrap();
                alert('Product successfully created!');
            }
            handleClose();
        } catch (error) {
            console.error('Error saving product:', error);
            alert(`Failed to save product: ${error?.data?.error || 'Unknown error'}`);
        }
    };

    const handleDelete = async (id) => {
        console.log('Deleting product with ID:', id);
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await deleteProduct(id).unwrap();
                alert('Product successfully deleted!');
                refetch();
            } catch (error) {
                console.error('Error deleting product:', error);
                alert(`Failed to delete product: ${error?.data?.error || 'Unknown error'}`);
            }
        }
    };

    console.log(parts); // Add this line to inspect the parts data

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
                                <FaPlus /> Add New Product
                            </ActionButton>
                        </Col>
                    </Row>

                    <StyledTable responsive hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Category</th> {/* Ensure Category Column is Included */}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parts?.map(part => (
                                <tr key={part._id}> {/* Add key prop */}
                                <td>
                                    {part._id}
                                </td>
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
                                    <td>{part.category || 'N/A'}</td>
                                    <td>
                                        <ActionButton
                                            variant="warning"
                                            onClick={() => handleShow(part.id)}
                                            style={{ backgroundColor: '#DAA520', borderColor: '#DAA520' }}
                                        >
                                            <FaEdit /> Edit
                                        </ActionButton>

                                        <ActionButton
                                            variant="danger"
                                            onClick={() => handleDelete(part._id)}
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
                    <Modal.Title>{currentPart ? 'Edit Part' : 'Add New Product'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isLoading ? (
                        <p>Loading product details...</p>
                    ) : (
                        <Form onSubmit={handleSave}>
                            <Form.Group className="mb-3">
                                <Form.Label>Part Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                {previewImage && <ImagePreview src={previewImage} alt="Preview" />}
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
                                    type="text"
                                    name="name"
                                    defaultValue={currentPart ? currentPart.name : ''}
                                    required
                                    placeholder="enter quantity"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    placeholder="Enter product description"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Additional Info</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="additionalInfo"
                                    placeholder="Enter additional product info"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Make</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="make"
                                    placeholder="Enter make (e.g., Toyota)"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Model</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="model"
                                    placeholder="Enter model (e.g., Corolla)"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Year</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="year"
                                    min="1900"
                                    max={new Date().getFullYear()}
                                    placeholder="Enter year"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Transmission</Form.Label>
                                <Form.Control as="select" name="transmission" required>
                                    <option value="Automatic">Automatic</option>
                                    <option value="Manual">Manual</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Condition</Form.Label>
                                <Form.Control as="select" name="condition" required>
                                    <option value="New">New</option>
                                    <option value="Used">Used</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Fuel Type</Form.Label>
                                <Form.Control as="select" name="fuelType" required>
                                    <option value="Petrol">Petrol</option>
                                    <option value="Diesel">Diesel</option>
                                    <option value="Gasoline">Gasoline</option>
                                    <option value="All  applicable">All  applicable</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Control as="select" name="category" required>
                                    <option value="Body Part">Body Part</option>
                                    <option value="Engine Part">Engine Part</option>
                                    <option value="Electrical Components">Electrical Components</option>
                                    <option value="Suspension Parts">Suspension Parts</option>
                                    <option value="Transmission Parts">Transmission Parts</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label>Price (Ksh)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    step="0.01"
                                    required
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
                    )}
                </Modal.Body>
            </StyledModal>
        </StyledContainer>
    );
};

export default Inventory;

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
