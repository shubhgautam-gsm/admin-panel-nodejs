const express = require('express');
const path = require('path');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');

router.get('/categoryForm', categoryController.getCategory);
router.get('/categoryList', async (req, res) => {
    try {
      const categories = await categoryController.getAllCategories();
      console.log('Categories:', categories);
      res.render('categoryList',{ categories}); // Pass both products and splitStr to the EJS template
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
// Create a category
router.post('/categories', categoryController.createCategory);

// Edit a category
router.post('/category-edit/:id', categoryController.editCategory);

// Delete a category
router.post('/category-delete/:id', categoryController.deleteCategory);

module.exports = router;
