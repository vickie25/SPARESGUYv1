import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form, Badge } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrashAlt, FaImage, FaEye } from 'react-icons/fa';
import styled from 'styled-components';



// Component for rendering a single category row in the table
const CategoryItem = ({ category, onEdit, onDelete }) => {
  return (
    <tr>
      <td>
        {/* Display category image and name */}
        <CategoryImage src={category.imageUrl} alt={category.name} />
        {category.name}
      </td>
      <td>{category.description}</td>
      <td>
        {/* Display category status as a badge */}
        <CategoryBadge className="badge-info">{category.status}</CategoryBadge>
      </td>
      <td>
        {/* Action buttons for View, Edit, and Delete */}
        <ActionButton variant="info" onClick={() => onEdit(category)}><FaEye /> View</ActionButton>
        <ActionButton variant="warning" onClick={() => onEdit(category)}><FaEdit /> Edit</ActionButton>
        <ActionButton variant="danger" onClick={() => onDelete(category)}><FaTrashAlt /> Delete</ActionButton>
      </td>
    </tr>
  );
};

// Main component for managing categories
const CategoriesPage = () => {
  const [categories, setCategories] = useState([]); // State to store list of categories
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [currentCategory, setCurrentCategory] = useState(null); // State for the currently selected category
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    status: 'Active',
    imageUrl: '',
  }); // State for new or edited category details
  const [imageFile, setImageFile] = useState(null); // State to store the selected image file

  // Fetch categories from the API when the component loads
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('/api/categories'); // Fetch categories from the API
      const data = await response.json(); // Parse response JSON
      setCategories(data); // Update categories state
    };

    fetchCategories(); // Call the fetch function
  }, []);

  // Handle category edit action
  const handleEdit = (category) => {
    setCurrentCategory(category); // Set the current category for editing
    setNewCategory({
      name: category.name,
      description: category.description,
      status: category.status,
      imageUrl: category.imageUrl,
    }); // Populate the form with existing category details
    setShowModal(true); // Show the modal
  };

  // Handle category delete action
  const handleDelete = async (category) => {
    await fetch(`/api/categories/${category.id}`, { method: 'DELETE' }); // Send DELETE request to API
    setCategories(categories.filter(c => c.id !== category.id)); // Remove the deleted category from the state
  };

  // Close the modal
  const handleCloseModal = () => setShowModal(false);

  // Handle save (add or edit) action
  const handleSave = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Create form data to handle file uploads
    const formData = new FormData();
    formData.append('name', newCategory.name);
    formData.append('description', newCategory.description);
    formData.append('status', newCategory.status);
    if (imageFile) formData.append('imageUrl', imageFile); // Append image file if provided

    const method = currentCategory ? 'PUT' : 'POST'; // Determine HTTP method based on action
    const url = currentCategory ? `/api/categories/${currentCategory.id}` : '/api/categories'; // Determine API endpoint

    const response = await fetch(url, {
      method: method,
      body: formData, // Send form data
    });
    const data = await response.json(); // Parse response JSON

    if (currentCategory) {
      // Update the edited category in the state
      setCategories(categories.map(cat => (cat.id === currentCategory.id ? data : cat)));
    } else {
      // Add the new category to the state
      setCategories([...categories, data]);
    }
    handleCloseModal(); // Close the modal
  };

  // Handle input changes for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Get input name and value
    setNewCategory({ ...newCategory, [name]: value }); // Update the state
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Update the state with selected file
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          {/* Page title */}
          <PageTitle>Manage Categories</PageTitle>
          {/* Button to open modal for adding a new category */}
          <Button variant="success" onClick={() => { 
            setNewCategory({ name: '', description: '', status: 'Active', imageUrl: '' }); 
            setShowModal(true); 
          }}>
            <FaPlus /> Add New Category
          </Button>
          {/* Table to display categories */}
          <CategoryTable striped bordered hover>
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Render each category row */}
              {categories.map((category, index) => (
                <CategoryItem key={index} category={category} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
            </tbody>
          </CategoryTable>

          {/* Modal for adding or editing a category */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{currentCategory ? 'Edit Category' : 'Add New Category'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSave}>
                {/* Form fields for category details */}
                <Form.Group controlId="name">
                  <Form.Label>Category Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={newCategory.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={newCategory.description}
                    onChange={handleInputChange}
                    rows={3}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="status">
                  <Form.Label>Status</Form.Label>
                  <Form.Control as="select" name="status" value={newCategory.status} onChange={handleInputChange}>
                    <option>Active</option>
                    <option>Inactive</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="categoryImage">
                  <Form.Label>Category Image</Form.Label>
                  <Form.Control type="file" onChange={handleImageChange} />
                </Form.Group>

                {/* Submit button */}
                <Button variant="primary" type="submit">
                  {currentCategory ? 'Save Changes' : 'Add Category'}
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default CategoriesPage;


// Styled Components

const PageTitle = styled.h2`
  color: #DAA520;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
`;

const CategoryTable = styled(Table)`
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

const CategoryImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  margin-right: 10px;
`;

const CategoryBadge = styled(Badge)`
  &.badge-info {
    background-color: #17a2b8;
  }
`; 