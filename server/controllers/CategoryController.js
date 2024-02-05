const mongoose = require('mongoose');
const Category = require('../models/Category');

const categoryController = {
  getCategory: async (req, res) => {
    try {
      return res.render('categoryForm'); // Redirect to category list page
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  // getCatList: async (req, res) => {
  //   try {
  //     return res.render('categoryList'); // Redirect to category list page
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send('cat list Error');
  //   }
  // },
  
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      return categories;
      // res.redirect('/categoryList'); // Return the products array
    } catch (error) {
      throw error;
    }
  },
  createCategory: async (req, res) => {
    try {
      const cat_name = req.body.cat_name;
      const category = new Category({ cat_name: cat_name });
      await category.save();
      // console.log(category, "this is your ddd")
      res.redirect('/categoryList'); // Redirect to category list page
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error sss');
    }
  },

  editCategory: async (req, res) => {
    try {
      const  id = req.params.id;
      const cat_name  = req.body.cat_name;
      await Category.findByIdAndUpdate(id,{cat_name:cat_name});
      res.redirect('/categoryList');
       // Redirect to category list page
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const id  = req.params.id;
      const catid =await Category.findByIdAndDelete(id);
      const watcch =await catid.remove();    

      res.redirect('/categoryList'); 
      console.log(watcch, "this is your ddd")// Redirect to category list page
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
};

module.exports = categoryController;
