const services = require('../services/products');
const httpError = require('../utils/httpError');

const addProduct = async (req, res) => {
  try {
    const product = req.body;
    const { token } = req.headers;
    console.log(token);
    if (req.isAdmin === false) {
      throw new httpError('Only admins can add products', 401);
    }
    const newProduct = await services.createProduct(product);
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (err) {
    if (err instanceof httpError) {
      res.status(err.statusCode).json({ message: err.message });
    }
    else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

const fetchProducts = async (req, res) => {
  try {
    const products = await services.fetchProducts();
    res.status(200).json(products);
  } catch (err) {
    if (err instanceof httpError) {
      res.status(err.statusCode).json({ message: err.message });
    }
    else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = { addProduct, fetchProducts };