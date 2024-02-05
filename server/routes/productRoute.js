// productRoute.js
const express = require('express');
const session = require('express-session');
const path = require('path');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../config/multerConfig');
// const splitStr = productController.splitStr;
function splitStr(URL){
  const ur = URL.split("public\\");
  return ur[1];
}
router.post('/create-product', upload.single('imageURL'), productController.createProduct);
router.get('/productForm', productController.productForm);
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect('/sign-in');
  }
}
// Get all products
// Get all products
router.get('/',isAuthenticated, async (req, res) => {
  try {
    const products = await productController.getAllProducts();
    console.log('Products:', products);
    res.render('home',{ products, splitStr }); // Pass both products and splitStr to the EJS template
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a product by ID
router.get('/:id', productController.getProductById);
// Update a product by ID
router.post('/edit-product/:id', productController.updateProductById);
// Delete a product by ID
router.post('/delete-product/:id', productController.deleteProductById);

module.exports = router;
