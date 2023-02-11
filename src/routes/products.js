const express = require('express');
const router = express.Router();

const controllers = require('../controllers/products');
const authenticateUser = require('../middlewares/auth');

router.post('/add', authenticateUser, controllers.addProduct);
router.get('/list', authenticateUser, controllers.fetchProducts);

module.exports = router;