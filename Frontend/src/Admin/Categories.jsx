import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form, Badge } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrashAlt, FaImage, FaEye } from 'react-icons/fa';
import styled from 'styled-components';



const CategoryItem = ({ category, onEdit, onDelete }) => {
  return (
    <tr>
      <td>
        <CategoryImage src={category.imageUrl} alt={category.name} />
        {category.name}
      </td>
      <td>{category.description}</td>
      <td>
        <CategoryBadge className="badge-info">{category.status}</CategoryBadge>
      </td>
      <td>
        <ActionButton variant="info" onClick={() => onEdit(category)}><FaEye /> View</ActionButton>
        <ActionButton variant="warning" onClick={() => onEdit(category)}><FaEdit /> Edit</ActionButton>
        <ActionButton variant="danger" onClick={() => onDelete(category)}><FaTrashAlt /> Delete</ActionButton>
      </td>
    </tr>
  );
};

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    status: 'Active',
    imageUrl: '',
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setNewCategory({
      name: category.name,
      description: category.description,
      status: category.status,
      imageUrl: category.imageUrl,
    });
    setShowModal(true);
  };

  const handleDelete = async (category) => {
    await fetch(`/api/categories/${category.id}`, { method: 'DELETE' });
    setCategories(categories.filter(c => c.id !== category.id));
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newCategory.name);
    formData.append('description', newCategory.description);
    formData.append('status', newCategory.status);
    if (imageFile) formData.append('imageUrl', imageFile);

    const method = currentCategory ? 'PUT' : 'POST';
    const url = currentCategory ? `/api/categories/${currentCategory.id}` : '/api/categories';

    const response = await fetch(url, {
      method: method,
      body: formData,
    });
    const data = await response.json();

    if (currentCategory) {
      setCategories(categories.map(cat => (cat.id === currentCategory.id ? data : cat)));
    } else {
      setCategories([...categories, data]);
    }
    handleCloseModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <PageTitle>Manage Categories</PageTitle>
          <Button variant="success" onClick={() => { setNewCategory({ name: '', description: '', status: 'Active', imageUrl: '' }); setShowModal(true); }}>
            <FaPlus /> Add New Category
          </Button>
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
              {categories.map((category, index) => (
                <CategoryItem key={index} category={category} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
            </tbody>
          </CategoryTable>

          {/* Edit/Add Modal */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{currentCategory ? 'Edit Category' : 'Add New Category'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSave}>
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