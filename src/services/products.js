const { Product } = require('../../database/models');

const fetchProducts = async () => {
  const products = await Product.findAll();
  return products;
};

const createProduct = async (product) => {
  const newProduct = await Product.create(product);
  return newProduct;
};

module.exports = { fetchProducts, createProduct };
