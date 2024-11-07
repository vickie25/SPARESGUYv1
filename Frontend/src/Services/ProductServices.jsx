import axios from 'axios';

const API_URL = '/api/products';

export const createProduct = async (product) => {
  const response = await axios.post(API_URL, product);
  return response.data;
};

export const getAllProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateProduct = async (id, updatedProduct) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedProduct);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
